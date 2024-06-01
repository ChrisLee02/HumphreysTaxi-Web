import React, {useEffect, useMemo, useState} from 'react';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import {PostBoardRequestDto} from "@/apis/request/board";
import {postBoardRequest} from "@/apis";
import {ResponseDto} from "@/apis/response";
import {PostBoardResponseDto} from "@/apis/response/board";
import {BOARD_DETAIL_PATH, BOARD_PATH} from "@/constants";
import {useLoginUserStore} from "@/stores";
import dayjs from "dayjs";
import BoardWritePageVAC from "@/views/Board/Write/pageComponent";
import {BoardWriteVACProps} from "@/views/Board/Write/props";


function BoardWrite() {
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [dateTime, setDateTime] = useState<string>('');

    const {loginUser} = useLoginUserStore();


    // Change handlers for each input field
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFrom(event.target.value);
    };

    const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTo(event.target.value);
    };

    const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateTime(event.target.value);
    };


    const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {

        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "NU") alert("Not Exist User");
        if (responseBody.code === "VF") alert("Validation failed, check out the blank section.");
        if (responseBody.code === "FJ") alert("As you are on penalty or joining another board, you're forbidden to join.");
        if (responseBody.code !== "SU") return;

        const {id} = responseBody as PostBoardResponseDto;
        navigate(BOARD_PATH() + "/" + BOARD_DETAIL_PATH(id));
    }


    const onPostBoardButtonClickHandler = () => {
        const requestBody: PostBoardRequestDto = {
            title,
            content,
            startingPoint: from,
            destinationPoint: to,
            departTime: dateTime,
        }

        postBoardRequest(requestBody, cookies.accessToken).then(postBoardResponse);
    }

    // useMemo 로 최적화
    const getNow = useMemo(() => {
        return dayjs().format("YYYY-MM-DDTHH:mm");
    }, []);

    const getNextWeek = useMemo(() => {
        return dayjs().add(7, "day").format("YYYY-MM-DDTHH:mm");
    }, []);

    useEffect(() => {
        //console.log(loginUser);
        if (!loginUser) return;
        if (loginUser.defaultDepartingPoint) setFrom(loginUser.defaultDepartingPoint);
        if (loginUser.address) setTo(loginUser.address);
    }, [])

    const props: BoardWriteVACProps = {
        title,
        content,
        from,
        to,
        dateTime,
        handleTitleChange,
        handleContentChange,
        handleToChange,
        handleFromChange,
        handleDateTimeChange,
        onPostBoardButtonClickHandler,
        getNow, getNextWeek
    }

    return <BoardWritePageVAC {...props} />

}

export default BoardWrite;