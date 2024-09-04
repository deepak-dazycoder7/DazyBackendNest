import { ResponseDto } from '../dtos/response.dto';

const successCode = [200, 201];

export function ResponseService(
    message,
    status,
    data
): ResponseDto {
    return {
        message,
        status,
        data,
        error: !successCode.includes(status)
    };
}