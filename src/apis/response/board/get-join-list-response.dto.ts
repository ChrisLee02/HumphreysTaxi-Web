
import ResponseDto from "../response.dto";
import {JoiningUserListItem} from "@/types/interface";

export default interface GetJoinListResponseDto extends ResponseDto {
    joiningUserListItemList: JoiningUserListItem[];
}
