import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {Board, CommentListItem, JoiningUserListItem} from "@/types/interface";
import {
    deleteBoardRequest,
    getBoardRequest,
    getCommentListRequest,
    getJoinListRequest,
    postCommentRequest,
    putJoinRequest,
    putLockRequest
} from "@/apis";
import {
    DeleteBoardResponseDto,
    GetBoardResponseDto,
    GetCommentListResponseDto,
    GetJoinListResponseDto,
    PostCommentResponseDto,
    PutLockResponseDto
} from "@/apis/response/board";
import {ResponseDto} from "@/apis/response";
import {MAIN_PATH, USER_PATH} from "@/constants";
import {useCookies} from "react-cookie";
import {useLoginUserStore} from "@/stores";
import PutJoinResponseDto from "@/apis/response/board/put-join-response.dto";
import BoardDetailPageVAC from "@/views/Board/Detail/pageComponent";
import {BoardDetailVACProps} from "@/views/Board/Detail/props";


function BoardDetail() {
    const navigate = useNavigate();

    const {boardNumber} = useParams();
    const {loginUser} = useLoginUserStore();
    const [board, setBoard] = useState<Board | null>(null);
    const [cookies, setCookies] = useCookies();
    const [commentList, setCommentList] = useState<CommentListItem[] | null>(null);
    const [joinList, setJoinList] = useState<JoiningUserListItem[] | null>(null);
    const [comment, setComment] = useState<string>("");

    const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {

        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "NB") alert("Not Exist Board");
        if (responseBody.code !== "SU") return;

        const {code, message, ...board} = responseBody as GetBoardResponseDto;

        setBoard(board);

    }

    const getJoinListResponse = (responseBody: GetJoinListResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "NB") alert("Not Exist Board");
        if (responseBody.code !== "SU") return;

        const {code, message, joiningUserListItemList} = responseBody as GetJoinListResponseDto;

        setJoinList(joiningUserListItemList);
    }

    const getCommentListResponse = (responseBody: GetCommentListResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "NB") alert("Not Exist Board");
        if (responseBody.code === "NU") alert("Not Exist User");
        if (responseBody.code === "NP") {
            setCommentList(null);
        }

        if (responseBody.code !== "SU") return;

        const {code, message, commentList} = responseBody as GetCommentListResponseDto;

        setCommentList(commentList);

    }

    const postCommentResponse = (responseBody: PostCommentResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "NB") alert("Not Exist Board");
        if (responseBody.code === "NU") alert("Not Exist User");
        if (responseBody.code === "NP") alert("No Permission");
        if (responseBody.code !== "SU") return;

        if (!boardNumber || !cookies.accessToken) return;
        getCommentListRequest(boardNumber, cookies.accessToken).then(getCommentListResponse);
    }

    const deleteBoardResponse = (responseBody: DeleteBoardResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "NB") alert("Not Exist Board");
        if (responseBody.code === "NU") alert("Not Exist User");
        if (responseBody.code === "NP") alert("No Permission");
        if (responseBody.code !== "SU") return;

        navigate(MAIN_PATH());
    }

    const putJoinResponse = (responseBody: PutJoinResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "NB") alert("Not Exist Board");
        if (responseBody.code === "NU") alert("Not Exist User");
        if (responseBody.code === "NP") alert("No Permission");
        if (responseBody.code === "FJ") alert("As you are on penalty or joining another board, you're forbidden to join.");
        if (responseBody.code === "AFB") alert("Board is already full.");
        if (responseBody.code !== "SU") return;

        if (!boardNumber || !cookies.accessToken) return;
        getJoinListRequest(boardNumber).then(getJoinListResponse);
        getCommentListRequest(boardNumber, cookies.accessToken).then(getCommentListResponse);
    }

    const putLockResponse = (responseBody: PutLockResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "NB") alert("Not Exist Board");
        if (responseBody.code === "NU") alert("Not Exist User");
        if (responseBody.code === "NP") alert("No Permission");
        if (responseBody.code !== "SU") return;

        if (!boardNumber || !cookies.accessToken) return;
        navigate(MAIN_PATH());
    }


    const putJoinHandler = () => {
        if (!boardNumber || !cookies.accessToken) return;
        putJoinRequest(boardNumber, cookies.accessToken).then(putJoinResponse);
    };

    const putLockHandler = () => {
        if (!boardNumber || !cookies.accessToken) return;
        putLockRequest(boardNumber, cookies.accessToken).then(putLockResponse);
    };


    const onCommentSubmitButtonClick = () => {
        if (!boardNumber || !cookies.accessToken) return;
        postCommentRequest(boardNumber, {content: comment}, cookies.accessToken).then(postCommentResponse);
        setComment("");
    };
    const onDeleteButtonClick = () => {
        if (!boardNumber || !cookies.accessToken) return;
        const result = window.confirm("If you delete, you get penalty to join other ride for 5 min.");
        if (result) deleteBoardRequest(boardNumber, cookies.accessToken).then(deleteBoardResponse);
    };

    const onCancelJoinButtonClick = () => {
        const result = window.confirm("If you cancel, you get penalty to join other ride for 5 min.");
        if (result) putJoinHandler();
    }

    const onJoinButtonClick = () => {
        const result = window.confirm("Once you join this ride, you can't join other ones until you cancel this ride.");
        if (result) putJoinHandler();
    }

    const onLockButtonClick = () => {
        const result = window.confirm("Once you lock this ride, no one can join this ride from now on.");
        if (result) putLockHandler();
    }
    const onUnLockButtonClick = () => {
        const result = window.confirm("Once you unlock this ride, anyone can join this ride from now on.");
        if (result) putLockHandler();
    }
    const onWriterProfileClick = () => {
        if (!board) return;
        navigate(USER_PATH(board.writerId))
    }

    useEffect(() => {
        if (!boardNumber) return;
        getBoardRequest(boardNumber).then(getBoardResponse);
        getJoinListRequest(boardNumber).then(getJoinListResponse);
        if (!cookies.accessToken) return;
        getCommentListRequest(boardNumber, cookies.accessToken).then(getCommentListResponse);

    }, [boardNumber])

    const props: BoardDetailVACProps = {
        loginUser,
        board,
        commentList,
        joinList,
        comment,
        setComment,
        onCommentSubmitButtonClick,
        onDeleteButtonClick,
        onCancelJoinButtonClick,
        onJoinButtonClick,
        onLockButtonClick,
        onUnLockButtonClick,
        onWriterProfileClick,
    }


    return <BoardDetailPageVAC {...props} />;
}

export default BoardDetail;