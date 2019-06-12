const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET /apps', () => {
  it('should return an array of applications', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
      })
  })
})