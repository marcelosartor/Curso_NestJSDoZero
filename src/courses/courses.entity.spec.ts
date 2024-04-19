import { Course } from './entities/courses.entity';

describe('Course', () => {
  it('should be defined', () => {
    expect(new Course()).toBeDefined();
  });
});
