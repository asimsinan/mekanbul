pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/asimsinan/mekanbul.git'
            }
        }

        stage('Build and Deploy') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sleep 10
                    sh 'curl -f http://host.docker.internal:3000 || echo "Backend henuz hazir degil"'
                }
            }
        }
    }

    post {
        success {
            echo 'Deploy basarili: mekanbul calisiyor.'
        }
        failure {
            echo 'Deploy basarisiz: loglari kontrol et.'
        }
    }
}
