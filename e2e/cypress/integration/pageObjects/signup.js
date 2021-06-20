class Signup {
    getParentNameInputBox(){
        return cy.get('#input-15')
    }
    getParentEmail(){
        return cy.get('#input-18')
    }
    getParentPhoneNumber(){
        return cy.get('#input-26')
    }

    getPassword(){
        return cy.get('#input-29')
    }

    getConfirmPassword(){
        return cy.get('#input-33')
    }

    getCountryCodeDropdown(){
        return cy.get('.country-code > .v-input__control > .v-input__slot')
    }

    getCountryDropdownList(){
        return cy.get('.v-list-item__content > .v-list-item__title')
    }

    getSignupButton(){
        return cy.get('.signUpBtn')
    }
}
export default Signup;