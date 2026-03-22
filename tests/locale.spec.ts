import{test, expect} from '@playwright/test';

test.describe('run test of different language and location',() =>{

    test.use({ 
 locale: 'de-DE',
  timezoneId: 'Europe/Berlin',});

	test('Run of french language',{tag:'@locale'}, async({page})=>{
	await page.goto('https://www.bing.com');

});	

});