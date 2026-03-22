import {test} from '@playwright/test';


   
 test.use({
	geolocation: { longitude: 41.890221, latitude: 12.492348 },
	permissions: ['geolocation'],
});



test('verify geolocation', async({page}) =>{
	await page.goto("https://www.bing.com/maps?wlsso=0&toWww=1&redig=A77415E2AE66413C80849CB0DFF31A74&cp=13.013451%7E77.734665&lvl=11&style=r");
});
