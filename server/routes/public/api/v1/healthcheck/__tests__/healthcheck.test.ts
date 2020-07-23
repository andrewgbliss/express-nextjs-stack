import { expect } from 'chai';
import { server, axios } from '../../../../../../../test';

describe('routes', () => {
  beforeEach(async () => {
    await server.start();
  });
  afterEach(async () => {
    await server.stop();
  });
  describe('/v1/healthcheck', () => {
    it('should GET /v1/healthcheck', async () => {
      const res = await axios(`/v1/healthcheck`);
      expect(res.status).to.equal(200);
    });
    it('should return a 500', async () => {
      const options: any = {
        url: `/v1/healthcheck/error`,
        method: 'GET',
        validateStatus: false,
      };
      const res = await axios(options);
      expect(res.status).to.equal(500);
    });
  });
});
