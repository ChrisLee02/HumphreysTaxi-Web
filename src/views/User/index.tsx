import {useEffect, useState} from "react";
import UserEntity from "@/types/interface/user.interface";
import {getBoardPreviewRequest, getUserRequest} from "@/apis";
import {useParams} from "react-router";
import {ResponseDto} from "@/apis/response";
import {GetUserResponseDto} from "@/apis/response/user";
import {GetBoardPreviewResponseDto} from "@/apis/response/board";
import BoardListItem from "../../types/interface/board-list-item.interface";
import UserPageVAC from "@/views/User/pageComponent";
import {UserPageVACProps} from "@/views/User/props";

export default function Component() {

    const [userInfo, setUserInfo] = useState<UserEntity | null>(null);
    const [board, setBoard] = useState<BoardListItem | null>(null);

    const {userEmail} = useParams();


    const getBoardPreviewResponse = (responseBody: ResponseDto | GetBoardPreviewResponseDto | null) => {
        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "NB") alert("Not Exist Board");
        if (responseBody.code !== "SU") return;

        const {code, message, boardPreview} = responseBody as GetBoardPreviewResponseDto;
        setBoard(boardPreview);

    }

    const getUserResponse = (responseBody: ResponseDto | GetUserResponseDto | null) => {
        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "NU") alert("Not Exist User");
        if (responseBody.code !== "SU") return;

        const {code, message, ...userInfo} = responseBody as GetUserResponseDto;
        setUserInfo(userInfo);
        if (userInfo.joiningBoardId) {
            getBoardPreviewRequest(userInfo.joiningBoardId).then(getBoardPreviewResponse);
        }
    }


    useEffect(() => {
        if (!userEmail) return;
        getUserRequest(userEmail).then(getUserResponse);
    }, [userEmail]);

    const props: UserPageVACProps = {
        userInfo, board
    }

    return <UserPageVAC {...props} />

}