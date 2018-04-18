pipeline {
    agent {
        docker {
            image 'node:8.11.1-alpine'
        }
    }
    stages {
        stage('install') {
            steps {
                sh 'sudo chown -R $USER:$(id -gn $USER) /.config'
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