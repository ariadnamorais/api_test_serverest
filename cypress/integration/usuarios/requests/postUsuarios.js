Cypress.Commands.add('postUsuarios', (nome, email, password, admin) => {
    cy.api({
        method: 'POST',
        url: '/usuarios',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": admin
        }, failOnStatusCode: false
    })
})