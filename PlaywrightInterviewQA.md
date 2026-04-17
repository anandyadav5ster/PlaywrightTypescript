## Write first playwright test

``` ts
test('My First Test',  async ({page}) =＞ {
    await page.goto('https://google.com');
    await expect(page).toHaveTitle('Google');
})
```
## Async and await
The keyword async before a function makes the function return a promise
The keyword await before a function makes the function wait for a promise

## How to record test - Test Generator
>Playwright comes with a tool - Codegen also called Test Generator.     
>Record all the locators on the page

## Codegen command

>To add the url npx playwright codegen google.com

> See all options  npx playwright codegen --help

> specific browser (default:chromium) npx playwright codegen --browser firefox

> Record and save to a file  npx playwright codegen --target javascript -o record_example.js

> Set viewport - screen resolution (size)  npx playwright codegen --viewport-size=800,600

> Emulate devices  npx playwright codegen --device="iPhone 11"

> Emulate color scheme (if available) npx playwright codegen --color-scheme=dark



## What is Trace Viewer
>Trace Viewer is a GUI tool that helps viewing the executed test along with snapshots, 
timeline and other details (traces)

## How to use Trace Viewer
> Open config file and set  trace: 'on-first-retry'          
>It means - Collect trace when retrying the failed test for the 1st time only.     
>Save and Run a test to fail       
>Check trace.zip file created under test-results folder.   
>View trace - npx playwright show-trace trace.zip

 
## Trace Viewer Options
>'on-first-retry'  - Record a trace only when retrying a test for the first time.   
>'off'       - Do not record a trace.   
>'on'       - Record a trace for each test. (not recommended as it's performance heavy)     
>'retain-on-failure' - Record a trace for each test, but remove it from successful test runs

## To set trace on from command   
**npx playwright test --trace on**
>Different ways to view trace   
>Using command - **npx playwright show-trace trace.zip**    
>Using HTML Report  
>Using utility - https://trace.playwright.dev/

##  How to set Tracing programmatically
``` ts
test.only('test demo', async ({ page, context }) =＞ {
 await context.tracing.start({snapshots: true, screenshots: true})
 // test code
 await context.tracing.stop({path: 'test-trace.zip'});
});
```
## How to use before and after all tracing
``` ts
let context
let page
test.beforeAll(async ({ browser }) =＞ {
 context = await browser.newContext()
 await context.tracing.start({ screenshots: true, snapshots: true })
 page = await context.newPage()
})

test.afterAll(async () =＞ {
 await context.tracing.stop({ path: 'test-trace.zip' });
})
```
## Design Framework
https://www.testrail.com/blog/test-automation-framework-design/

## Design Pattern
https://www.geeksforgeeks.org/system-design/singleton-design-pattern/

## Software Development Life Cycle (SDLC)
>Requirement Analyis    
>Design     
>Developed      
>Testing    
>Deployment     
>Maintainance       

## Software Testing Life Cycle(STLC)
>Test Planning      
>Test Case Development      
>Test Environemnt Setup     
>Test Case Execution        
>Test Closure       

## Bug life Cycle
>New    
>Assigned   
>Open--> Reopen/Duplicate/Rejected/Deffered 
>Fixed      
>Pending Retest     
>Retest     
>Verified       
>Close      


## Types of Waits in Playwright
> Wait for an element to disappear
``` ts
await loader.waitFor({ state: 'hidden', timeout: 15000 });

await page.waitForURL(/.*dashboard/);
await page.waitForLoadState('networkidle'); 
await page.waitForResponse

expect(locator).toBeVisible()
expect(locator).toBeHidden()
expect(locator).toBeEnabled()
expect(locator).toBeChecked()
expect(locator).toHaveText('text')
expect(locator).toContainText('text')
expect(locator).toHaveValue('value')
expect(locator).toHaveAttribute('name', 'val')
expect(page).toHaveURL(/regex/)
expect(page).toHaveTitle(/regex/)
```

## Parallel Execution (Speed)

> This is the default for Playwright across different files. It runs multiple tests at the exact same time.     
>Behavior: Each test gets its own worker (or shares a worker concurrently if fullyParallel is on).

## Best For: Independent tests that don't share data or state.

## Syntax: test.describe.configure({ mode: 'parallel' });

> Serial Execution (Dependency)

> In serial mode, tests in a single file are executed one after another in the same worker.

> Behavior: If one test fails, all subsequent tests in that file are skipped.

Best For: Interdependent steps (e.g., Test 1 creates a resource, Test 2 edits it, Test 3 deletes it).

## Syntax: test.describe.configure({ mode: 'serial' })

>If fullyParallel is on: Tests run in parallel (using multiple workers).

>If fullyParallel is off: Tests run sequentially in a single worker.

> If fullyParallel is OFF (Default)
>>Across Files: Playwright starts both files simultaneously. Worker 1 takes Class One, and Worker 2 takes Class Two.

>Inside the Files: * Worker 1 runs the 5 tests in Class One one after another (sequentially).

>Worker 2 runs the 4 tests in Class Two one after another (sequentially).

>If fullyParallel is ON
>Across Files: Both files start at the same time.

Inside the Files: Playwright will attempt to run all 9 tests simultaneously using up to 9 different workers (depending on your hardware and workers configuration).

## Summary: Your "classes" (files) will always run at the same time; the setting only determines if the 5 tests inside Class One wait for each other or run all at once.

## Difference between Generators and Iterators in JavaScript
https://www.geeksforgeeks.org/javascript/difference-between-generators-and-iterators-in-javascript/

### Generators
>The Generators are a special type of function in JavaScript that can be paused and resumed during their
execution. They are defined using the asterisk (*) after the function keyword. 
The Generators use the yield keyword to yield control back to the caller while preserving their
execution context.  
>The Generators are useful for creating iterators, asynchronous code, and 
handling sequences of data without loading all the data into the memory at once.

### Example: In this example, we will see a simple generator function that yields values in the sequence.
``` js
function* GFG() {
    yield 10;
    yield 20;
    yield 30;
}
const generator = GFG();
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);

Output
10
20
30
```
### Iterators
>The Iterators are objects with a special structure in JavaScript.  
>They must have a next() method that returns an object with the value and done properties.  
>The value property represents the next value in the sequence and the done property indicates 
whether there are more values to be iterated.   
>The Iterators are commonly used for iterating 
over data structures like arrays, maps, and sets.

### Example: In this example, we will see an iterator looping through an array.
``` js
const colors = ['red', 'green', 'blue'];
const GFG = colors[Symbol.iterator]();
console.log(GFG.next());
console.log(GFG.next());
console.log(GFG.next());
console.log(GFG.next());

Output
{ value: 'red', done: false }
{ value: 'green', done: false }
{ value: 'blue', done: false }
{ value: undefined, done: true }
```

## Page Object Model
``` ts
// Page class
import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightDevPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly gettingStartedHeader: Locator;
  readonly pomLink: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
    this.pomLink = page.locator('li', {
      hasText: 'Guides',
    }).locator('a', {
      hasText: 'Page Object Model',
    });
    this.tocList = page.locator('article div.markdown ul > li > a');
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.gettingStartedHeader).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
}
```
``` ts
// test 
import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from './playwright-dev-page';

test('getting started should contain table of contents', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();
  await expect(playwrightDev.tocList).toHaveText([
    `How to install Playwright`,
    `What's Installed`,
    `How to run the example test`,
    `How to open the HTML test report`,
    `Write tests using web first assertions, page fixtures and locators`,
    `Run single test, multiple tests, headed mode`,
    `Generate tests with Codegen`,
    `See a trace of your tests`
  ]);
});

