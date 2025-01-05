exports.OrderPage = class OrderPage {

    constructor(page) {
        this.page = page
        this.url = "https://team8-2022brno.herokuapp.com/";

        this.icoField = this.page.locator("#ico")
        this.clientName = this.page.locator("#client");
        this.addressField = this.page.locator("#address");
        this.substituteField = this.page.locator("#substitute");
        this.contactName = this.page.locator("#contact_name");
        this.contactPhoneField = this.page.locator("#contact_tel");
        this.contactEmailField = this.page.locator("#contact_mail");
        this.startDate1Id = this.page.locator("#start_date_1");
        this.endDate1Id = this.page.locator("#end_date_1");
        this.noOfStudents = this.page.locator("#camp-students");
        this.studentsAge = this.page.locator("#camp-age");
        this.noOfAdults = this.page.locator("#camp-adults");

    }

    async open() {
        await this.page.goto(this.url);

    }
    async openOrderForm() {
        await this.page.getByRole("button", { name: "Pro učitelé" }).click();
        await this.page.locator('.dropdown-item').filter({ hasText: 'Objednávka pro MŠ/ZŠ' }).click();
        await this.page.locator('xpath=//form[@action="https://team8-2022brno.herokuapp.com/objednavka"]').waitFor({
            state: "visible",
            timeout: 5000
        });

    }
    async fillIco(ico) {
        await this.icoField.click();
        await this.icoField.fill(ico);

        await this.page.keyboard.press("Enter");
        await this.page.locator(".toast-message").waitFor();

    }
    async fillClientName(clientname) {
        console.log("A")
        await this.clientName.fill(clientname);

    }
    async fillAddress(address) {
        await this.addressField.fill(address);
    }
    async fillSubstitute(substituteName) {
        await this.substituteField.fill(substituteName);
    }
    async fillContactName(contactName) {
        await this.contactName.fill(contactName);
    }
    async fillContactPhoneField(contactPhone) {
        await this.contactPhoneField.fill(contactPhone);

    }
    async fillContactEmailField(contactEmail) {
        await this.contactEmailField.fill(contactEmail);

    }
    async fillFirstStartDate(startDate1) {
        await this.startDate1Id.fill(startDate1);

    }
    async fillFirstEndDate(endDate1) {
        await this.endDate1Id.fill(endDate1);
    }
    async openPrimerskyTaborForm(){
        await this.page.getByRole("tab", { name: "Příměstský tábor" }).click();

    }

    async fillNoOfStudents(campStudents) {
        await this.noOfStudents.fill(campStudents);

    }
    async fillStudentsAge(campAge) {
        await this.studentsAge.fill(campAge);

    }
    async fillNoOfAdults(campAdults) {
        await this.noOfAdults.fill(campAdults);
    }
    async submitForm(page){
        await this.page.getByRole("button", { name: "Uložit objednávku" }).click();


    }
    async getToast(page) {
        return this.page.locator(".toast-message");
    }
}

