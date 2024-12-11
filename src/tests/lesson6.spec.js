import {expect, test} from "@playwright/test";
import { RegistrationPage } from "./pages/registration.page.spec";

function getToast(page) {
    return page.locator(".toast-message");
}

function getFieldError(page) {
    return page.locator(".invalid-feedback");
}

function getRightNavbar(page) {
    return page.locator(".navbar-right")
}

function getUserNameDropdown(page) {
    return getRightNavbar(page).locator('[data-toggle="dropdown"]');
}

test.describe("Registration Page", async () => {

    let registrationPage;
  
    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await registrationPage.open();
        // await open(page);
        // await test.expect(page).toHaveTitle(pageTitle);
    });

    test("should open registration form", async ({ page }) => {
       
        
        await expect(registrationPage.nameField, "name field should be visible").toBeVisible();
        await expect(registrationPage.nameField, "name field should be enabled").toBeEnabled();
        await expect(registrationPage.emailField, "email field should be visible").toBeVisible();
        await expect(registrationPage.emailField, "email field should be enabled").toBeEnabled();
        await expect(registrationPage.passwordField, "password field should be visible").toBeVisible();
        await expect(registrationPage.passwordField, "password field should be enabled").toBeEnabled();
        await expect(registrationPage.passwordConfirmField, "password confirmation field should be visible").toBeVisible();
        await expect(registrationPage.passwordConfirmField, "password confirmation field should be enabled").toBeEnabled();


    });
    
    test('should sigh up with valid credentials',async({page})=> {

        await registrationPage.nameField.fill('Ruda Paparuda');
        await registrationPage.emailField.fill('ruda.testemail@gmail.com');
        await registrationPage.passwordField.fill('paparudaPassword1');
        await registrationPage.passwordConfirmField.fill('paparudaPassword1');
        await registrationPage.buttonSubmit.click();

        const userNameDropDown = await getUserNameDropdown(page);
        await expect(userNameDropDown).toHaveText("Ruda Paparuda");

    });

    test('sign up should fail due to already existing credentials',async({page})=>{
        await registrationPage.nameField.fill('Ruda Paparuda');
        await registrationPage.emailField.fill('ruda.testemail@gmail.com');
        await registrationPage.passwordField.fill('paparudaPassword3');
        await registrationPage.passwordConfirmField.fill('paparudaPassword3');
        await registrationPage.buttonSubmit.click();

        const toast = await getToast(page);
        const errorFieldEmail = await getFieldError(page);

        await expect(toast).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
        await expect(errorFieldEmail).toHaveText("Účet s tímto emailem již existuje");


    });

    test('sign up should fail due to invalid password format',async({page})=> {
        await registrationPage.nameField.fill('Ruda Paparuda');
        await registrationPage.emailField.fill('ruda.paparudaTest@gmail.com');
        await registrationPage.passwordField.fill('123456');
        await registrationPage.passwordConfirmField.fill('123456');
        await registrationPage.buttonSubmit.click();

        const errorFieldPassword = await getFieldError(page);
        await expect(errorFieldPassword).toHaveText("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");

        await expect(registrationPage.nameField, "name field should be visible").toBeVisible();
        await expect(registrationPage.emailField, "email field should be visible").toBeVisible();
        await expect(registrationPage.passwordField, "password field should be visible").toBeVisible();
        await expect(registrationPage.passwordConfirmField, "password confirmation field should be visible").toBeVisible();
    });

});
