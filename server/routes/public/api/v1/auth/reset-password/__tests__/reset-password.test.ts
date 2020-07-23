import { expect } from 'chai';
import { axios, server } from '../../../../../../../../test';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

let resetPasswordHash;

describe('api', () => {
  beforeEach(async () => {
    await server.start();
  });
  afterEach(async () => {
    await server.stop();
  });
  describe('/v1/reset-password', () => {
    it('should reset password', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/reset-password`,
        method: 'PUT',
        data: {
          email: 'developer@test.com',
          password: 'abc123',
        },
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(200);
      expect(res.data).to.have.property('resetPasswordHash');
      resetPasswordHash = res.data.resetPasswordHash;
    });
    it('should verify reset hash', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/reset-password/verify/${resetPasswordHash}`,
        method: 'GET',
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(200);
    });
    it('should error on bad email reset password', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/reset-password`,
        method: 'PUT',
        data: {
          email: 'test@test.test',
        },
        validateStatus: () => true,
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(404);
    });
    it('should error on bad verify reset hash', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/reset-password/verify/test`,
        method: 'GET',
        validateStatus: () => true,
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(404);
    });
    it('should reset password with timeout', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/reset-password`,
        method: 'PUT',
        data: {
          timeout: -1,
          email: 'developer@test.com',
          password: 'abc123',
        },
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(200);
      expect(res.data).to.have.property('resetPasswordHash');
      resetPasswordHash = res.data.resetPasswordHash;
    });
    it('should error on timeout', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/reset-password/verify/${resetPasswordHash}`,
        method: 'GET',
        validateStatus: () => true,
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(400);
    });
  });
});
