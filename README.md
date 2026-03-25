1. grep command to run the test with the tag
ex : npx playwright test --grep @locator

2. Workers is used to run the parallel or serial
ex : npx playwright test --grep @locator --workers=1

powershell command 
$env:ENV="staging"; npx playwright test


ENV=staging npx playwright test handle_mul_env.ts

https://medium.com/@irfan17sat/configuring-multiple-environments-in-playwright-67e402c1c627

jenkins parameter command
java -jar jenkins.war --httpPort=9090
npx playwright test %TestCasesToRun% --project=%Browser% %Headed%

========================================
JSON
"scripts": {
  "test:stage": "cross-env ENV=staging npx playwright test",
  "test:dev": "cross-env ENV=dev npx playwright test"
}
Run in Jenkins:

Bash
npm run test:stage -- --project=chromium
===============================================
**Playwright MCP**
A few things that trip teams up during initial setup:

npx playwright init-agents fails silently: This usually means you are running a Playwright version older than v1.56. Run npx playwright --version to confirm. If you are below 1.56, upgrade first with npm install -D @playwright/test@latest.
VS Code doesn't pick up the MCP server: Make sure .vscode/mcp.json was created by init-agents. Open VS Code's Output panel and check the MCP logs. The Copilot or Claude Code extension must be installed and authenticated.
Planner generates an empty test plan: The Planner needs a running application to explore. If your app is not reachable at the URL you specified, the Planner has nothing to work with. Start your dev server before invoking the agent.
Generator produces tests that immediately fail: This is often a timing issue. The Generator interacts with the live app, so slow-loading pages or heavy SPAs may cause intermittent failures during generation. Add a baseURL in your Playwright config and ensure the app is fully loaded before starting.

**Can you explain the real time flow when run the test?**
When you run a test using Playwright MCP, the "Real-Time Flow" is a dynamic conversation between the AI Agent and the browser, shifting from static code execution to an agentic loop that can react to UI changes. 
TestDino
 +1
1. The Setup: The "Data Bridge" Opens
Server Launch: The Playwright MCP Server starts in the background (typically via npx @playwright/mcp), exposing a set of tools (e.g., browser_navigate, browser_click) to the AI.
Tool Discovery: The AI agent (like Claude or GitHub Copilot) "calls" the server to see what it can do. It identifies the browser session as its primary interface for action.

2. Execution: Action & Perception
Instruction to Action: The AI receives a test step (e.g., "Login as admin"). Instead of guessing, it sends a command to the MCP server to navigate or click.
Snapshot Perception: After every action, the server sends back a YAML snapshot of the Accessibility Tree.
Why this matters: The AI "sees" roles (button, textbox) and labels (Submit, Password) rather than just pixels, making its next step highly accurate. 
ThinkPalm
ThinkPalm
 +4
3. The Self-Healing Loop (When things break)
If a locator fails (e.g., a button ID changed from #login-old to #login-new), the Healer Agent kicks in: 
YouTube
YouTube
 +1
Failure Detection: The test throws a TimeoutError. The Healer catches this and stops standard execution.
Context Analysis: It requests a fresh browser_snapshot. It compares the failed locator's "intent" with the current Accessibility Tree.
Heuristic Matching: It reasons: "The test wanted to click a 'Submit' button. I see a new button with role='button' and name='Submit' that wasn't there before".
Auto-Repair & Verification: The Healer generates a new Playwright locator (e.g., page.getByRole('button', { name: 'Submit' })) and re-executes the step in real-time. 
YouTube
YouTube
 +4
4. Finalization: Code Permanent Fix
Approval: In local modes (like VS Code), the AI asks: "The login button moved; I fixed it with a new locator. Apply this change?".
Code Update: Once accepted, it rewrites your .spec.ts file with the corrected locator, ensuring the test doesn't break again in the next run

**Command to run the test using AI agent and playwright MCP**
**How you "Run" it:**
1. Instead of typing npx playwright... in the terminal, you type this in the Copilot Chat window:
"Copilot, run the login test. If it fails because of a missing locator, use the Playwright MCP to find the new element and suggest a fix."

2. The MCP Way (Chat): "Copilot, fix my test" → Uses AI to navigate, "see" the UI, and self-heal the code.

mcp.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@playwright/mcp@latest"
      ]
    }
  }
}
=========================================
implemented report porta in page_object_model.spec.ts
1.rpToken is fixture passing.
checking if the token is already exist or not 
const tokenPath = 'auth/rp_token.txt';
if the token is not available then running the test to get the token.