import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { GenericTable } from './genericTable'
import { Role } from './roleEntity'

@Entity({ name: 'FiscalsVotingTables' })
export class VotingTable extends GenericTable {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Index()
    @Column({ nullable: false })
    public mesaId: string

    @Column({ nullable: false })
    public fiscalId: string
}
