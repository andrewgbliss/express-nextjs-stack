import Api from 'services/Api';
import { getJwtToken } from 'services/Jwt';

export function createStore() {
  return {
    me: null,
    async fetchMe() {
      const token = getJwtToken();
      if (token) {
        const response = await Api.get('/api/v1/me');
        this.me = response;
      }
    },
  };
}
