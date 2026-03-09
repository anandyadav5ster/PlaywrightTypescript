import{ test,expect } from '@playwright/test';

test('Handle broken links',{}, async({page}) =>{

    await page.goto('');
    const links = await page.locator('#broken-link>a');
    const allinks = await links.all();
    const allLinkHrefs = await Promise.all(
        allinks.map(link => link.getAttribute('href'))
    )
      const validHrefs = allLinkHrefs.reduce((links, link) => {
    // Filter out untruthy href, `mailto:` and `#` links.
    if (link && !link?.startsWith("mailto:") && !link?.startsWith("#"))
      links.add(link)
    return links
  }, new Set<string>())

for (const url of validHrefs){
    try{
        const response = await page.request.get(url);
        expect.soft(`response.ok(), ${url} is valid}`);
    } catch{
            expect.soft(` ${url} is not valid}`);
    }
}

})