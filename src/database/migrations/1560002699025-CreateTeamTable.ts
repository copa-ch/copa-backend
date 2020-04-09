import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm"

export class CreateTeamTable1560002699025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: "team",
      columns: [
        {
          name: "id",
          type: "varchar",
          length: "36",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid",
        },
        {
          name: "created_at",
          length: "6",
          type: "datetime",
          default: "CURRENT_TIMESTAMP(6)",
        },
        {
          name: "updated_at",
          length: "6",
          type: "datetime",
          default: "CURRENT_TIMESTAMP(6)",
        },
        {
          name: "name",
          type: "varchar",
        },
        {
          name: "tournament_id",
          type: "varchar",
          length: "36",
        },
      ],
    })
    await queryRunner.createTable(table)
    await queryRunner.createForeignKey(
      "team",
      new TableForeignKey({
        columnNames: ["tournament_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "tournament",
        onDelete: "CASCADE",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("team")
  }
}
