import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTournamentTable1559394836884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: "tournament",
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
          name: "owner",
          type: "varchar",
          length: "45",
        },
        {
          name: "state",
          type: "varchar",
          length: "20",
        },
        {
          name: "admin_id",
          type: "varchar",
          length: "20",
          isUnique: true,
        },
        {
          name: "visitor_id",
          type: "varchar",
          length: "20",
          isUnique: true,
        },
      ],
    })
    await queryRunner.createTable(table)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("tournament")
  }
}
