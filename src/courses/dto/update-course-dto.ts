import { PartialType } from '@nestjs/mapped-types'
import { CreateCourseDto } from './create-course-dto';
export class UpdateCourseDto extends PartialType(CreateCourseDto){}

/*
// @nestjs/mapped-types
// para não repetir os dados abaixo da classe CreateCourseDto
export class UpdateCourseDto{
    readonly name?:string
    readonly description?:string
    readonly    tags?:string[]
}
*/ 