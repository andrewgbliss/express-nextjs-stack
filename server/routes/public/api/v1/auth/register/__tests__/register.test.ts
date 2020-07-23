import { expect } from 'chai';
import { axios, server } from '../../../../../../../../test';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

let verificationHash;

describe('api', () => {
  beforeEach(async () => {
    await server.start();
  });
  afterEach(async () => {
    await server.stop();
  });
  describe('/v1/register', () => {
    it('should register a new account and user', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/register`,
        method: 'POST',
        data: {
          email: 'test@test.com',
          password: 'abc123',
        },
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(200);
      expect(res.data).to.have.property('verificationHash');
      verificationHash = res.data.verificationHash;
    });
    it('should complete registration with the hash code', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/register/complete/${verificationHash}`,
        method: 'GET',
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(200);
      expect(res.data).to.have.property('token');
    });
    it('should error registration with bad hash code', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/register/complete/test`,
        method: 'GET',
        validateStatus: () => true,
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(404);
    });
    it('should error with bad email', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/register`,
        method: 'POST',
        validateStatus: () => true,
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(400);
    });
    it('should error with bad password', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/register`,
        method: 'POST',
        data: {
          email: 'test',
        },
        validateStatus: () => true,
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(400);
    });
    it('should error with duplicate user', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/register`,
        method: 'POST',
        data: {
          email: 'test@test.com',
          password: 'abc123',
        },
        validateStatus: () => true,
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(400);
    });
  });
});
