import { CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class DateAudit {
  @CreateDateColumn({ name: "created_at" })
  createdAt: string

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: string
}
