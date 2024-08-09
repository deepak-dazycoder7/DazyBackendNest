export class ResponseDto<T> {
    message: string;
    status: number;
    error: boolean;
    data: {
        user: T;
        token?: string;
    };
    errorMessage?: string;
}
