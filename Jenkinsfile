String ENVIRONMENT
String STAGE
String GIT_HASH
String OLD_DEPLOYMENTS

pipeline {

  environment {
    PROJECT_ID = "remoteu-portal"
    ARTIFACT_ID = "remoteu-portal-web"
    HOST_PORT = 80
    CONTAINER_PORT = 80
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
    PROD_ENDPOINT = "remoteu.trilogy.com"
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

        stage("1.1) Set 'master' branch parameters") {
          when {
            branch 'master'
          }
          steps {
            script {
              NG_BUILD_CONFIG="--configuration=prod"
              STAGE = "staging"
              echo "NG_BUILD_CONFIG: ${NG_BUILD_CONFIG}"
              echo "STAGE: ${STAGE}"
            }
          }
        }

        stage("1.1) Set 'develop' branch parameters") {
          when {
            branch 'develop'
          }
          steps {
            script {
              NG_BUILD_CONFIG="--configuration=dev"
              STAGE = "dev"
              echo "NG_BUILD_CONFIG: ${NG_BUILD_CONFIG}"
              echo "STAGE: ${STAGE}"
            }
          }
        }

        stage("1.1) Set 'other' branch parameters") {
          when {
            not {
              anyOf {
                branch 'master'
                branch 'develop'
              }
            }
          }
          steps {
            script {
              NG_BUILD_CONFIG=""
              STAGE = "regression"
              echo "NG_BUILD_CONFIG: ${NG_BUILD_CONFIG}"
              echo "STAGE: ${STAGE}"
            }
          }
        }
      }
    }

    stage ("2) Generate 'GIT_HASH' value from the SCM checkout") {
      steps {
        echo "Generating the 'GIT_HASH' value from the SCM checkout"
        script {
          GIT_HASH = sh (script: """#!/bin/bash
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

    stage ("4) Run app container") {
      steps {
        echo "Killing any existing Docker image..."
        sh """#!/bin/bash
          set -e
          if [[ \$(docker ps -a | grep ${ARTIFACT_ID}-${BRANCH_NAME}) ]]; then
            docker kill ${ARTIFACT_ID}-${BRANCH_NAME} 2> /dev/null || true
            docker rm ${ARTIFACT_ID}-${BRANCH_NAME} 2> /dev/null || true
          fi
        """

        echo "Starting the '${ARTIFACT_ID}' Docker container for '${BRANCH_NAME}' branch..."
        sh """#!/bin/bash
          set -e
          docker run -d --rm \
                     --name ${ARTIFACT_ID}-${BRANCH_NAME} \
                     -p ${HOST_PORT}:${CONTAINER_PORT} \
                     ${ARTIFACT_ID}-${BRANCH_NAME}:latest
        """
      }
    }

    stage ("5) Health-check the app container") {
      steps {
        echo "Running a health-check of the app container..."
        sh """#!/bin/bash
          set -e
          for x in {1..30} ; do
            [[ \$(curl -s 127.0.0.1:${HOST_PORT}/) ]] && echo "Received response from '${ARTIFACT_ID}-${BRANCH_NAME}'" && break
            sleep 3
          done
          curl -I 127.0.0.1:${HOST_PORT}/ --fail
        """
        echo "Ran a successful Docker container health-check on '${ARTIFACT_ID}-${BRANCH_NAME}'"
      }
    }

    stage ("Proceed when branch is 'master' or 'develop'") {
      when {
        anyOf {
          branch 'master'
          branch 'develop'
        }
      }

      stages {

        stage ("6) Tag Docker image") {
          steps {
            echo "Applying 'GIT_HASH', and 'latest' tags to the Docker image..."
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
                  OLD_DEPLOYMENTS = sh (script: """#!/bin/bash
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

            stage ("8.2) Deploy new container to DL6") {
              steps {
                echo "Deploying new container to DL6..."
                sh """#!/bin/bash
                  set -e
                  docker -H ${DOCKER_LINUX_HOST} run -d --rm \
                  --name ${STAGE}_${PRODUCT}_${SERVICE}_${GIT_HASH} \
                  -l "SERVICE_NAME=${STAGE}_${PRODUCT}_${SERVICE}" \
                  -l "SERVICE_TAGS=githash=${GIT_HASH},trilogy.expose-v2,trilogy.internal,trilogy.https,trilogy.cert=internal_default,trilogy.redirecthttp,trilogy.endpoint=${STAGE}.${ENDPOINT}" \
                  -l "com.trilogy.company=${COMPANY}" \
                  -l "com.trilogy.team=${TEAM}" \
                  -l "com.trilogy.maintainer.email=${EMAIL}" \
                  -l "com.trilogy.maintainer.skype=${SKYPE}" \
                  -l "com.trilogy.stage=${STAGE}" \
                  -l "com.trilogy.product=${PRODUCT}" \
                  -l "com.trilogy.service=${SERVICE}" \
                  -m "2048m" \
                  --cpu-quota 100000 \
                  -p 80 \
                  ${DTR_URL}/${PROJECT_ID}/${ARTIFACT_ID}-${BRANCH_NAME}:${GIT_HASH}
                """
                echo "DL6-hosted app available at http://${STAGE}.${ENDPOINT}"
              }
            }

            stage ("8.3) Clean up old deployments on DL6") {
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
                      OLD_DEPLOYMENTS = sh (script: """#!/bin/bash
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

                stage ("9.2) Deploy new 'prod' container to DL6") {
                  steps {
                    echo "Deploying new 'prod' container to DL6..."
                    sh """#!/bin/bash
                      set -e
                      docker -H ${DOCKER_LINUX_HOST} run -d --rm \
                      --name prod_${PRODUCT}_${SERVICE}_${GIT_HASH} \
                      -l "SERVICE_NAME=prod_${PRODUCT}_${SERVICE}" \
                      -l "SERVICE_TAGS=githash=${GIT_HASH},trilogy.expose-v2,trilogy.https,trilogy.cert=default,trilogy.redirecthttp,trilogy.endpoint=${PROD_ENDPOINT}" \
                      -l "com.trilogy.company=${COMPANY}" \
                      -l "com.trilogy.team=${TEAM}" \
                      -l "com.trilogy.maintainer.email=${EMAIL}" \
                      -l "com.trilogy.maintainer.skype=${SKYPE}" \
                      -l "com.trilogy.stage=prod" \
                      -l "com.trilogy.product=${PRODUCT}" \
                      -l "com.trilogy.service=${SERVICE}" \
                      -m "2048m" \
                      --cpu-quota 100000 \
                      -p 80 \
                      ${DTR_URL}/${PROJECT_ID}/${ARTIFACT_ID}-${BRANCH_NAME}:${GIT_HASH}
                    """
                    echo "DL6-hosted 'prod' app available at http://${PROD_ENDPOINT}"
                  }
                }

                stage ("9.3) Clean up old 'prod' deployments on DL6") {
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
      sh """#!/bin/bash
        set -e
        if [[ \$(docker ps -a | grep ${ARTIFACT_ID}-${BRANCH_NAME}) ]]; then
          docker kill ${ARTIFACT_ID}-${BRANCH_NAME} 2> /dev/null || true
          docker rm ${ARTIFACT_ID}-${BRANCH_NAME} 2> /dev/null || true
        fi
      """
    }
  }
}
