import * as shortid from "shortid"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, BeforeInsert } from "typeorm"
import { DateAudit } from "../shared/entity/date-audit.entity"
import { Game } from "../game/game.entity"
import { Team } from "../team/team.entity"
import { TournamentState } from "./tournament-state"

@Entity()
export class Tournament extends DateAudit {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ length: 45 })
  name: string

  @Column({ length: 45 })
  owner: string

  @Column({
    type: "varchar",
    length: 20,
  })
  state: TournamentState

  @Column({ name: "admin_id", length: 20, unique: true })
  adminId: string

  @Column({ name: "visitor_id", length: 20, unique: true })
  visitorId: string

  @OneToMany(
    type => Game,
    game => game.tournament,
  )
  games: Game[]

  @OneToMany(
    type => Team,
    team => team.tournament,
  )
  teams: Team[]

  @BeforeInsert()
  async setShortIds(): Promise<void> {
    this.visitorId = shortid.generate()
    this.adminId = shortid.generate()
  }
}
