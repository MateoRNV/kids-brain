import { Given, And, Then } from "cypress-cucumber-preprocessor/steps";
import PageObjects from '../../../pageObjects/signup';

const signupObject = new PageObjects();

Given("I opened web page", function () {
    cy.visit(Cypress.env("url") + "/signup");
})

Then("Fill parent details", function () {
    signupObject.getParentNameInputBox().type(this.data.fullName);
    signupObject.getParentEmail().type(this.data.email);
    signupObject.getCountryCodeDropdown().click();
    signupObject.getCountryDropdownList().each(($el, index, $list) => {
        if ($el.text().trim() === this.data.countryCode) {
            signupObject.getCountryDropdownList().eq(index).click();
        }
    });
    signupObject.getParentPhoneNumber().type(this.data.phoneNumber);
    signupObject.getPassword().type(this.data.password);
    signupObject.getConfirmPassword().type(this.data.password);
})

And("Signup to register account", function () {
    cy.intercept('POST', '**/users').as("userPostApi");
    signupObject.getSignupButton().click()
    cy.wait('@userPostApi').should(({ request, response }) => {
       expect(response.statusCode).to.eq(201)
      })
})
