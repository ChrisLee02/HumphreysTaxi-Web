export default interface Board {
    id: number;
    title: string;
    content: string;
    startingPoint: string;
    destinationPoint: string;
    departTime: string;
    writeDateTime: string;
    closed: boolean;
    writerId: string;
    profileImage: string;
    unit:string;
    username: string;
    joiningUserCnt: number;
}
