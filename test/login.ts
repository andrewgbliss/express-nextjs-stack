import axios from './axios';

const login = async (email = 'developer@test.com', password = 'abc123') => {
  const options: any = {
    url: `/v1/login`,
    method: 'POST',
    data: {
      email,
      password,
    },
    validateStatus: false,
  };
  return axios(options);
};

export default login;
