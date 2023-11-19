export interface LoginRequestBody {
    username: string
    password: string
}

export interface LoginResponseBody {
    status: bool
    token: string
}

export interface FiscalCreateRequestBody {
    fullName: string
    email: string
    phoneNo: string
    votingTables: string[]
}
