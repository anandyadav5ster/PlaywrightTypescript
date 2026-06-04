import { defineConfig, devices } from '@playwright/test';

import * as path from 'path';
// import * as dotenv from 'dotenv';
// @ts-ignore
import dotenv from 'dotenv';
// @ts-ignore
import fs from 'fs';

const storagePath:string = path.join(__dirname,'./tests/auth/login.json');
const getRPToken = () => {
  const tokenPath = 'auth/rp_token.txt';
  if (fs.existsSync(tokenPath)) {
    const fileToken = fs.readFileSync(tokenPath, 'utf-8').trim();
    if (fileToken) return fileToken;
  }
  return process.env.RP_TOKEN || 'PENDING_GENERATION'; 
};

const RP_TOKEN = getRPToken();
const RP_ENDPOINT = "https://demo.reportportal.io/api/v1";
const RP_PROJECT = "anandyadav5ster_personal";

// const RP_CONFIG = {
//   apiKey: RP_TOKEN,
//   endpoint: RP_ENDPOINT,
//   project: RP_PROJECT,
//   launch: `Playwright`,
//   description: 'Automated test run from Playwright',
//   attributes: [
//     {
//       key: "attributeKey",
//       value: "attrbiuteValue",
//     },
//     {
//       value: "anotherAttrbiuteValue",
//     },
//   ],
//   mode: 'DEFAULT',
// };
/**
 * Load environment variables from .env file.
 */
dotenv.config();

// 1. Environment & URL Logic
// Default to 'staging' if no environment is provided
const env: string|undefined = process.env.ENV;
if(!env)
    throw new Error('❌ ENVIRONMENT variable is missing! Please set it in your .env file or CLI (e.g., ENVIRONMENT=dev).');
else{
  console.log(`Environment is ${env}`)
}
// const Base_URL = `https://${env}.automationexercise.com`;
const Base_URL = () => {
  const env = (process.env.ENV || 'dev').toLowerCase().trim();
    switch(env){

      case 'dev':
        return `https://${env}.automationexercise.com`;
      case 'staging':
        return `https://${env}.automationexercise.com`;
      default:
        const err = new Error("❌ Please enter valid environment");
        err.stack = ""; // This removes the file path and line numbers
        throw err;
  
    }
  }


// 2. Define Authentication Storage Path
// We export this so it can be referenced in auth.setup.ts
// export const STORAGE_STATE = path.join(__dirname, 'auth/user.json');

export default defineConfig({
  testDir: './tests',
  
  // 3. Global Setup
  // This runs once before all workers start. It should perform the login.
  // globalSetup: require.resolve('./auth.setup.ts'),

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
    // ['@reportportal/agent-js-playwright', RP_CONFIG]
  ],

  use: {
    headless: true,
    baseURL: Base_URL(),
    // baseURL: Base_URL,
    
    // 4. Global State Injection
    // Every test will start with the cookies/storage found in this file
    // storageState: STORAGE_STATE,
    
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/, // Define setup project
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        storageState: storagePath
      },
      // dependencies: ['setup']
    },
    // {
    //   name: 'edge',
    //   use: { ...devices['Desktop Edge'],
    //     storageState: storagePath },
    //   // dependencies: ["setup"]
    // },
  ],
});