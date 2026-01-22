pipeline {
    agent any
    
    triggers {
        // Trigger on code push to main/master branch
        githubPush()
    }
    
    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit', 'all'],
            description: 'Select browser to run tests'
        )
        choice(
            name: 'TEST_TYPE',
            choices: ['all', 'example', 'fixture'],
            description: 'Select which tests to run'
        )
        booleanParam(
            name: 'HEADED_MODE',
            defaultValue: false,
            description: 'Run tests in headed mode'
        )
    }
    
    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh '''
                    npm install
                    npx playwright install --with-deps
                '''
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running Playwright tests...'
                sh '''
                    #!/bin/bash
                    set +e
                    
                    TEST_SPEC="example.spec.ts"
                    if [ "${TEST_TYPE}" == "fixture" ]; then
                        TEST_SPEC="fixture_example.spec.ts"
                    elif [ "${TEST_TYPE}" == "all" ]; then
                        TEST_SPEC="**/*.spec.ts"
                    fi
                    
                    HEADED_FLAG=""
                    if [ "${HEADED_MODE}" == "true" ]; then
                        HEADED_FLAG="--headed"
                    fi
                    
                    if [ "${BROWSER}" == "all" ]; then
                        npx playwright test tests/${TEST_SPEC} ${HEADED_FLAG}
                    else
                        npx playwright test tests/${TEST_SPEC} --project=${BROWSER} ${HEADED_FLAG}
                    fi
                    
                    TEST_EXIT_CODE=$?
                    exit ${TEST_EXIT_CODE}
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Generating test reports...'
            
            // Publish Playwright HTML Report
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report',
                allowMissing: false,
                alwaysLinkToLastBuild: true
            ])
            
            // Archive test results
            junit testResults: '**/test-results/**/*.xml', 
                  allowEmptyResults: true
            
            // Archive artifacts
            archiveArtifacts artifacts: 'test-results/**,playwright-report/**',
                              allowEmptyArchive: true
        }
        
        success {
            echo '✓ All tests passed successfully!'
        }
        
        failure {
            echo '✗ Tests failed. Check the Playwright Test Report for details.'
        }
        
        unstable {
            echo '⚠ Tests completed with warnings.'
        }
    }
}
