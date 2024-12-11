exports.RegistrationPage = class RegistrationPage {

    constructor(playwrightPage) {
        this.page = playwrightPage
        this.url = "https://team8-2022brno.herokuapp.com/registrace";
        this.nameField = this.page.getByLabel('Jméno a příjmení');
        this.emailField = this.page.getByLabel('Email');
        this.passwordField = this.page.getByLabel('Heslo');
        this.passwordConfirmField = this.page.getByLabel('Kontrola hesla');
        this.buttonSubmit = this.page.getByRole("button", { name: "Zaregistrovat"});
        
    }
    
    async open() {
        await this.page.goto(this.url);
    }

}