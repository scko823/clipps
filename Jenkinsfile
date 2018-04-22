pipeline {
    agent {
        docker {
            image 'node:8.11.1'
            args '-u 1001:1002 -v /usr/bin/git:/usr/bin/git --privileged'
        }
    }
    environment {
        HOME="."
    }
    stages {
        stage('install') {
            steps {
                sh 'npm install'
            }
        }
        stage('test') {
            steps {
                sh 'npm test'
            }
        }
    }
}