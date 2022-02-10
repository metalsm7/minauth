import { RequestExtMiddleware } from './request-ext.middleware';

describe('RequestExtMiddleware', () => {
  it('should be defined', () => {
    expect(new RequestExtMiddleware()).toBeDefined();
  });
});
