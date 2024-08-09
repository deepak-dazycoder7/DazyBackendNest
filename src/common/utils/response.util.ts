import { ResponseDto } from '../dtos/response.dto';

export function createResponse<T>(
    message: string,
    status: number,
    error: boolean,
    data: T | null,
    token?: string,
    errorMessage?: string,
): ResponseDto<T | null> {
    return {
        message,
        status,
        error,
        data: {
            user: data ?? null,
            token: token ?? undefined,
        },
        errorMessage: errorMessage ?? undefined,
    };
}
