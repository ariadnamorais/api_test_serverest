import { faker } from '@faker-js/faker';

const postUsuarios = require('../usuarios/requests/postUsuarios')
const deleteUsuarios = require('../usuarios/requests/deleteUsuarios')
const postLogin = require('../login/requests/postLogin')
const postProdutos = require('../produtos/requests/postProdutos')
const postCarrinhos = require('../carrinho/requests/postCarrinhos')
const getProdutos = require('../produtos/requests/getProdutosId')

describe('POST /carrinhos', function () {

    context('Sucesso', function () {
        const email = faker.internet.email()

        it('Cadastra usuário', function () {
            cy.postUsuarios('Antonio', email, '123124', 'true')
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    Cypress.env('_id', response.body._id)
                })
        })

        it('Loga', function () {
            cy.postLogin(email, '123124')
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    Cypress.env('authorization', response.body.authorization)
                })
        })

        it('Cadastra produto 1', function () {
            const nome = faker.commerce.productName()
            const jwt = Cypress.env('authorization')
            cy.postProdutos(nome, 150, 'descricao', 40, jwt)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
                    expect(response.body._id).is.not.null
                    Cypress.env('idProd1', response.body._id)
                })
        })

        it('Cadastra produto 2', function () {
            const nome = faker.commerce.productName()
            const jwt = Cypress.env('authorization')
            cy.postProdutos(nome, 160, 'descricao', 20, jwt)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
                    expect(response.body._id).is.not.null
                    Cypress.env('idProd2', response.body._id)
                })
        })

        it('Cadastra carrinho', function () {

            const idProd1 = Cypress.env('idProd1')
            const idProd2 = Cypress.env('idProd2')
            const jwt = Cypress.env('authorization')

            cy.postCarrinhos(idProd1, 2, idProd2, 3, jwt)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
                    expect(response.body._id).is.not.null
                    Cypress.env('_idcar', response.body._id)
                })
        })

        it('Valida quantidade dos produtos', function () {
            const idProd1 = Cypress.env('idProd1')
            const idProd2 = Cypress.env('idProd2')
            cy.getProdutos(idProd1)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.have.property('quantidade', 38)
                })
            cy.getProdutos(idProd2)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.have.property('quantidade', 17)
                })
        })

    })
})