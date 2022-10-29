import { faker } from '@faker-js/faker';

const postUsuarios = require('./requests/postUsuarios')
const getUsuarios = require('../usuarios/requests/getUsuarios')
const deleteUsuarios = require('../usuarios/requests/deleteUsuarios')

describe('GET /usuarios', function () {

    context('Sucesso', function () {
        const email = faker.internet.email()
        const nome = 'Antonio Rodrigues Santos'
        const senha = 'antoniosantos@123124'
        const admin = 'true'

        before('Prepara DB', function () {
            cy.postUsuarios(nome, email, senha, admin)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    Cypress.env('_id', response.body._id)
                })
        })

        it('Busca usuário | Email', function () {
            cy.getUsuarios('email', email)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body.usuarios[0]).to.have.property('email', email)
                })
        })

        it('Busca usuário | Nome', function () {
            cy.getUsuarios('nome', nome)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body.usuarios[0]).to.have.property('nome', nome)
                })
        })

        it('Busca usuário | Senha', function () {
            cy.getUsuarios('password', senha)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body.usuarios[0]).to.have.property('password', senha)
                })
        })

        it('Busca usuário | Id', function () {
            const _id = Cypress.env('_id')
            cy.getUsuarios('_id', _id)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body.usuarios[0]).to.have.property('_id', _id)
                })
            cy.deleteUsuarios(_id)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                })
        })
    })

    context('Falha', function () {

        it('Email invalido', function () {
            cy.getUsuarios('email')
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body).to.have.property('email', 'email deve ser um email válido')

                })
        })
    })
})


