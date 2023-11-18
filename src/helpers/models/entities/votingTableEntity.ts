import {
    Column,
    Entity,
    Index,
    ManyToMany,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    JoinTable,
} from 'typeorm'

import { Fiscal } from './fiscalEntity'

@Entity({ name: 'VotingTable' })
export class VotingTable {
    // ID compuesto nuestro
    @PrimaryColumn()
    public id: string

    // identificador_unico_mesa (GOB)
    @Index()
    @Column({ nullable: false })
    public uuid: string

    // id_colegio
    @Index()
    @Column({ nullable: false })
    public establishmentId: string

    // seccion_id
    @Index()
    @Column({ nullable: false })
    public sectionId: string

    // seccionprovincial_id
    @Index()
    @Column({ nullable: false })
    public subsectionId: string

    // circuito_id
    @Index()
    @Column({ nullable: false })
    public circuitId: string

    // distrido_id
    @Index()
    @Column({ nullable: false })
    public districtId: string

    @ManyToMany(() => Fiscal, (fiscal) => fiscal.votingTables)
    @JoinTable()
    fiscals: Fiscal[]
}
