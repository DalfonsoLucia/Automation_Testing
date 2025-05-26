pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/DalfonsoLucia/Automation_Testing.git' //https://github.com/DalfonsoLucia/Automation_Testing.git
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci' // o 'npm install'
      }
    }

    stage('Run tests') {
      steps {
        sh 'npx playwright install --with-deps'
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      junit 'playwright-report/results.xml' // se generi un report XML
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
