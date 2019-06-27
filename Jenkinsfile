String NG_BUILD_CONFIG
String STAGE
String HOST_HEALTH_CHECK_PORT
String GIT_HASH
String DEPLOY_DATE
String OLD_DEPLOYMENTS

pipeline {

  environment {
    PROJECT_ID = "remoteu-portal"
    ARTIFACT_ID = "remoteu-portal"
    HOST_PORT = 80
    CONTAINER_PORT = 80
    HEALTH_CHECK_ENDPOINT = "/"
    DTR_URL = "registry2.swarm.devfactory.com"
    DTR_USERNAME = "drosson"
    DTR_PASSWORD = credentials("DTR_PW_DROSSON")
    DOCKER_LINUX_HOST = "dl6.aureacentral.com"
    COMPANY = "teamrooms"
    TEAM = "remotecamp"
    EMAIL = "david.rosson@aurea.com"
    SKYPE = "david.rosson"
    PRODUCT = "remotecamp"
    SERVICE = "remoteu-portal"
    ENDPOINT = "remoteu-portal.internal-webproxy.aureacentral.com"
  }

  agent {
    node {
      label "rc-qe"
    }
  }

  options {
    disableConcurrentBuilds()
    timestamps()
    timeout(time: 120, unit: "MINUTES")
  }

  stages {

    stage ("1) Setup - check which branch") {
      stages {

        stage("1.1) Set 'develop' branch parameters") {
          when {
            branch 'develop'
          }
          steps {
            script {
              NG_BUILD_CONFIG="--configuration=dev"
              STAGE = "dev"
              HOST_HEALTH_CHECK_PORT = 9201
              echo "NG_BUILD_CONFIG: ${NG_BUILD_CONFIG}"
              echo "STAGE: ${STAGE}"
              echo "HOST_HEALTH_CHECK_PORT: ${HOST_HEALTH_CHECK_PORT}"
            }
          }
        }

        stage("1.1) Set 'release' branch parameters") {
          when {
            branch 'release'
          }
          steps {
            script {
              NG_BUILD_CONFIG="" // TODO Add 'qa' configuration
              STAGE = "qa"
              HOST_HEALTH_CHECK_PORT = 9202
              echo "NG_BUILD_CONFIG: ${NG_BUILD_CONFIG}"
              echo "STAGE: ${STAGE}"
              echo "HOST_HEALTH_CHECK_PORT: ${HOST_HEALTH_CHECK_PORT}"
            }
          }
        }

        stage("1.1) Set 'master' branch parameters") {
          when {
            branch 'master'
          }
          steps {
            script {
              NG_BUILD_CONFIG="--configuration=prod"
              STAGE = "staging"
              HOST_HEALTH_CHECK_PORT = 9203
              echo "NG_BUILD_CONFIG: ${NG_BUILD_CONFIG}"
              echo "STAGE: ${STAGE}"
              echo "HOST_HEALTH_CHECK_PORT: ${HOST_HEALTH_CHECK_PORT}"
            }
          }
        }

        stage("1.1) Set 'other' branch parameters") {
          when {
            not {
              anyOf {
                branch 'develop'
                branch 'release'
                branch 'master'
              }
            }
          }
          steps {
            script {
              NG_BUILD_CONFIG=""
              STAGE = "regression"
              HOST_HEALTH_CHECK_PORT = 9204
              echo "NG_BUILD_CONFIG: ${NG_BUILD_CONFIG}"
              echo "STAGE: ${STAGE}"
              echo "HOST_HEALTH_CHECK_PORT: ${HOST_HEALTH_CHECK_PORT}"
            }
          }
        }
      }
    }

    stage ("2) Generate 'GIT_HASH' value from the SCM checkout") {
      steps {
        echo "Generating the 'GIT_HASH' value from the SCM checkout"
        script {
          GIT_HASH = sh (script: """
            set -e
            git rev-parse --short HEAD
          """, returnStdout: true).trim()
        }
        echo "GIT_HASH: ${GIT_HASH}"
      }
    }

    stage ("3) Build Docker image") {
      steps {
        echo "Building the Docker image..."
        sh "docker build -f Dockerfile --build-arg GIT_HASH=${GIT_HASH} --build-arg NG_BUILD_CONFIG=${NG_BUILD_CONFIG} -t ${ARTIFACT_ID}-${BRANCH_NAME}:latest ."
      }
    }

    stage ("4) Run container") {
      steps {
        echo "Killing any existing Docker container running on the build agent..."
        sh """
          set -e
          if [[ \$(docker ps -a | grep ${ARTIFACT_ID}-${BRANCH_NAME}) ]]; then
            docker kill ${ARTIFACT_ID}-${BRANCH_NAME} 2> /dev/null || true
            docker rm ${ARTIFACT_ID}-${BRANCH_NAME} 2> /dev/null || true
          fi
        """

        echo "Starting the '${ARTIFACT_ID}' Docker container for '${BRANCH_NAME}' branch..."
        sh """
          set -e
          docker run -d --rm \
                     --name ${ARTIFACT_ID}-${BRANCH_NAME} \
                     -p ${HOST_HEALTH_CHECK_PORT}:${CONTAINER_PORT} \
                     ${ARTIFACT_ID}-${BRANCH_NAME}:latest
        """
      }
    }

    stage ("5) Health-check the container") {
      steps {
        echo "Running a health-check of the container..."
        sh """
          set -e
          for x in {1..30} ; do
            [[ \$(curl -s -X GET 127.0.0.1:${HOST_HEALTH_CHECK_PORT}${HEALTH_CHECK_ENDPOINT}) ]] && echo "Received response from '${ARTIFACT_ID}-${BRANCH_NAME}'" && break
            sleep 3
          done
          curl -I -X GET 127.0.0.1:${HOST_HEALTH_CHECK_PORT}${HEALTH_CHECK_ENDPOINT} --fail
        """
        echo "Ran a successful Docker container health-check on '${ARTIFACT_ID}-${BRANCH_NAME}'"
      }
    }

    stage ("Proceed when branch is 'develop', 'release', or 'master'") {
      when {
        anyOf {
          branch 'develop'
          branch 'release'
          branch 'master'
        }
      }

      stages {

        stage ("6) Tag Docker image") {
          steps {
            echo "Applying 'GIT_HASH' and 'latest' tags to the Docker image..."
            sh "docker tag ${ARTIFACT_ID}-${BRANCH_NAME}:latest ${DTR_URL}/${PROJECT_ID}/${ARTIFACT_ID}-${BRANCH_NAME}:${GIT_HASH}"
            sh "docker tag ${ARTIFACT_ID}-${BRANCH_NAME}:latest ${DTR_URL}/${PROJECT_ID}/${ARTIFACT_ID}-${BRANCH_NAME}:latest"
          }
        }

        stage ("7) Push Docker image to DTR") {
          stages {
            stage ("7.1) Login to the remote registry") {
              steps {
                echo "Logging in to the remote registry..."
                sh "docker login https://${DTR_URL} -u${DTR_USERNAME} -p${DTR_PASSWORD}"
              }
            }

            stage ("7.2) Push tagged Docker images to DTR") {
              steps {
                echo "Pushing the Docker image to the remote registry..."
                sh "docker push ${DTR_URL}/${PROJECT_ID}/${ARTIFACT_ID}-${BRANCH_NAME}:${GIT_HASH}"
                sh "docker push ${DTR_URL}/${PROJECT_ID}/${ARTIFACT_ID}-${BRANCH_NAME}:latest"
              }
            }
          }
        }

        stage ("8) Deploy to DL6 - Non-Prod") {
          stages {
            stage ("8.1) Find old deployments on DL6") {
              steps {
                echo "Finding old deployments on DL6..."
                script {
                  OLD_DEPLOYMENTS = sh (script: """
                    set -e
                    docker -H ${DOCKER_LINUX_HOST} ps -q -f "label=SERVICE_NAME=${STAGE}_${PRODUCT}_${SERVICE}"
                  """, returnStdout: true).trim()
                }
                sh """#!/bin/bash
                  set -e
                  echo "Found the following old deployment(s):"
                  for hash in ${OLD_DEPLOYMENTS}
                  do
                    CONTAINER_NAME=\$(docker -H ${DOCKER_LINUX_HOST} inspect -f="{{.Name}}" \$hash)
                    echo \\'\${CONTAINER_NAME:1}\\'
                  done
                """
              }
            }

            stage ("8.2) Generate 'DEPLOY_DATE' value from the current date/time") {
              steps {
                echo "Generating the 'DEPLOY_DATE' value from the current date/time"
                script {
                  DEPLOY_DATE = sh (script: """
                    set -e
                    date +'%Y-%m-%d_%H-%M-%S'
                  """, returnStdout: true).trim()
                }
                echo "DEPLOY_DATE: ${DEPLOY_DATE}"
              }
            }

            stage ("8.3) Deploy new container to DL6") {
              steps {
                echo "Deploying new container to DL6..."
                sh """
                  set -e
                  docker -H ${DOCKER_LINUX_HOST} run -d --rm \
                  --name ${STAGE}_${PRODUCT}_${SERVICE}_${GIT_HASH}-${BUILD_NUMBER} \
                  -l "SERVICE_NAME=${STAGE}_${PRODUCT}_${SERVICE}" \
                  -l "SERVICE_TAGS=\
trilogy.expose-v2,\
trilogy.redirecthttp,\
trilogy.cert=internal_default,\
trilogy.https,\
trilogy.internal,\
trilogy.endpoint=${STAGE}-${ENDPOINT},\
deploy.date=${DEPLOY_DATE},\
git.hash=${GIT_HASH},\
jenkins.build=${BUILD_NUMBER},\
jenkins.job=${JOB_NAME}" \
                  -l "com.trilogy.company=${COMPANY}" \
                  -l "com.trilogy.team=${TEAM}" \
                  -l "com.trilogy.maintainer.email=${EMAIL}" \
                  -l "com.trilogy.maintainer.skype=${SKYPE}" \
                  -l "com.trilogy.stage=${STAGE}" \
                  -l "com.trilogy.product=${PRODUCT}" \
                  -l "com.trilogy.service=${SERVICE}" \
                  -m "2048m" \
                  --cpu-quota 100000 \
                  -p ${HOST_PORT} \
                  ${DTR_URL}/${PROJECT_ID}/${ARTIFACT_ID}-${BRANCH_NAME}:${GIT_HASH}
                """
                echo "Deployed container '${STAGE}_${PRODUCT}_${SERVICE}_${GIT_HASH}-${BUILD_NUMBER}'"
                echo "DL6-hosted '${STAGE}' container available at http://${STAGE}-${ENDPOINT}"
              }
            }

            stage ("8.4) Clean up old deployments on DL6") {
              steps {
                echo "Cleaning up old deployments on DL6..."
                sh """#!/bin/bash
                  set -e
                  for hash in ${OLD_DEPLOYMENTS}
                  do
                    CONTAINER_NAME=\$(docker -H ${DOCKER_LINUX_HOST} inspect -f="{{.Name}}" \$hash)
                    echo Killing container \\'\${CONTAINER_NAME:1}\\'
                    docker -H ${DOCKER_LINUX_HOST} kill \$hash 2> /dev/null || true
                    echo Removing container \\'\${CONTAINER_NAME:1}\\'
                    docker -H ${DOCKER_LINUX_HOST} rm \$hash 2> /dev/null || true
                    echo
                  done
                """
              }
            }
          }
        }

        stage('Deploy to prod?') {
          when {
            beforeInput true
            branch 'master'
          }
          input {
            message "Deploy to prod?"
            ok "Just do it"
          }
          stages {
            stage ("9) Deploy to DL6 - Prod") {
              stages {
                stage ("9.1) Find old 'prod' deployments on DL6") {
                  steps {
                    echo "Finding old 'prod' deployments on DL6..."
                    script {
                      OLD_DEPLOYMENTS = sh (script: """
                        set -e
                        docker -H ${DOCKER_LINUX_HOST} ps -q -f "label=SERVICE_NAME=prod_${PRODUCT}_${SERVICE}"
                      """, returnStdout: true).trim()
                    }
                    sh """#!/bin/bash
                      set -e
                      echo "Found the following old 'prod' deployment(s):"
                      for hash in ${OLD_DEPLOYMENTS}
                      do
                        CONTAINER_NAME=\$(docker -H ${DOCKER_LINUX_HOST} inspect -f="{{.Name}}" \$hash)
                        echo \\'\${CONTAINER_NAME:1}\\'
                      done
                    """
                  }
                }

                stage ("9.2) Generate 'DEPLOY_DATE' value from the current date/time") {
                  steps {
                    echo "Generating the 'DEPLOY_DATE' value from the current date/time"
                    script {
                      DEPLOY_DATE = sh (script: """
                        set -e
                        date +'%Y-%m-%d_%H-%M-%S'
                      """, returnStdout: true).trim()
                    }
                    echo "DEPLOY_DATE: ${DEPLOY_DATE}"
                  }
                }

                stage ("9.3) Deploy new 'prod' container to DL6") {
                  steps {
                    echo "Deploying new 'prod' container to DL6..."
                    sh """
                      set -e
                      docker -H ${DOCKER_LINUX_HOST} run -d --rm \
                      --name prod_${PRODUCT}_${SERVICE}_${GIT_HASH}-${BUILD_NUMBER} \
                      -l "SERVICE_NAME=prod_${PRODUCT}_${SERVICE}" \
                      -l "SERVICE_TAGS=\
trilogy.expose-v2,\
trilogy.redirecthttp,\
trilogy.cert=internal_default,\
trilogy.https,\
trilogy.internal,\
trilogy.endpoint=${ENDPOINT},\
deploy.date=${DEPLOY_DATE},\
git.hash=${GIT_HASH},\
jenkins.build=${BUILD_NUMBER},\
jenkins.job=${JOB_NAME}" \
                      -l "com.trilogy.company=${COMPANY}" \
                      -l "com.trilogy.team=${TEAM}" \
                      -l "com.trilogy.maintainer.email=${EMAIL}" \
                      -l "com.trilogy.maintainer.skype=${SKYPE}" \
                      -l "com.trilogy.stage=prod" \
                      -l "com.trilogy.product=${PRODUCT}" \
                      -l "com.trilogy.service=${SERVICE}" \
                      -m "2048m" \
                      --cpu-quota 100000 \
                      -p ${HOST_PORT} \
                      ${DTR_URL}/${PROJECT_ID}/${ARTIFACT_ID}-${BRANCH_NAME}:${GIT_HASH}
                    """
                    echo "Deployed container 'prod_${PRODUCT}_${SERVICE}_${GIT_HASH}-${BUILD_NUMBER}'"
                    echo "DL6-hosted 'prod' container available at http://${ENDPOINT}"
                  }
                }

                stage ("9.4) Clean up old 'prod' deployments on DL6") {
                  steps {
                    echo "Cleaning up old 'prod' deployments on DL6..."
                    sh """#!/bin/bash
                      set -e
                      for hash in ${OLD_DEPLOYMENTS}
                      do
                        CONTAINER_NAME=\$(docker -H ${DOCKER_LINUX_HOST} inspect -f="{{.Name}}" \$hash)
                        echo Killing container \\'\${CONTAINER_NAME:1}\\'
                        docker -H ${DOCKER_LINUX_HOST} kill \$hash 2> /dev/null || true
                        echo Removing container \\'\${CONTAINER_NAME:1}\\'
                        docker -H ${DOCKER_LINUX_HOST} rm \$hash 2> /dev/null || true
                        echo
                      done
                    """
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  post {
    always {
      echo "Performing cleanup..."
      sh """
        set -e
        if [[ \$(docker ps -a | grep ${ARTIFACT_ID}-${BRANCH_NAME}) ]]; then
          docker kill ${ARTIFACT_ID}-${BRANCH_NAME} 2> /dev/null || true
          docker rm ${ARTIFACT_ID}-${BRANCH_NAME} 2> /dev/null || true
        fi
      """
    }
  }
}
