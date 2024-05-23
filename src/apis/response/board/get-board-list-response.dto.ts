import {BoardListItem} from "@/types/interface";
import ResponseDto from "../response.dto";

export default interface GetBoardListResponseDto extends ResponseDto {
    boardList: BoardListItem[];
}
