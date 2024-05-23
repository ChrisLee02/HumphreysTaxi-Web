export default interface UserEntity {
    id: string;
    unit: string;
    username: string;
    profileImage: string;
    address: string;
    defaultDepartingPoint: string;
    penaltyUntil: string;
    joiningBoardId: number | null;
}
