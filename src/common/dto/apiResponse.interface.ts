export interface ApiResponse<T> {
    message: string;
    status: number;
    error: boolean;
    data?: T; // Optional field to hold the actual data
    errorMessage?: string; // Optional field for error details
}
