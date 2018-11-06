var async       = require('async');
var expect      = require('chai').expect;
var should      = require('chai').should();
var request     = require('supertest');

describe('ticketsController', function() {
    var authAgent = request.agent('http://localhost:3111');
    var user = { 'login-username': 'trudesk', 'login-password': '$2a$04$350Dkwcq9EpJLFhbeLB0buFcyFkI9q3edQEPpy/zqLjROMD9LPToW'};
    var cookie;

    //FIRST!
    before(function(done) {
        authAgent
            .post('/login')
            .send(user)
            .end(function(err, res) {
               cookie = res.headers['set-cookie'];

               done();
            });
    });

    it('/tickets/:status - should return tickets by status', function(done) {
        async.parallel([
            function(next) {
                authAgent.get('/tickets/new')
                    .set('cookie', cookie)
                    .end(function(err) {
                        expect(err).to.not.exist;

                        next();
                    });
            },
            function(next) {
                authAgent.get('/tickets/open')
                    .set('cookie', cookie)
                    .end(function(err) {
                        expect(err).to.not.exist;

                        next();
                    });
            },
            function(next) {
                authAgent.get('/tickets/pending')
                    .set('cookie', cookie)
                    .end(function(err) {
                        expect(err).to.not.exist;

                        next();
                    });
            },
            function(next) {
                authAgent.get('/tickets/closed')
                    .set('cookie', cookie)
                    .end(function(err) {
                        expect(err).to.not.exist;

                        next();
                    });
            }
        ], done);

    });

    it('/tickets/assigned - should get tickets assigned to user', function(done) {
        authAgent.get('/tickets/assigned')
            .set('cookie', cookie)
            .end(function(err) {
                expect(err).to.not.exist;

                done();
            });
    });

    it('/tickets/unassigned - should get unassigned tickets', function(done) {
        authAgent.get('/tickets/unassigned')
            .set('cookie', cookie)
            .end(function(err) {
                expect(err).to.not.exist;

                done();
            });
    });

    // it('/tickets/{uid} - should return single ticket', function(done) {
    //     authAgent.get('/tickets/1000')
    //         .set('cookie', cookie)
    //         .end(function(err) {
    //             expect(err).to.not.exist;
    //
    //             done();
    //         });
    // });
});