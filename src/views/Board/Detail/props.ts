import UserEntity from "@/types/interface/user.interface";
import {Board, CommentListItem, JoiningUserListItem} from "@/types/interface";
import React from "react";

export interface BoardDetailVACProps {
    loginUser: UserEntity | null;
    board: Board | null;
    commentList: CommentListItem[] | null;
    joinList: JoiningUserListItem[] | null;
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    onCommentSubmitButtonClick: () => void;
    onDeleteButtonClick: () => void;
    onCancelJoinButtonClick: () => void;
    onJoinButtonClick: () => void;
    onLockButtonClick: () => void;
    onUnLockButtonClick: () => void;
    onWriterProfileClick: () => void;
}