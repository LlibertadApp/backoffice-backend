import {
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { GenericTable } from './genericTable'
import { VotingTable } from './votingTableEntity'

@Entity({ name: 'Fiscals' })
export class Fiscal extends GenericTable {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Index()
    @Column({ nullable: false, name: 'created_by' })
    public createdBy: string

    @Column({ nullable: false, length: 50, name: 'full_name' })
    private fullName: string

    @Column({ length: 255 })
    private email: string

    @Column({ length: 80, name: 'phone_no' })
    private phoneNo: string

    @ManyToMany(() => VotingTable, (votingTable) => votingTable.fiscals)
    @JoinTable()
    votingTables: VotingTable[]
}
