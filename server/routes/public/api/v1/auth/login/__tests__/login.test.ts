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
  describe('/v1/login', () => {
    it('should login', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/login`,
        method: 'POST',
        data: {
          email: 'developer@test.com',
          password: 'abc123',
        },
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(200);
      expect(res.data).to.have.property('token');
    });
    it('should login with bad credentials', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/login`,
        method: 'POST',
        data: {
          email: 'test',
          password: 'test',
        },
        validateStatus: () => true,
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(403);
    });
  });
});
