import { expect } from 'chai';
import { server, axios } from '../../test';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

describe('express', () => {
  beforeEach(async () => {
    await server.start();
  });
  afterEach(async () => {
    await server.stop();
  });
  it('should return a 404', async () => {
    const options: AxiosRequestConfig = {
      url: `/test`,
      method: 'GET',
      validateStatus: () => true,
    };
    const res: AxiosResponse = await axios(options);
    expect(res.status).to.equal(404);
  });
});
