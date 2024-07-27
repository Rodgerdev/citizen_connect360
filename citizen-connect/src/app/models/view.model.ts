export interface View {
    id: string;
    title: string;
    description: string;
    userId: string;
    isDeleted: number;
    createdAt: Date;
    updatedAt: Date;
    userName?: string;  // Added this property to store the user's name
}
