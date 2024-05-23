import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui";
import {UserIcon} from "lucide-react";
import React from "react";
import {JoiningUserListItem} from "@/types/interface";
import {useNavigate} from "react-router";
import {USER_PATH} from "@/constants";

const JoiningUserItem = (props: JoiningUserListItem) => {

    const navigate = useNavigate();

    return (
            <div onClick={()=>navigate(USER_PATH(props.userId))} className="flex flex-col justify-center items-center">
                <Avatar className="w-12 h-12 border">
                    <AvatarImage alt="@username" src={props.profileImage}/>
                    <AvatarFallback> <UserIcon/> </AvatarFallback>
                </Avatar>
                <div>{props.username}</div>
                <div>{props.unit}</div>
            </div>
    );
};

export default JoiningUserItem;

