const app = require('../../src/app');

describe('\'StudentQuestionSummary\' service', () => {
  it('registered the service', () => {
    const service = app.service('student-question-summary');
    expect(service).toBeTruthy();
  });
});
