import { faker } from '@faker-js/faker';

const postUsuarios = require('../usuarios/requests/postUsuarios')
const deleteUsuarios = require('../usuarios/requests/deleteUsuarios')

describe('POST /usuarios', function () {

    context('Sucesso', function () {

        it('Cadastro Admin', function () {

            const email = faker.internet.email()

            cy.postUsuarios('Antonio', email, '123124', 'true')
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
                    expect(response.body._id).is.not.null
                    Cypress.env('_id', response.body._id)
                })

            var _id = Cypress.env('_id')
            cy.deleteUsuarios(_id)
                .then(function (response) {
                    expect(response.status).to.eql(200)

                })
        })

        it('Cadastro Não admin', function () {
            const email = faker.internet.email()
            cy.postUsuarios('Antonio', email, '123124', 'false')
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
                    expect(response.body._id).is.not.null
                    Cypress.env('_id', response.body._id)
                })
            var _id = Cypress.env('_id')
            cy.deleteUsuarios(_id)
                .then(function (response) {
                    expect(response.status).to.eql(200)

                })
        })
    })

    context('Falha', function () {

        it('Cadastro duplicado', function () {

            const email = faker.internet.email()

            cy.postUsuarios('Antonio', email, '123124', 'true')
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
                    expect(response.body._id).is.not.null
                })
            cy.postUsuarios('Antonio', email, '123124', 'true')
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body).to.have.property('message', "Este email já está sendo usado")
                })
        })

        it('Erro no admin', function () {
            cy.postUsuarios('Antonio', faker.internet.email(), '123124', false)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body).to.have.property('administrador', "administrador deve ser 'true' ou 'false'")
                })
        })

        it('Senha diferente de string', function () {
            cy.postUsuarios('Antonio', faker.internet.email(), 123124, "false")
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body).to.have.property('password', 'password deve ser uma string')
                })
        })

        it('Valores vazios', function () {
            cy.postUsuarios()
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body).to.have.property('nome', 'nome é obrigatório')
                    expect(response.body).to.have.property('email', 'email é obrigatório')
                    expect(response.body).to.have.property('password', 'password é obrigatório')
                    expect(response.body).to.have.property('administrador', 'administrador é obrigatório')
                })
        })
    })
})