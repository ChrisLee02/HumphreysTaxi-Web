import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import {BOARD_PATH, BOARD_WRITE_PATH, SIGN_IN_PATH} from "@/constants";
import BoardListItem from '@/types/interface/board-list-item.interface'
import {getBoardListRequest} from "@/apis";
import {ResponseDto} from "@/apis/response";
import GetBoardListResponseDto from "@/apis/response/board/get-board-list-response.dto";
import MainPageVAC from "@/views/Main/pageComponent";
import {MainPageVACProps} from "@/views/Main/props";

const Main = () => {
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();
    const [boardList, setBoardList] = useState<BoardListItem[]>([]);


    const getBoardListResponse = (responseBody: GetBoardListResponseDto | ResponseDto | null) => {

        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code !== "SU") return;

        const {boardList} = responseBody as GetBoardListResponseDto;

        setBoardList(boardList);
    }

    const onNewRideButtonClickHandler = () => {
        navigate(BOARD_PATH() + "/" + BOARD_WRITE_PATH());
    }


    useEffect(() => {
        if (!cookies.accessToken) {
            navigate(SIGN_IN_PATH());
            return;
        }
        getBoardListRequest().then(getBoardListResponse);
    }, [cookies.accessToken])

    const props: MainPageVACProps = {
        boardList,
        onNewRideButtonClickHandler
    }

    return <MainPageVAC {...props} />
};

export default Main;