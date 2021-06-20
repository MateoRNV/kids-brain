const app = require('../../src/app');

describe('\'userProfiles\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-profiles');
    expect(service).toBeTruthy();
  });
});
