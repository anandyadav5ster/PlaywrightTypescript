import { test,expect } from '../fixture';
import { PlaywrightDevPage} from '../Pages/PlaywrightDevPage';




test('page object model', async({page,rpToken}) =>{
    console.log(`Received RP Token: ${rpToken}`);

    // 1. Basic validation of the token string
    expect(rpToken).toBeDefined();
    expect(rpToken.length).toBeGreaterThan(10);

    const pom = new PlaywrightDevPage(page);
    await pom.gotoApplication();
    await pom.verifyHomePage();

});