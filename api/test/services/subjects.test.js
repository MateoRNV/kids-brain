const app = require('../../src/app');

describe('\'Subjects\' service', () => {
  it('registered the service', () => {
    const service = app.service('subjects');
    expect(service).toBeTruthy();
  });
});
