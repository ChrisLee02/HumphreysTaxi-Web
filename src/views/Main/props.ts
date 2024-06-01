import {BoardListItem} from "@/types/interface";

export interface MainPageVACProps {
    boardList: BoardListItem[];
    onNewRideButtonClickHandler: () => void;
}