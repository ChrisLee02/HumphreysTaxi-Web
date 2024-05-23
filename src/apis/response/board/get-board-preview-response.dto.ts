import {Board, BoardListItem} from "@/types/interface";
import ResponseDto from "../response.dto";

export default interface GetBoardPreviewResponseDto extends ResponseDto {
    boardPreview:BoardListItem;
}
