Cypress.Commands.add('postCarrinhos', (idProd1, qtd1, idProd2, qtd2, jwt) => {
    cy.api({
        method: 'POST',
        url: '/carrinhos',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: jwt
        },
        body: {
            "produtos": [
                {
                    "idProduto": idProd1,
                    "quantidade": qtd1
                },
                {
                    "idProduto": idProd2,
                    "quantidade": qtd2
                }
            ]
        }, failOnStatusCode: false
    })
})