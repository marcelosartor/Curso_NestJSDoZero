import { IsString } from "class-validator"
import { Tag } from "../entities/tags.entity"

export class CreateCourseDto{
    @IsString()
    readonly name:string
    @IsString()
    readonly description:string
    @IsString({ each: true })
    readonly tags:string[]
}