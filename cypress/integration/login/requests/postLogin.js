Cypress.Commands.add('postLogin', (email, password) => {
    cy.api({
        method: 'POST',
        url: '/login',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: {
            "email": email,
            "password": password
        }, failOnStatusCode: false
    })
})