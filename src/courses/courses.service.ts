import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Courses } from './courses.entity';
import { STATUS_CODES } from 'http';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course-dto';

@Injectable()
export class CoursesService {
    private courses: Courses[] = [
        {
            id:1,
            name:'NestJs', 
            description: 'Curso sobre o fundamento do frameword do nestjs',
            tag:['node','typescript','javascript']
        }
    ]

    findAll(){
        return this.courses
    }

    findOne(id:number){
        const result = this.courses.find(course=>course.id === id)
        if(result)
            return result
        else
            throw new HttpException(`Course ID: ${id} not found`,HttpStatus.NOT_FOUND)
    }

    create(createCourseDto:CreateCourseDto){
        const id = this.courses.length + 1
        this.courses.push({id,...createCourseDto})
        return this.findOne(id)
    }

    update(id:number,updateCourseDto:UpdateCourseDto){
        const existsCourse = this.findOne(id)
        if(existsCourse){
            const index = this.courses.findIndex(course=>course.id===id)
            this.courses[index] = {
                ...this.courses[index],
                ...updateCourseDto
            }
        }
    }

    remove(id:number){
        const index = this.courses.findIndex(course=>course.id === id)
        if(index>=0){
            this.courses.splice(index,1)
        }
    }
}

