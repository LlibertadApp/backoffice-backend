import {
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { GenericTable } from './genericTable'
import { VotingTable } from './votingTableEntity'

@Entity({ name: 'Fiscals' })
export class Fiscal extends GenericTable {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Index()
    @Column({ nullable: false, name: 'created_by' })
    public createdBy: string

    @Column({ nullable: false, length: 50, name: 'first_name' })
    private firstName: string

    @Column({ nullable: false, length: 50, name: 'last_name' })
    private lastName: string

    @OneToMany(() => VotingTable, (votingTable) => votingTable.fiscalId)
    mesas: VotingTable[]
}
