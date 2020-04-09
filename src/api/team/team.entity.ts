import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm"

import { DateAudit } from "../shared/entity/date-audit.entity"
import { Game } from "../game/game.entity"
import { Tournament } from "../tournament/tournament.entity"

@Entity()
export class Team extends DateAudit {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ length: 45 })
  name: string

  @ManyToOne(
    type => Tournament,
    tournament => tournament.teams,
  )
  @JoinColumn({ name: "tournament_id" })
  tournament: Tournament

  @OneToMany(
    type => Game,
    game => game.host,
  )
  hostGames: Game[]

  @OneToMany(
    type => Game,
    game => game.guest,
  )
  guestGames: Game[]

  get games(): Game[] {
    return [...this.hostGames, ...this.guestGames]
  }
}
