import { randomUUID } from 'node:crypto';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course-dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService
  let id: string
  let created_at: Date
  let updated_at: Date
  let expectedOutputTags: any
  let expectedOutputCurses: any
  let mockCourseRepository: any
  let mockTagRepository: any


  beforeEach(async () => {
    /*
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursesService],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    */

    service = new CoursesService()
    id = randomUUID()
    created_at = new Date()
    updated_at = new Date()
    expectedOutputTags = [
      {
        id,
        name: 'nextjs',
        created_at
      }
    ]
    expectedOutputCurses = {
      id,
      name: 'test',
      description: 'test description',
      updated_at,
      created_at,
      tags: expectedOutputTags
    }

    mockCourseRepository = { 
      create: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCurses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCurses)),
      updated: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCurses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCurses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCurses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCurses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCurses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCurses))
    }
    
    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectedOutputTags)),
      findOne: jest.fn(),

    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    //@ts-expect-error defined part of method
    service.courseRepository = mockCourseRepository

    //@ts-expect-error defined part of method
    service.tagRepository = mockTagRepository

    const createCourseDto: CreateCourseDto = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs']
    }

    const newCourse = await service.create(createCourseDto)

    expect(mockCourseRepository.save).toHaveBeenCalled()
    expect(expectedOutputCurses).toStrictEqual(newCourse)
  })

  it('should list all courses', async () => {
    //@ts-expect-error defined part of method
    service.courseRepository = mockCourseRepository

    const courses = await service.findAll()

    expect(mockCourseRepository.find).toHaveBeenCalled()
    expect(expectedOutputCurses).toStrictEqual(courses)
  })

  it('should gets a course by id', async () => {
    //@ts-expect-error defined part of method
    service.courseRepository = mockCourseRepository

    const course = await service.findOne(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(expectedOutputCurses).toStrictEqual(course)
  })

  it('should update a course', async () => {
    //@ts-expect-error defined part of method
    service.courseRepository = mockCourseRepository

    //@ts-expect-error defined part of method
    service.tagRepository = mockTagRepository

    const updateCourseDto: UpdateCourseDto = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs']
    }

    const course = await service.update(id, updateCourseDto)

    expect(mockCourseRepository.save).toHaveBeenCalled()
    expect(mockCourseRepository.preload).toHaveBeenCalled()
    expect(expectedOutputCurses).toStrictEqual(course)
  })

  it('should remove a course by id', async () => {
    //@ts-expect-error defined part of method
    service.courseRepository = mockCourseRepository

    const course = await service.remove(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(mockCourseRepository.remove).toHaveBeenCalled()
    expect(expectedOutputCurses).toStrictEqual(course)
  })


});
