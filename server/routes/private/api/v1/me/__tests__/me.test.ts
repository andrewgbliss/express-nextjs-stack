import { expect } from 'chai';
import { axios, server, login } from '../../../../../../../test';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

describe('routes', () => {
  beforeEach(async () => {
    await server.start();
  });
  afterEach(async () => {
    await server.stop();
  });
  describe('/v1/me', () => {
    it('should get me with query param', async () => {
      const user = await login();
      expect(user.status).to.equal(200);
      expect(user.data).to.have.property('token');
      const token = user.data.token;
      const options: AxiosRequestConfig = {
        url: `/v1/me?token=${token}`,
        method: 'GET',
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(200);
      expect(res.data).to.have.property('email');
      expect(res.data.email).to.equal('developer@test.com');
    });
    it('should get me with header', async () => {
      const user = await login();
      expect(user.status).to.equal(200);
      expect(user.data).to.have.property('token');
      const token = user.data.token;
      const options: AxiosRequestConfig = {
        url: `/v1/me`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(200);
      expect(res.data).to.have.property('email');
      expect(res.data.email).to.equal('developer@test.com');
    });
    it('should get me with cookie', async () => {
      const user = await login();
      expect(user.status).to.equal(200);
      expect(user.data).to.have.property('token');
      const token = user.data.token;
      const options: AxiosRequestConfig = {
        url: `/v1/me`,
        method: 'GET',
        headers: {
          Cookie: `token=${token};`,
        },
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(200);
      expect(res.data).to.have.property('email');
      expect(res.data.email).to.equal('developer@test.com');
    });
    it('should get me with no token', async () => {
      const options: AxiosRequestConfig = {
        url: `/v1/me`,
        method: 'GET',
        validateStatus: () => true,
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(401);
    });
    it('should update account', async () => {
      const user = await login();
      expect(user.status).to.equal(200);
      expect(user.data).to.have.property('token');
      const token = user.data.token;
      const options: AxiosRequestConfig = {
        url: `/v1/me/account?token=${token}`,
        method: 'PUT',
        data: {
          name: 'Developer Account 2',
        },
      };
      const res: AxiosResponse = await axios(options);
      expect(res.status).to.equal(200);
    });
    it('should update user', async () => {
      const user = await login();
      expect(user.status).to.equal(200);
      expect(user.data).to.have.property('token');
      const token = user.data.token;
      const options: AxiosRequestConfig = {
        url: `/v1/me?token=${token}`,
        method: 'PUT',
        data: {
          password: 'abc124',
        },
      };
      const res = await axios(options);
      expect(res.status).to.equal(200);
    });
  });
});
