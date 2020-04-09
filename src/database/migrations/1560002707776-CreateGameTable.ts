import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm"

export class CreateGameTable1560002707776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: "game",
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
          name: "tournament_id",
          type: "varchar",
          length: "36",
        },
        {
          name: "host_id",
          type: "varchar",
          length: "36",
        },
        {
          name: "guest_id",
          type: "varchar",
          length: "36",
        },
        {
          name: "round",
          length: "6",
          type: "int",
        },
        {
          name: "host_score",
          length: "6",
          type: "int",
          isNullable: true,
        },
        {
          name: "guest_score",
          length: "6",
          type: "int",
          isNullable: true,
        },
      ],
    })
    await queryRunner.createTable(table)
    await queryRunner.createForeignKey(
      "game",
      new TableForeignKey({
        columnNames: ["tournament_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "tournament",
        onDelete: "CASCADE",
      }),
    )
    await queryRunner.createForeignKey(
      "game",
      new TableForeignKey({
        columnNames: ["host_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "team",
        onDelete: "CASCADE",
      }),
    )
    await queryRunner.createForeignKey(
      "game",
      new TableForeignKey({
        columnNames: ["guest_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "team",
        onDelete: "CASCADE",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("game")
  }
}
