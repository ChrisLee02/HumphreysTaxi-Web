import BoardItem from "@/components/BoardListItem";
import {AvatarImage, AvatarFallback, Avatar} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {CalendarDaysIcon, CompassIcon, MapPinIcon} from "lucide-react";
import {useEffect, useState} from "react";
import UserEntity from "@/types/interface/user.interface";
import {getBoardPreviewRequest, getUserRequest} from "@/apis";
import {useParams} from "react-router";
import {ResponseDto} from "@/apis/response";
import {GetUserResponseDto} from "@/apis/response/user";
import {GetBoardPreviewResponseDto} from "@/apis/response/board";
import BoardListItem from "../../types/interface/board-list-item.interface";

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

    if (!userInfo) return <></>;
    return (
        <main className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
            <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
                <div className="flex flex-col items-center gap-6">
                    <Avatar className="h-24 w-24 border-2 border-gray-200 dark:border-gray-700">
                        <AvatarImage alt="User avatar" src={userInfo.profileImage}/>
                        <AvatarFallback>{userInfo.username}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1 text-center">
                        <h2 className="text-xl font-semibold">{userInfo.username}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{userInfo.unit}</p>
                    </div>
                    <div className="grid gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-400"/>
                            <p>{userInfo.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <CompassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400"/>
                            <p>{userInfo.defaultDepartingPoint}</p>
                        </div>
                        {userInfo.penaltyUntil &&
                            <div className="flex items-center gap-2">
                                <CalendarDaysIcon className="h-5 w-5 text-red-500"/>
                                <p className="text-red-500">Penalty until: {userInfo.penaltyUntil}</p>
                            </div>
                        }
                    </div>
                    <Button className="w-full" variant="outline">
                        Edit Profile
                    </Button>
                </div>
                <div className="grid gap-8">
                    <div className="grid gap-4">
                        <h3 className="text-xl font-semibold">Rides Joined</h3>
                        {board &&
                            <div className="grid gap-4">
                                <BoardItem {...board} />
                            </div>
                        }

                    </div>
                </div>
            </div>
        </main>
    )
}