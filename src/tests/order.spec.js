import { expect, test } from "@playwright/test";
import { OrderPage } from "./pages/order.page.spec";

const timestamp = Math.floor(Date.now() / 1000);
const ICO = "22834958";
const clientName = "Czechitas z.ú.";
const address = "Václavské náměstí 837, 11000 Praha";
const substituteName = "Jméno Zástupce";
const contactName = "Jméno Kontaktu";
const contactPhone = "774952432";
const contactEmail = `email-${timestamp}@czechitas.com`;
const startDate1 = "2023-05-02";
const endDate1 = "2023-05-12";


test.describe("order Page", async () => {

    let orderPage;

    test.beforeEach(async ({ page }) => {
        orderPage = new OrderPage(page);
        await orderPage.open();

    });
    // Uživatel může odeslat vyplněnou objednávku na příměstský tábor
    test("Submit form", async ({ page }) => {
        await orderPage.openOrderForm();
        await orderPage.fillIco(ICO);


        await orderPage.fillClientName(clientName);
        await orderPage.fillAddress(address);
        await orderPage.fillSubstitute(substituteName);
        await orderPage.fillContactName(contactName);
        await orderPage.fillContactPhoneField(contactPhone);
        await orderPage.fillContactEmailField(contactEmail);
        await orderPage.fillFirstStartDate(startDate1);
        await orderPage.fillFirstEndDate(endDate1);

        await orderPage.openPrimerskyTaborForm();
        await orderPage.fillNoOfStudents("15");
        await orderPage.fillStudentsAge("10");
        await orderPage.fillNoOfAdults("4");
        await orderPage.submitForm();
        await expect(page.locator("h3")).toHaveText("Děkujeme za objednávku");

    });

    //Objednávku nelze odeslat pokud není řádně vyplněna
    test("Submit form with no ICO", async ({ page }) => {
        await orderPage.openOrderForm();

        await orderPage.fillClientName(clientName);
        await orderPage.fillAddress(address);
        await orderPage.fillSubstitute(substituteName);
        await orderPage.fillContactName(contactName);
        await orderPage.fillContactPhoneField(contactPhone);
        await orderPage.fillContactEmailField(contactEmail);
        await orderPage.fillFirstStartDate(startDate1);
        await orderPage.fillFirstEndDate(endDate1);

        await orderPage.openPrimerskyTaborForm();
        await orderPage.fillNoOfStudents("10");
        await orderPage.fillStudentsAge("11");
        await orderPage.fillNoOfAdults("3");
        await orderPage.submitForm();
        await expect(page.locator("h3")).not.toHaveText("Děkujeme za objednávku");

    });

});
