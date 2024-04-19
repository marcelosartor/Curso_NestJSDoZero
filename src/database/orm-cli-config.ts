import 'dotenv/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { CreateCoursesTable1710687816275 } from 'src/migrations/1710687816275-CreateCoursesTable'
import { CreateTagsTable1710695564463 } from 'src/migrations/1710695564463-CreateTagsTable'
import { CreateCoursesTagsTable1710698354141 } from 'src/migrations/1710698354141-CreateCoursesTagsTable'
import { AddCoursesIdToCoursesTagsTable1710698976245 } from 'src/migrations/1710698976245-AddCoursesIdToCoursesTagsTable'
import { AddTagsIdToCoursesTagsTable1710699622786 } from 'src/migrations/1710699622786-AddTagsIdToCoursesTagsTable'
import { Course } from 'src/courses/entities/courses.entity'
import { Tag } from 'src/courses/entities/tags.entity'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
}

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1710687816275,
    CreateTagsTable1710695564463,
    CreateCoursesTagsTable1710698354141,
    AddCoursesIdToCoursesTagsTable1710698976245,
    AddTagsIdToCoursesTagsTable1710699622786,
  ],
})
