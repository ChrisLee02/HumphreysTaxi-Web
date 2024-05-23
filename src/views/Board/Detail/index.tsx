import {Avatar, AvatarFallback, AvatarImage, Button, Card, CardContent, Label, Textarea} from '@/components/ui';
import React, {useEffect, useState} from 'react';
import {CalendarIcon, ClockIcon, Lock, MapPinIcon, UserIcon} from "lucide-react";
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
import dayjs from "dayjs";
import CommentItem from '@/components/CommentListItem';
import {useCookies} from "react-cookie";
import JoiningUserItem from "@/components/JoiningUserItem/joiningUserItem";
import {useLoginUserStore} from "@/stores";
import PutJoinResponseDto from "@/apis/response/board/put-join-response.dto";


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


    useEffect(() => {
        if (!boardNumber) return;
        getBoardRequest(boardNumber).then(getBoardResponse);
        getJoinListRequest(boardNumber).then(getJoinListResponse);
        if (!cookies.accessToken) return;
        getCommentListRequest(boardNumber, cookies.accessToken).then(getCommentListResponse);

    }, [boardNumber])

    if (!board) return <></>; // 로딩 표시
    return (
        <div className="w-96 px-6 ">
            <main className=" pt-4 ">
                <div className="space-y-8">
                    {board.closed &&
                        <h2 className="text-3xl font-bold tracking-tight text-red-500 dark:text-gray-100">
                            This ride is already closed.
                        </h2>
                    }
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{board.title}</h1>
                        <div className="flex gap-3">
                            {board.writerId === loginUser?.id ?
                                <Button onClick={onDeleteButtonClick}>Delete</Button>
                                :
                                joinList?.find((item) => item.userId === loginUser?.id) ?
                                    <Button onClick={onCancelJoinButtonClick}>Quit</Button> :
                                    <Button disabled={board.closed} onClick={onJoinButtonClick}>Join</Button>
                            }
                            {
                                board.writerId === loginUser?.id &&
                                board.closed ? <Button onClick={onUnLockButtonClick}>UnLock</Button> :
                                    <Button onClick={onLockButtonClick}>Lock</Button>
                            }
                        </div>


                    </div>

                    <div onClick={() => {
                        navigate(USER_PATH(board.writerId))
                    }} className="flex items-center gap-4">
                        <Avatar className="w-10 h-10 border">
                            <AvatarImage alt="@username" src={board.profileImage}/>
                            <AvatarFallback> <UserIcon/> </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">{board.username}</div>
                            <div className="text-gray-500 dark:text-gray-400">{board.unit}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                                <div>
                                    <div className="font-medium">Starting Point</div>
                                    <div className="text-gray-500 dark:text-gray-400">{board.startingPoint}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                                <div>
                                    <div className="font-medium">Destination</div>
                                    <div className="text-gray-500 dark:text-gray-400">{board.destinationPoint}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                                <div>
                                    <div className="font-medium">Depart Time</div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {dayjs(board.departTime).format("dddd, YYYY/MM/DD HH:mm")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                            <div>
                                <div className="font-medium">Posted</div>
                                <div className="text-gray-500 dark:text-gray-400">
                                    {dayjs(board.writeDateTime).format("YYYY/MM/DD HH:mm")}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="prose prose-lg dark:prose-invert">
                        {board.content}
                    </div>

                    <Card className="grid gap-4">
                        <div className="pt-3 pl-3">
                            <div>Joining user list</div>
                        </div>
                        <CardContent className="flex justify-around overflow-scroll">
                            {joinList?.map((item, index) => <JoiningUserItem {...item} key={index}/>)}
                        </CardContent>
                    </Card>

                </div>
            </main>
            <div className="py-12 sm:py-16 lg:py-20">
                {commentList ?
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Comments</h2>
                            <div className="space-y-6">
                                {commentList.map((item, index) => <CommentItem {...item} key={index}/>)}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Leave a
                                Comment</h2>

                            <div className="space-y-2">
                                <Label htmlFor="comment">Your Comment</Label>
                                <Textarea value={comment} onChange={(event) => {
                                    setComment(event.target.value)
                                }}
                                          className="min-h-[100px]" id="comment"
                                          placeholder="Write your comment here..."/>
                            </div>
                            <Button onClick={onCommentSubmitButtonClick}>Submit</Button>

                        </div>
                    </div>
                    :
                    <div className="text-center space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-center"><Lock size={48}/></div>
                            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                Comments available only for those who participate in this ride.
                            </span>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default BoardDetail;