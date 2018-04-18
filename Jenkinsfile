pipeline {
    agent {
        docker {
            image 'node:8.11.1'
            args '-u 1001 --group-add 1002'
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