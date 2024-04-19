import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./courses.entity";
import { randomUUID } from "node:crypto";

@Entity('tags')
export class Tag{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToMany(()=>Course,course=>course.tags)
    courses: Course[]

    @CreateDateColumn({name:'created_at',type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({name:'updated_at',type: 'timestamp'})
    updatedAt: Date

    @BeforeInsert()
    generatedId(){
       if(this.id){
        return
       } 
       this.id = randomUUID()
    }
}

