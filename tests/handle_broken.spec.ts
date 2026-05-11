import{ test,expect } from '@playwright/test';

test('Handle broken links',{}, async({page}) =>{

    await page.goto('');
    const links = await page.locator('#broken-link>a');
    const allinks = await links.all();
    const allLinkHrefs = await Promise.all(
        allinks.map(link => link.getAttribute('href'))
    )
     

  for (const url of allLinkHrefs) {
    if (!url || url.startsWith('#') || url.startsWith('mailto:')) continue;
    try {
    const response = await page.request.get(url);
    if(response.status()>=400){
        console.log(`❌ Broken Link: [${response.status()}] ${url}`);
    }
    expect.soft(response.ok(), `URL failed: ${url}`);
    } catch {
        expect.soft(false, `Could not reach URL: ${url}`);
    }
}

})