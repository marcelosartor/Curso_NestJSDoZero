import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { STATUS_CODES } from 'http';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course-dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';

@Injectable()
export class CoursesService {
    constructor(){}
    
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
    
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
    
   
    async findAll(){
        return await this.courseRepository.find({
            relations: ['tags']
        })
    }

    async findOne(id:string){
        const course = await this.courseRepository.findOne({where:{ id },relations: ['tags']})
        if(course)
            return course
        else
            throw new NotFoundException(`Course ID: ${id} not found`)
    }

    async create(createCourseDto:CreateCourseDto){
        const tags = await Promise.all( 
            createCourseDto.tags.map<any>( name => {
                return this.preLoadTagByName(name)
            })
        )
        const course = this.courseRepository.create({...createCourseDto,tags })
        return this.courseRepository.save(course)
    }

    
    async update(id:string,updateCourseDto:UpdateCourseDto){
        
        const tags = updateCourseDto.tags && 
            (await Promise.all( 
            updateCourseDto.tags.map<any>( name => {
                return this.preLoadTagByName(name)
            }))
        )
        
        const course = await this.courseRepository.preload({
            ...updateCourseDto,
            id,
            tags
        })
        console.log(course)
        if(!course){
            throw new NotFoundException(`Course ID: ${id} not found`)
        }
        return this.courseRepository.save(course)
    }
    

    async remove(id:string){
        const course = await this.courseRepository.findOne({where:{ id }})
        if(!course){
            throw new NotFoundException(`Course ID: ${id} not found`)
        }
        return this.courseRepository.remove(course)
    }

    private async preLoadTagByName(name:string):Promise<Tag> {
        const tags = await this.tagRepository.findOne({where :{name}})
        if(tags){
            return tags
        }else{
            return this.tagRepository.create({name})
        }
    }
}

