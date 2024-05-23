export default interface BoardListItem {
    boardId: number;
    title: string;
    startingPoint: string;
    destinationPoint: string;
    departTime: string;
    joiningUserCnt: number;
    username: string;
    unit: string;
    profileImage: string;
    writeDatetime: string;
    closed: boolean;
}