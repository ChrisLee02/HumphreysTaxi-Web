import React, {useEffect, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage, Badge, Card, CardContent, Separator} from '@/components/ui';
import {ArrowRightIcon, ClockIcon, MapPinIcon, Swords, UserIcon, UsersIcon} from "lucide-react";
import dayjs from "dayjs";
import {useNavigate} from "react-router";
import {BOARD_DETAIL_PATH, BOARD_PATH} from "@/constants";

interface Props {
    boardId: number;
    title: string;
    startingPoint: string;
    destinationPoint: string;
    departTime: string;
    joiningUserCnt: number;
    username: string;
    unit: string;
    profileImage: string;
    writeDatetime: string;
    closed: Boolean;
}

export default function BoardListItem(props: Props) {
    const navigate = useNavigate();
    const {
        boardId,
        title,
        startingPoint,
        destinationPoint,
        departTime,
        joiningUserCnt,
        username,
        unit,
        profileImage,
        writeDatetime,
        closed
    } = props;

    const [parsedDepartTime, setParsedDepartTime] = useState<string>("");

    const onCardClickHandler = () => {
        navigate(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardId));
    }

    useEffect(() => {
        setParsedDepartTime(dayjs(departTime).format("MM/DD HH:mm"));
    }, [])

    return (
        <Card onClick={onCardClickHandler} className="w-full h-40 transition-colors duration-300 hover:bg-gray-200">
            <CardContent className="p-6 grid grid-cols-[60px_1fr] gap-4">
                <Avatar className="w-12 h-12 border">
                    <AvatarImage alt="@username" src={profileImage}/>
                    <AvatarFallback> <UserIcon/> </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <Badge className="px-2 py-1 text-sm text-black-500" variant="secondary">
                            {closed ? "closed" : "Available"}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <MapPinIcon className="w-4 h-4"/>
                        <span>{startingPoint}</span>
                        <ArrowRightIcon className="w-4 h-4"/>
                        <span>{destinationPoint}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <ClockIcon className="w-4 h-4"/>
                        <span>{parsedDepartTime}</span>
                        <Separator className="h-4" orientation="vertical"/>
                        <UsersIcon className="w-4 h-4"/>
                        <span>{`${joiningUserCnt}/4`}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <UserIcon className="w-4 h-4"/>
                        <span>{username}</span>
                        <Separator className="h-4" orientation="vertical"/>
                        <Swords className="w-4 h-4"/>
                        <span>{unit}</span>
                    </div>
                </div>
            </CardContent>
        </Card>


    )
}