import React from "react";

export interface BoardWriteVACProps {
    title: string;
    content: string;
    from: string;
    to: string;
    dateTime: string;
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleFromChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleToChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPostBoardButtonClickHandler: () => void;
    getNow: string;
    getNextWeek: string;
}