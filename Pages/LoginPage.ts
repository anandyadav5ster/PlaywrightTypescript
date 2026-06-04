import {type Locator, type Page} from "@playwright/test";


export class LoginPage {

    readonly page: Page;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly loginButton: Locator;
    constructor(page:Page){
        this.page = page;
        this.inputEmail = page.locator('#Input_Email');
        this.inputPassword = page.locator('#Input_Password');
        this.loginButton = page.locator('#login-submit')
    }

    async login(username: string, password: string): Promise<void>{
        await this.inputEmail.clear();
        await this.inputEmail.fill(username);
        await this.inputPassword.clear();
        await this.inputPassword.fill(password);
        await this.loginButton.click();
    }
}