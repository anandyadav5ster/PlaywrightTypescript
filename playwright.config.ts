import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import * as dotenv from 'dotenv';

/**
 * Load environment variables from .env file.
 */
dotenv.config();

// 1. Environment & URL Logic
// Default to 'staging' if no environment is provided
const env = process.env.ENVIRONMENT;
if(!env)
    throw new Error('❌ ENVIRONMENT variable is missing! Please set it in your .env file or CLI (e.g., ENVIRONMENT=dev).');

const Base_URL = `https://${env}.automationexercise.com`;
/*  const Base_URL = () => {
  const env = process.env.ENVIRONMENT || 'dev';
    switch(env){

      case 'dev':
        return `https://${env}.automationexercise.com`;
      case 'staging':
        return `https://${env}.automationexercise.com`;  

    }

 } */


// 2. Define Authentication Storage Path
// We export this so it can be referenced in global-setup.ts
export const STORAGE_STATE = path.join(__dirname, '.auth/user.json');

export default defineConfig({
  testDir: './tests',
  
  // 3. Global Setup
  // This runs once before all workers start. It should perform the login.
  globalSetup: require.resolve('./global-setup.ts'),

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list']
  ],

  use: {
    headless: true,
    // baseURL: Base_URL(),
    baseURL: Base_URL,
    
    // 4. Global State Injection
    // Every test will start with the cookies/storage found in this file
    storageState: STORAGE_STATE,
    
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});