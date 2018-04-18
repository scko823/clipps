pipeline {
    agent {
        docker {
            image 'node:8.11.1-alpine'
        }
    }
    stages {
        stage('install') {
            sh 'npm install'
        }
        stage('test') {
            sh 'npm test'
        }
    }
}