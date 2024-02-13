import { Courses } from './courses.entity';

describe('Course', () => {
  it('should be defined', () => {
    expect(new Courses()).toBeDefined();
  });
});
