import {test, expect } from '@playwright/test';

test('Reading environment variable', async({page, baseURL})=>{
      console.log('Environment Mode:', process.env.ENV);
	console.log('Final Base URL:', baseURL);

});