import React from 'react';
import {Avatar, AvatarFallback, AvatarImage, Button, Card, CardContent, Label, Textarea} from "@/components/ui";
import {CalendarIcon, ClockIcon, Lock, MapPinIcon, UserIcon} from "lucide-react";
import dayjs from "dayjs";
import JoiningUserItem from "@/components/JoiningUserItem/joiningUserItem";
import CommentItem from "@/components/CommentListItem";
import {BoardDetailVACProps} from "@/views/Board/Detail/props";

const BoardDetailPageVAC = ({
                                board,
                                commentList,
                                comment,
                                setComment,
                                joinList,
                                loginUser,
                                onCommentSubmitButtonClick,
                                onWriterProfileClick,
                                onDeleteButtonClick,
                                onLockButtonClick,
                                onJoinButtonClick,
                                onCancelJoinButtonClick,
                                onUnLockButtonClick
                            }: BoardDetailVACProps) => {
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

                    <div onClick={onWriterProfileClick} className="flex items-center gap-4">
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
};

export default BoardDetailPageVAC;