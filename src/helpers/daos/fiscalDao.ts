import 'reflect-metadata'
import { Fiscal } from '@/helpers/models/entities/fiscalEntity'
import { VotingTable } from '@/helpers/models/entities/votingTableEntity'
import { Repository } from 'typeorm'
import { ConnectionSourceRW } from '../../../ormconfig-rw'
import { ConnectionSource } from '../../../ormconfig'

export const createFiscal = async (
    fiscalData: Partial<Fiscal>,
    votingTables: string[]
): Promise<Fiscal | null> => {
    try {
        if (!ConnectionSourceRW.isInitialized) {
            await ConnectionSourceRW.initialize()
            console.log('Database connected (RW)')
        }

        const votingTablesRespository: Repository<VotingTable> =
            ConnectionSourceRW.getRepository(VotingTable)
        const fiscalRepository: Repository<Fiscal> =
            ConnectionSourceRW.getRepository(Fiscal)

        const tables = await votingTablesRespository.findByIds(votingTables)

        fiscalData.votingTables = tables

        const fiscal = fiscalRepository.create(fiscalData)

        await fiscalRepository.save(fiscal)

        return fiscal
    } catch (error) {
        console.error('Error in createFiscal:', error)
        return null
    }
}

export const getFiscal = async (id: string): Promise<Fiscal | null> => {
    try {
        if (!ConnectionSource.isInitialized) {
            await ConnectionSource.initialize()
            console.log('Database connected')
        }

        const fiscalRepository: Repository<Fiscal> =
            ConnectionSource.getRepository(Fiscal)
        const fiscal = await fiscalRepository.findOne({
            where: { id: id },
            relations: ['votingTables'],
        })

        return fiscal
    } catch (error) {
        console.error('Error in getFiscal:', error)
        return null
    }
}

export const getFiscalsByOwner = async (
    ownerId: string
): Promise<Fiscal[] | null> => {
    try {
        if (!ConnectionSource.isInitialized) {
            await ConnectionSource.initialize()
            console.log('Database connected')
        }

        const fiscalRepository: Repository<Fiscal> =
            ConnectionSource.getRepository(Fiscal)
        const fiscals = await fiscalRepository.find({
            where: { createdBy: ownerId },
            relations: ['votingTables'],
        })

        return fiscals
    } catch (error) {
        console.error('Error in getFiscalsByOwner:', error)
        return null
    }
}
