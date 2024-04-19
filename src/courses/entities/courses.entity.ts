import { Options } from "@nestjs/common"
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm"
import { Tag } from "./tags.entity"
import { randomUUID } from "node:crypto"

@Entity('courses')
export class Course {
    
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    description:string
    
    @JoinTable({
        name: 'courses_tags',
        joinColumn: {name: 'courses_id'}, 
        inverseJoinColumn: {name: 'tags_id'}
    })
    @ManyToMany(()=>Tag, tag=> tag.courses, { cascade: true})
    tags: Tag[]

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
