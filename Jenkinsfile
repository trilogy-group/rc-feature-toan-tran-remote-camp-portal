String GIT_HASH
String OLD_DEPLOYMENTS

pipeline {

  environment {
    ENVIRONMENT = "dev"
    PROJECT_ID = "remote-camp-portal"
    ARTIFACT_ID = "rc-portal-app"
    HOST_PORT = 80
    DTR_URL = "registry2.swarm.devfactory.com"
    DTR_USERNAME = "drosson"
    DTR_PASSWORD = credentials("DTR_PW_DROSSON")
    DOCKER_HOST_IP = "10.26.48.23"
    DOCKER_HOST_PASSWORD = credentials("DOCKER_HOST_PASSWORD")
    DOCKER_LINUX_HOST = "dl6.aureacentral.com"
    COMPANY = "teamrooms"
    TEAM = "remotecamp"
    EMAIL = "david.rosson@aurea.com"
    SKYPE = "david.rosson"
    STAGE = "dev"
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
    timeout(time: 15, unit: "MINUTES")
  }

  stages {

    stage ("1) Generate 'GIT_HASH' value from the SCM checkout") {
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

    stage ("2) Build Docker image") {
      steps {
        echo "Building the Docker image..."
        sh "docker build -f Dockerfile --build-arg ENVIRONMENT=${ENVIRONMENT} --build-arg GIT_HASH=${GIT_HASH} -t ${ARTIFACT_ID}:latest ."
      }
    }

    stage ("3) Run app container") {
      steps {
        echo "Killing any existing Docker image..."
        sh """#!/bin/bash
          set -e
          if [[ \$(docker ps -a | grep ${ARTIFACT_ID}-${BRANCH_NAME}) ]]; then
            docker kill ${ARTIFACT_ID}-${BRANCH_NAME} 2> /dev/null || true
            docker rm ${ARTIFACT_ID}-${BRANCH_NAME} 2> /dev/null || true
          fi
        """

        echo "Starting the 'rc-portal' app Docker container for '${BRANCH_NAME}' branch..."
        sh """#!/bin/bash
          set -e
          docker run -d --rm \
                     --name ${ARTIFACT_ID}-${BRANCH_NAME} \
                     -p ${HOST_PORT}:80 \
                     ${ARTIFACT_ID}:latest
        """
      }
    }

    stage ("4) Health-check the app container") {
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

    stage ("5) Tag Docker image") {
      steps {
        echo "Applying 'GIT_HASH', and 'latest' tags to the Docker image..."
        sh "docker tag ${ARTIFACT_ID}:latest ${DTR_URL}/${PROJECT_ID}-${BRANCH_NAME}/${ARTIFACT_ID}:${GIT_HASH}"
        sh "docker tag ${ARTIFACT_ID}:latest ${DTR_URL}/${PROJECT_ID}-${BRANCH_NAME}/${ARTIFACT_ID}:latest"
      }
    }

    stage ("6) Push Docker image to DTR") {
      stages {
        stage ("6.1) Login to the remote registry") {
          steps {
            echo "Logging in to the remote registry..."
            sh "docker login https://${DTR_URL} -u${DTR_USERNAME} -p${DTR_PASSWORD}"
          }
        }

        stage ("6.2) Push tagged Docker images to DTR") {
          steps {
            echo "Pushing the Docker image to the remote registry..."
            sh "docker push ${DTR_URL}/${PROJECT_ID}-${BRANCH_NAME}/${ARTIFACT_ID}:${GIT_HASH}"
            sh "docker push ${DTR_URL}/${PROJECT_ID}-${BRANCH_NAME}/${ARTIFACT_ID}:latest"
          }
        }
      }
    }

    stage ("7) Deploy with Ansible") {
      steps {
        echo "Skip this and deploy on DL6 instead."
        // echo "Running the 'ansible-playbook' command in a Docker container that provides a recent 'ansible-playbook' binary..."
        // sh """#!/bin/bash
        //   set -e
        //   docker run -i --rm --entrypoint ansible-playbook \
        //              -v ${WORKSPACE}/ansible:/ansible \
        //              -w /ansible \
        //              ansible/ansible-runner:latest -i '${DOCKER_HOST_IP},' \
        //                                            --extra-vars "image_name=${DTR_URL}/${PROJECT_ID}-${BRANCH_NAME}/${ARTIFACT_ID}:${GIT_HASH} \
        //                                                          container_name=${ARTIFACT_ID}-${BRANCH_NAME} \
        //                                                          host_port=${HOST_PORT} \
        //                                                          ansible_password=${DOCKER_HOST_PASSWORD}" \
        //                                            deploy-image.yaml
        // """
        // echo "VMware-hosted app available at http://${DOCKER_HOST_IP}:${HOST_PORT}"
      }
    }

    stage ("8) Deploy to DL6") {
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
              -l "SERVICE_TAGS=trilogy.expose-v2,trilogy.http,trilogy.internal,trilogy.endpoint=${ENDPOINT}" \
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
              ${DTR_URL}/${PROJECT_ID}-${BRANCH_NAME}/${ARTIFACT_ID}:${GIT_HASH}
            """
            echo "DL6-hosted app available at http://${ENDPOINT}"
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
