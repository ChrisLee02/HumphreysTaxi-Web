import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui";
import {CommentListItem} from "@/types/interface";
import { UserIcon } from 'lucide-react';
import dayjs from "dayjs";
import {useNavigate} from "react-router";
import {USER_PATH} from "@/constants";

const Index = (props: CommentListItem) => {
    const navigate = useNavigate();
    const getElapsedTime = () => {
        const now = dayjs();
        const writeTime = dayjs(props.writeDatetime);

        const gap = now.diff(writeTime, "second");
        if (gap < 60) return `${gap} seconds ago`;
        if (gap < 3600) return `${Math.floor(gap / 60)} min${Math.floor(gap / 60)  === 1 ? '' : 's'} ago`;
        if (gap < 86400) return `${Math.floor(gap / 3600)} hour${Math.floor(gap / 3600)  === 1 ? '' : 's'} ago`;
        return `${Math.floor(gap / 86400)} day${Math.floor(gap / 86400)  === 1 ? '' : 's'} ago`;
    };
    const navigateToProfile=()=>{
        navigate(USER_PATH(props.writerId));
    }
    return (
        <div className="flex items-center gap-4">
            <Avatar onClick={navigateToProfile} className="w-10 h-10 border">
                <AvatarImage alt="@username" src={props.profileImage}/>
                <AvatarFallback><UserIcon></UserIcon></AvatarFallback>
            </Avatar>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="font-medium text-sm">{props.username + " | " + props.unit}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">{getElapsedTime()}</div>
                </div>
                <div className="text-sm w-52 h-14 break-words overflow-scroll">
                    {props.content}
                </div>
            </div>
        </div>
    );
};

export default Index;