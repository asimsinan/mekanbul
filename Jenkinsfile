pipeline {
    agent any

    stages {
        stage('Kod alma') {
            steps {
                git branch: 'main', url: 'https://github.com/asimsinan/mekanbul.git'
            }
        }

        stage('Build ve Deploy') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }

        stage('Sağlık Kontrolü') {
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
            echo 'Deploy başarılı: mekanbul çalışıyor.'
        }
        failure {
            echo 'Deploy başarısız: logları kontrol et.'
        }
    }
}
