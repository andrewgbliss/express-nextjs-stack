const { expect } = require('chai');
const axios = require('axios');
const server = require('../../../../../../test/server');

describe('routes', () => {
  beforeEach(async () => {
    await server.start();
  });
  afterEach(async () => {
    await server.stop();
  });
  describe('api/v1/info', () => {
    it('should GET /api/v1/info', async () => {
      const res = await axios(`http://localhost:3000/api/v1/info`);
      expect(res.status).to.equal(200);
    });
  });
});
