export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isDeleted: number;
    isEmailSent: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Payload {
    Sub: string;
    Name: string;
    role: string;
}