test('should show Page Object Model article', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.pageObjectModel();
  await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
});
```
## =============================Generating==================
> 1. Genernerating locator by recoding  
> Emulate geolocation, language and timezone    
**npx playwright codegen --timezone="Europe/Rome" --geolocation="41.890221,12.492348" --lang="it-IT" bing.com/maps**
## Visual comparison
``` ts
await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
expect(await page.textContent('.hero__title')).toMatchSnapshot('hero.txt');
```
## Types of wait 
>page.waitForSelector(selector, { state: '...' }): Waits for an element to satisfy a certain state (e.g., 'attached', 'visible', 'hidden', or 'detached').      
>page.waitForURL(url): Waits for the page to navigate to a specific URL pattern.    
>page.waitForLoadState(state): Waits for the page to reach a specific load state like 'load' or 'domcontentloaded'.
>page.waitForResponse(urlOrPredicate) / page.waitForRequest(urlOrPredicate): Pauses the test until a network request or response matching the criteria is observed. 

``` ts
powershel command
$env:USER_NAME=me
$env:PASSWORD=secret
npx playwright test

batch command
set USER_NAME=me
set PASSWORD=secret
npx playwright test
```
##  Intermittent Test Failures (Flaky Tests) 
>Isolate: Determine if it’s the code, the environment (network/latency), or the test itself (race conditions).  
>Analyze Logs: Check execution screenshots, video recordings, and console logs at the exact timestamp of failure.   
>Stability Check: Run the specific test in a loop (e.g., 50 times) to see the failure rate.     
>**Fix: Avoid hard-coded waits; use dynamic waits (Wait Until Element Visible) and ensure a clean state before each test.**
##  Dev vs. QA Environment Issues
>Check Configurations: Compare environment variables, database versions, and API endpoints. Often, QA has restricted **permissions** or different data.         
> **Build Version**: Verify that the exact build/commit deployed in Dev is what reached QA.
Data Consistency: Ensure the QA database isn't corrupted or missing specific test data required for the feature.    
>**Network/Firewall**: Check if QA environment restrictions (firewalls/VPNs) are blocking specific service calls. 
##  Proceeding with an Unstable Build
>Sanity First: Run a Sanity/Smoke suite to identify if core modules (Login, Payments, etc.) are broken.     
>Stop Testing: If basic functionality fails, reject the build and inform stakeholders immediately to save time.     
>Partial Testing: If only one module is unstable, block that area and continue testing independent, stable modules.     
>Report: Provide a "Blocked" status report highlighting the specific blockers preventing full testing. 
##  Prioritizing Under Tight Deadlines 
>**Risk-Based Testing**: Focus on high-risk, high-impact features (e.g., the "Happy Path" and core business logic).     
> **Priority** P0/P1 Cases: Execute Critical (P0) and High (P1) priority test cases first; defer Low-priority UI or cosmetic bugs.      
>**Regression**: Run an automated regression suite to ensure existing features didn't break.
Communication: Flag the risks to the Project Manager—be clear about what will and will not be tested.

##  Critical Prod Bug Reported by Client
>**Reproduce**: Immediately try to replicate the bug in the Staging/QA environment using the client's steps.        
>**Triage**: Assess the impact. If it's a "showstopper," it needs a Hotfix.     
>**Root Cause (RCA)**: Once fixed, perform a Root Cause Analysis. Why was this missed? (Missing test case? Environment difference?)     
>**Update Suite**: Add a new test case to the regression suite to ensure this specific bug never happens again. 

## Requirement, Test Case & Test Execution Scenarios
* **Unclear Requirement/BA Unavailable**: 
>- I would check the Confluence/Documentation history, 
look at existing UI/Code, or ask the Dev Lead. If still unclear, I’d document my assumptions, 
send an email to the BA for later confirmation, and proceed with the most logical path to avoid a total 
block

* **Blocker on first Test Case**: 
>- I would **immediately report the blocker to the Dev team**. While waiting, 
I’d **try to bypass the blocker** (e.g., using a direct URL or DB injection) to test other modules. 
**If everything is blocked**, I would **notify the Lead and switch to updating documentation or automation scripts.**

* **Expected Result is wrong in Requirement**: 
>- I would **verify with the Dev team and BA**. 
If they agree it's a documentation error, I'd **request a Requirement Change Request(CR)**. 
I would not pass the test based on "verbal" logic; the **documentation must be updated first**.

* **Bug not reproducible in UAT**: 
>- I would ask for the exact environment details (browser, version, user data). 
I’d record a video of me reproducing it or offer a screen-share session with the dev to show them the bug 
live.

**Smoke testing fails on new build:** 
>- I would reject the build immediately. Smoke testing is the entry 
criteria; if it fails, the build is not stable enough for functional testing. 
I’d inform the Dev Lead and stakeholders.

**100 TCs, 3 hours left:** 
>- I would use Risk-Based Testing. I’d prioritize P1 (Critical/High) test cases, 
focus on "Happy Path" scenarios, and cover the most recently changed code.
I’d inform the Lead that P2/P3 cases will remain pending.

**Release today vs. High-Severity Bug:** 
>- I would provide a detailed Risk Assessment.
I’d highlight what could go wrong if we release. The final "Go/No-Go" decision lies with the Product Owner,
>- but as QA, I must advocate for the user and recommend a delay or a hotfix.

**Prod Defect RCA:** 
>- I’d check P**roduction Logs**, verify if it was a "**Missing Requirement**" or a "**Test Miss"**,
" and see if it was environment-specific. I’d then update the regression suite to ensure it never happens again.
>- Works on my system, fails on theirs: I’d compare browser versions, cache, screen resolution, and 
user permissions. Often, it’s a "dirty" cache or a different user role causing the discrepancy.

**Last-minute Requirement Change:**
>- I’d perform an Impact Analysis. I’d identify which existing TCs are now 
invalid, update them, and communicate to the team if the original delivery date needs to shift due to 
the rework.

**Defects, Communication & Validation Scenarios**
>- Dev rejects a bug: I’d re-verify the requirement. If I'm right, I’d **provide screenshots, logs, and a video**. 
>- If the dev **still disagrees**, I’d **bring it to the Bug Triage meeting for a collective decision**.

**Bug leaked to production:** 
>- I would stay calm, help **reproduce it**, and **perform an RCA**. I’d identify 
**why the test case was missed and add it to the regression suite immediately to prevent recurrence**.

**Login takes too long:** 
>- This is a Performance/Usability bug. I’d measure the actual time using Network tab
(Chrome DevTools) and compare it against the NFR (Non-Functional Requirements) or industry standards
(usually < 3 seconds).

>- API partial data/UI stuck: I’d check the API response in the Network tab. If the JSON is incomplete, 
it’s a Backend bug. If the JSON is full but the UI is blank, it’s a Frontend bug.

** Related Bugs:**
>- I would report them separately if they have different root causes. If they all item from 
one single error, I'd report one main bug and list the impacted areas to avoid duplicates.

>- System slow, no steps: I’d use Monitoring tools (like New Relic or Dynatrace) or check server logs during 
>- the slowness. I’d also look for patterns (e.g., does it happen only when the DB has large records?).

**Dependent module not ready:**
>- I would use Stubbing or Mocking. I’d simulate the missing module’s response (using tools like Mockito or Postman Mocks) to continue testing my module.

**Inconsistent Bug:** 
>- I’d report it as "Intermittent" and include as much detail as possible (logs, timestamps, system load). 
>- I’d try to find a pattern (e.g., happens only after 10 consecutive clicks).

"Working on my machine": I’d check his Config files, DB version, and Environment variables. Usually, developers have "cleaner" data or higher permissions than the QA environment.

**Negative scenarios for a form: **
>- I’d use Boundary Value Analysis and Equivalence Partitioning. I’d test empty fields, special characters, exceeding character limits, and incorrect data types.

**UI, Data, Compatibility & Edge Cases**
>- Chrome vs. Safari failure: I’d check for CSS/JavaScript compatibility issues. Some JS functions or CSS 
properties (like certain flexbox behaviors) aren't supported equally across engines (V8 vs. WebKit).

**No real payment card:**
>- I’d use Test Cards provided by the gateway (Stripe/Paypal). If those aren't available, I’d ask Devs to "Mock" a successful/failed transaction response in the sandbox environment.

>- 100MB File Upload: I’d test Timeout limits, Progress bar accuracy, and Server-side validation (does it reject 101MB?). I’d also check if the system remains responsive during the upload.

>- Unstable SMS/OTP: I’d check the DB/Logs to see if the OTP was generated. If the SMS gateway is down, 
I’d request the dev to temporarily redirect the OTP to a console log or a mock email.

>- Search results change: I’d check if the search is based on dynamic algorithms 
(like "Trending" or "Price Fluctuations"). If it’s supposed to be static, 
I’d check the SQL query for inconsistent sorting (ORDER BY).

>- 10K records vs 2K load: I’d check for Pagination or Lazy Loading issues. 
I’d also verify if there is a hard-coded "Limit" in the API query or a timeout on the frontend.

>- Calculator/No requirements: I’d use Ad-hoc testing and compare it against standard calculators 
(like Windows/iOS). I’d focus on edge cases: dividing by zero, very large numbers, and decimal precision.

>- Peak traffic bug: I’d use Load Testing tools (JMeter/LoadRunner) to simulate high traffic in a 
performance environment and capture the logs/memory leaks during the spike.

>- UI Alignment on resolutions: I’d use Chrome DevTools Emulation or tools like BrowserStack.
I’d look for "Hardcoded pixel values" in the CSS instead of responsive percentages.

>- No Log Access: I’d ask the DevOps/Admin for "Read-only" access or request a Log Aggregator 
(like Splunk/ELK). If all fails, I’d ask a developer to share the specific log snippet for a timestamp.

