export interface Incident {
    id: string;
    title: string;
    description: string;
    multimedia: string;
    userId: string;
    isDeleted: number;
    createdAt: Date;
    updatedAt: Date;
}
