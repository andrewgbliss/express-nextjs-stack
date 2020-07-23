import { expect } from 'chai';
import { axios, server } from '../../../../../../../../test';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

describe('api', () => {
  beforeEach(async () => {
    await server.start();
  });
  afterEach(async () => {
    await server.stop();
  });
  describe('/v1/logout', () => {
    it('should logout', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/logout`,
        method: 'POST',
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(200);
    });
  });
});
