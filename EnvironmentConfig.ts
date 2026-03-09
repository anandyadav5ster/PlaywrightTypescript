/**
 * Centralized environment configuration.
 * You can add as many environments as needed here.
 */

export interface EnvConfig {
    baseUrl: string;
    apiUrl: string;
    adminUser: string;
    dbName: string;
}

const dev: EnvConfig = {
    baseUrl: 'https://dev.automationexercise.com',
    apiUrl: 'https://dev.automationexercise.com/api',
    adminUser: 'dev_admin@test.com',
    dbName: 'dev_db'
};

const staging: EnvConfig = {
    baseUrl: 'https://staging.automationexercise.com',
    apiUrl: 'https://staging.automationexercise.com/api',
    adminUser: 'staging_admin@test.com',
    dbName: 'staging_db'
};

const prod: EnvConfig = {
    baseUrl: 'https://automationexercise.com',
    apiUrl: 'https://automationexercise.com/api',
    adminUser: 'prod_admin@real.com',
    dbName: 'prod_db'
};

// Logic to select the environment based on the 'ENV' system variable
const environments: Record<string, EnvConfig> = { dev, staging, prod };
const selectedEnv = process.env.ENV || 'dev'; // Default to 'dev' if not specified

export const CONFIG = environments[selectedEnv];