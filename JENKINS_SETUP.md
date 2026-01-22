# Jenkins Pipeline Setup Guide

This guide explains how to set up and configure the Jenkins pipeline for Playwright TypeScript tests.

## Prerequisites

1. **Jenkins Server**: Jenkins 2.164+ with the following plugins:
   - Pipeline (Declarative Pipeline)
   - GitHub Integration Plugin
   - HTML Publisher Plugin
   - JUnit Plugin

2. **Build Agent/Node**: Node.js 18+ and npm installed

3. **Git**: Repository access configured

## Jenkins Plugins Installation

Install these plugins via **Manage Jenkins → Plugin Manager**:

```
- Pipeline
- GitHub Integration
- HTML Publisher
- JUnit Plugin
- Timestamper
- Log Parser (optional)
```

## Setup Steps

### 1. Create a New Pipeline Job

1. Click **New Item** in Jenkins
2. Enter job name: `PlaywrightTests`
3. Select **Pipeline**
4. Click **OK**

### 2. Configure Pipeline

1. Go to **Pipeline** section
2. Select **Pipeline script from SCM**
3. Choose **Git** as SCM
4. Enter repository URL: `https://github.com/anandyadav5ster/PlaywrightTypescript.git`
5. Set branch to `*/main` (or your default branch)
6. Script path: `Jenkinsfile`

### 3. Save and Run

1. Click **Save**
2. Click **Build Now** to trigger the pipeline

## Pipeline Parameters

When running the build, you can choose:

- **BROWSER**: chromium | firefox | webkit | all
- **TEST_TYPE**: all | example | fixture
- **HEADED_MODE**: true/false (run tests with UI visible)

Example: Run only example tests on Chrome in headed mode.

## GitHub Webhook Integration (Optional)

To automatically trigger builds on code push:

### In Jenkins:
1. Go to job **Configure**
2. Check **GitHub hook trigger for GITScm polling**
3. Save

### In GitHub:
1. Go to repository **Settings → Webhooks**
2. Click **Add webhook**
3. Payload URL: `http://YOUR_JENKINS_URL/github-webhook/`
4. Content type: `application/json`
5. Events: Select **Push events**
6. Click **Add webhook**

## Reports and Artifacts

After each build:

- **Test Reports**: Available in "Playwright Test Report" tab
- **Test Results**: Published as JUnit XML
- **Artifacts**: Screenshots and traces stored in build artifacts

## Troubleshooting

### Issue: npm install fails
- Ensure Node.js 18+ is installed on the build agent
- Check npm cache: `npm cache clean --force`

### Issue: Playwright browser installation fails
- Run: `npx playwright install --with-deps`
- May require additional system dependencies on Linux

### Issue: Tests fail with "Browser not found"
- Ensure `npx playwright install` runs successfully
- Check available disk space on build agent

### Issue: Reports not published
- Verify `playwright-report/index.html` is generated
- Check Jenkins user has write permissions to workspace

## Environment Variables

Add build variables in **Configure → Build Environment**:

```
NODE_ENV=test
CI=true
```

## Email Notifications (Optional)

Add post-build actions for email notifications:

1. Go to **Configure → Post-build Actions**
2. Add **Email Notification**
3. Enter recipient emails
4. Trigger on: Failed/Unstable builds

## Maintenance

- **Cleanup**: Old builds are automatically discarded (keeping last 10)
- **Timeout**: Tests timeout after 30 minutes
- **Logs**: Build logs are preserved for debugging

## Advanced Configuration

### Run on Specific Node
Add to Jenkinsfile:
```groovy
agent { 
    node { label 'linux && playwright' }
}
```

### Parallel Browser Testing
Modify the Run Tests stage to execute in parallel (requires Declarative Pipeline support).

### Integration with External Tools
- Send results to TestRail, Xray, or similar tools
- Integrate with Slack for notifications

## Support

For issues with Jenkins pipeline, refer to:
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
