import ResponseDto from "../response.dto";

export default interface SignUpResponseDto extends ResponseDto {
    token: string;
    expirationInSec: number;
}
