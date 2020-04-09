import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"

import { DateAudit } from "../shared/entity/date-audit.entity"
import { Team } from "../team/team.entity"
import { Tournament } from "../tournament/tournament.entity"

@Entity()
export class Game extends DateAudit {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  round: number

  @ManyToOne(
    type => Tournament,
    tournament => tournament.games,
  )
  @JoinColumn({ name: "tournament_id" })
  tournament: Tournament

  @ManyToOne(
    type => Team,
    team => team.hostGames,
  )
  @JoinColumn({ name: "host_id" })
  host: Team

  @ManyToOne(
    type => Team,
    team => team.guestGames,
  )
  @JoinColumn({ name: "guest_id" })
  guest: Team

  @Column({ name: "host_score", nullable: true })
  hostScore: number

  @Column({ name: "guest_score", nullable: true })
  guestScore: number

  wasPlayed(): boolean {
    return this.hostScore != null && this.guestScore != null
  }

  didHostWin(): boolean {
    if (this.wasPlayed()) {
      return this.hostScore > this.guestScore
    }
    return false
  }

  didGuestWin(): boolean {
    if (this.wasPlayed()) {
      return this.hostScore < this.guestScore
    }
    return false
  }

  isADraw(): boolean {
    if (this.wasPlayed()) {
      return this.hostScore === this.guestScore
    }
    return false
  }
}
