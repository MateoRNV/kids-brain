beforeEach(function(){
    cy.fixture("signup").then(function(data){
        console.log(data);
        this.data = data;
    })
})
