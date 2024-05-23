export default interface SignUpRequestDto {
    id: string;
    password: string;
    username: string;
    unit: string;
    address: string | null;
    defaultDepartingPoint: string | null;
}
