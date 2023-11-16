import 'reflect-metadata'
import { User } from '@/helpers/models/entities/userEntity'
import { Repository } from 'typeorm'
import { ConnectionSource } from '../../../ormconfig'

export const login = async (
    email: string,
    password: string
): Promise<User | null> => {
    try {
        if (!ConnectionSource.isInitialized) {
            await ConnectionSource.initialize()
            console.log('Database connected')
        }

        const userRepository: Repository<User> =
            ConnectionSource.getRepository(User)

        const user = await userRepository
            .createQueryBuilder('users')
            .where('users.email = :email', {
                email: email,
            })
            .getOne()

        console.log('USER', user)

        if (!user) {
            return null
        }

        if (!user.verifyPassword(password)) {
            // Invalid password
            return null
        }

        return user
    } catch (error) {
        console.error('Error in login:', error)
        return null
    }
}
