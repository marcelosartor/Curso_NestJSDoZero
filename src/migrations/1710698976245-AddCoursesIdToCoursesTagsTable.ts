import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCoursesIdToCoursesTagsTable1710698976245 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'courses_tags',
            new TableColumn({
                name: 'courses_id',
                type: 'uuid',
                isNullable: true,
            }),
        )

        await queryRunner.createForeignKey('courses_tags', new TableForeignKey({
            name: 'courses_tags_courses',
            columnNames: ['courses_id'],
            referencedTableName: 'courses',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tags', 'courses_tags_courses')

        await queryRunner.dropColumn('courses_tags', 'courses_id')
    }

}
