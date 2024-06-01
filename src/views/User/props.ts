import UserEntity from "@/types/interface/user.interface";
import {BoardListItem} from "@/types/interface";

export interface UserPageVACProps {
    userInfo: UserEntity | null;
    board: BoardListItem | null;
}