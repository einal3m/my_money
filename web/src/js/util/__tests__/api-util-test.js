import apiUtil from '../api-util';

describe('apiUtil', () => {
  describe('setUrl/getUrl', () => {
    it('sets the host', () => {
      apiUtil.setUrl('melanie:2341');
      expect(apiUtil.getUrl('path')).toEqual('http://melanie:2341/path');
    });
  });
});
