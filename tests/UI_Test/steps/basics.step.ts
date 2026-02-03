import { test} from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { Locators } from '../../../Locators/locators';
import translation from '../../../test-data/translation.json';
import {Functions} from '../../../Functions/functions'



const { Given,When, Then } = createBdd();
test.describe('Handle floating menu',()=>{
   let locators: Locators;
    let functions: Functions;
    test.beforeEach(async ({ page }) => {
        locators = new Locators(page);
        functions = new Functions(page);
    });

    test('Verify user able to handle floating menu',{
        tag:['@login']
    },async({}) =>{
        Given('I navigate to url {string}', async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/floating_menu');
        });

        And('Click on news', async ({}) => {
            await functions.clickElement(locators.news);
        }); 
    })
  
});

function And(arg0: string, arg1: ({ }: {}) => Promise<void>) {
    throw new Error('Function not implemented.');
}

