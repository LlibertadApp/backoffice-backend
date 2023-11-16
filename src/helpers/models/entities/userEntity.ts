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

@Entity({ name: 'users' })
export class User extends GenericTable {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column({ nullable: false, length: 50, name: 'first_name' })
    private firstName: string

    @Column({ nullable: false, length: 50, name: 'last_name' })
    private lastName: string

    @Index()
    @Column({ nullable: false, length: 255 })
    private email: string

    @Column({ nullable: false, length: 255 })
    private password: string

    @Column({
        nullable: false,
        name: 'is_active',
        type: 'boolean',
        default: false,
    })
    private isActive: boolean

    @ManyToOne(() => Role, (role) => role.id)
    @JoinColumn({ name: 'role_id' })
    private roleId: Role

    @Column({ nullable: true, type: 'text', name: 'refresh_token' })
    private refreshToken: string

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.firstName + ' ' + this.lastName
    }

    public getFirstName(): string {
        return this.firstName
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName
    }

    public getLastName(): string {
        return this.lastName
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(email: string): void {
        this.email = email
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(password: string): void {
        this.password = password
    }

    public isIsActive(): boolean {
        return this.isActive
    }

    public setIsActive(isActive: boolean): void {
        this.isActive = isActive
    }

    public getRoleId(): Role {
        return this.roleId
    }

    public setRoleId(roleId: Role): void {
        this.roleId = roleId
    }

    public getRefreshToken(): string {
        return this.refreshToken
    }

    public setRefreshToken(refreshToken: string): void {
        this.refreshToken = refreshToken
    }

    public verifyPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password)
    }
}
