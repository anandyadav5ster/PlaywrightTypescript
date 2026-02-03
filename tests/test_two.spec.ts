import { expect, request, test } from '@playwright/test';
import { Locators } from '../Locators/locators';
import translation from '../test-data/translation.json';
import {Functions} from '../Functions/functions'

let locators: Locators;
let functions: Functions;

test.beforeEach(async({page}) =>{
    locators = new Locators(page);
    functions = new Functions(page);
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
})

test.afterEach(async({page}) =>{
    await page.close();
})

test('Launch application',async({page}) =>{
    
    await expect(page).toHaveURL(/\/playwrightpractice\.html/);
})

test('verify enter input field', async({page}) =>{
    // await page.locator('#username').fill('test');
    await functions.fillInput(locators.username,'test');
})

test('verify click on button',async({page}) =>{
    // await page.getByRole('button',{name:'Primary Action'}).click();
    await page.getByRole('button',{name:translation.en.buttons["Primary Action"]}).click();
})

test('Verify toggle button',async({page}) =>{
    await page.getByRole('button',{name:translation.en.buttons["Toggle Button"]}).click();
    });

test('Verify checkbox',async({page}) =>{
    await page.getByRole('checkbox',{name:'Accept Terms'}).click();
    await expect(page.getByRole('checkbox',{name:'Accept Terms'})).toBeChecked();
});

test('get attribute color',async({page}) =>{
    const element = await page.getByText('colored text');
    const color = await element.evaluate((el) =>{
        return window.getComputedStyle(el).getPropertyValue('color');
    });
    console.log('Color of the text is:', color);
});

test('Click on link',async({page}) =>{
    await page.getByRole('link',{name:translation.en.Links["Link"]}).click();
});

test('Verify Submit form',async({page}) =>{
    await page.getByRole('button',{name:translation.en.buttons["Submit_Form"]}).click();
    });

test('verify getByLabel',async({page}) =>{
    await page.getByLabel('Email Address:').fill('test@gmail.com');
    await page.getByLabel('Password:').fill('test123');
    await page.getByLabel('Your Age:').fill("33");
    await page.getByLabel('Standard').click();
    await page.getByLabel('Express').click();
});

test('Verify getByPlaceholder', async({page}) =>{
    await page.getByPlaceholder('Enter your full name').fill('test');
    await page.getByPlaceholder('Phone number').fill('98456734');
    await page.getByPlaceholder('Type your message here').fill('Hello World');
});

test('Click on image  getByaltText()',async({page}) =>{
     await page.getByAltText('logo image').scrollIntoViewIfNeeded();
    await page.getByAltText('logo image').click();
})


test('Verify upload files file', async({page}) =>{
    const singleInputFile = await page.locator('input[id="singleFileInput"]');
    singleInputFile.setInputFiles("./test-data/file1.txt");
    await singleInputFile.scrollIntoViewIfNeeded();
    const multipleInput = await page.locator('input[id="multipleFilesInput"]')
    multipleInput.setInputFiles(['./test-data/file1.txt','./test-data/file2.txt']);
    await multipleInput.scrollIntoViewIfNeeded();
})

test('Handle simple alert', async({page}) =>{
    
    page.on('dialog', dialog => {
          console.log(`Listener captured: ${dialog.message()}`);
        // console.log(msg);
        dialog.accept()

    });
    const alert = page.locator('#alertBtn').filter({hasText:translation.en.alert["SimpleAlert"]});
    await alert.click();

});

test('Confirm Alert', async({page}) =>{
    page.on('dialog', dialog=>{
        console.log(dialog.message());
        dialog.accept();
    });
    const confirmAlert = page.locator('#confirmBtn').filter({hasText:translation.en.alert["ConfirmDialog"]});
    await confirmAlert.click();
})

test('Prompt alert', async({page}) =>{
    page.on('dialog', dialog =>{
       dialog.accept("John");
        const msg = dialog.message();
        console.log(msg);
        
    });
    const confirmAlert = page.locator('#promptBtn').filter({hasText:translation.en.alert["PromptAlert"]});
    await confirmAlert.click();
    const promptMsg = await page.locator('#demo');
    await expect(promptMsg).toHaveText(/Hello John/);

})

test('Handle new tab', async({page,context}) =>{
   await page.goto('https://the-internet.herokuapp.com/windows');
    const [newTab] = await Promise.all([
       
        context.waitForEvent('page'),
        await page.locator("a[href*='windows/new']").click(),
        
    ]);
  
    // Verify content on the new page
    const title = await newTab.title();
    console.log('New tab title:', title);
    const url = await newTab.url();
    console.log('New tab title url:', url);

    // Optional: Perform actions in the new tab
    // await newTab.locator('h1').textContent();

    // Close the tab and return focus
    await newTab.close();
    await page.bringToFront();
});



test('Nested left frame', async({page}) =>{
    await page.goto('https://the-internet.herokuapp.com/nested_frames');
    await functions.clickFrame(locators.getLeftFrame(),"body");
    // await functions.clickElement(locators.frameInput);
});

test('Handle hover', async({page}) =>{
    await page.goto('https://the-internet.herokuapp.com/images');
    await functions.mouseHover(locators.avatar1);
    // await functions.clickElement(locators.frameInput);
});

test('Handle broken images', async({page, request}) =>{
    await page.goto('https://the-internet.herokuapp.com/broken_images');
   
})