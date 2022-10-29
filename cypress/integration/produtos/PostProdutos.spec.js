import { faker } from '@faker-js/faker';

const postUsuarios = require('../usuarios/requests/postUsuarios')
const deleteUsuarios = require('../usuarios/requests/deleteUsuarios')
const postLogin = require('../login/requests/postLogin')
const postProdutos = require('../produtos/requests/postProdutos')

describe('POST /produtos', function () {

    context('Sucesso', function () {

        before('Prepara DB', function () {
            const email = faker.internet.email()
            cy.postUsuarios('Antonio', email, '123124', 'true')
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    Cypress.env('_id', response.body._id)
                })
            cy.postLogin(email, '123124')
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    Cypress.env('authorization', response.body.authorization)
                })
        })

        it('Cadastra produto', function () {
            const nome = faker.commerce.productName()
            const preco = 150
            const descricao = faker.commerce.productDescription()
            const quantidade = 40
            const jwt = Cypress.env('authorization')

            cy.postProdutos(nome, preco, descricao, quantidade, jwt)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
                    expect(response.body._id).is.not.null
                })
        })
    })

    context('Falha', function () {

        before('Prepara DB', function () {
            const email = faker.internet.email()

            cy.postUsuarios('Antonio', email, '123124', 'true')
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    Cypress.env('_id', response.body._id)
                })
            cy.postLogin(email, '123124')
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    Cypress.env('authorization', response.body.authorization)
                })
        })

        it('Já existe produto com esse nome', function () {
            const nome = faker.commerce.productName()
            const preco = 150
            const descricao = faker.commerce.productDescription()
            const quantidade = 40
            const jwt = Cypress.env('authorization')

            cy.postProdutos(nome, preco, descricao, quantidade, jwt)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
                    expect(response.body._id).is.not.null
                })
            cy.postProdutos(nome, preco, descricao, quantidade, jwt)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body).to.have.property('message', 'Já existe produto com esse nome')
                })
        })

        it('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais', function () {
            const nome = faker.commerce.productName()
            const preco = 150
            const descricao = faker.commerce.productDescription()
            const quantidade = 40
            const jwt = Cypress.env('authorization')

            cy.postProdutos(nome, preco, descricao, quantidade)
                .then(function (response) {
                    expect(response.status).to.eql(401)
                    expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
                    expect(response.body._id).is.not.null
                })
        })
    })

    context('Falha - Não admin', function () {

        before('Prepara DB', function () {
            const email = faker.internet.email()

            cy.postUsuarios('Antonio', email, '123124', 'false')
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    Cypress.env('_id', response.body._id)
                })
            cy.postLogin(email, '123124')
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    Cypress.env('authorization', response.body.authorization)
                })
        })

        it('Rota exclusiva para administradores', function () {
            const nome = faker.commerce.productName()
            const preco = 150
            const descricao = faker.commerce.productDescription()
            const quantidade = 40
            const jwt = Cypress.env('authorization')

            cy.postProdutos(nome, preco, descricao, quantidade, jwt)
                .then(function (response) {
                    expect(response.status).to.eql(403)
                    expect(response.body).to.have.property('message', 'Rota exclusiva para administradores')
                    expect(response.body._id).is.not.null
                })
        })
    })
})