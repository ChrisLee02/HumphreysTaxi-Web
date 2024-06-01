import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Textarea
} from "@/components/ui";
import {ArrowRightIcon} from "lucide-react";
import {BoardWriteVACProps} from "@/views/Board/Write/props";

const BoardWritePageVAC = ({
                               title,
                               content,
                               from,
                               to,
                               dateTime,
                               onPostBoardButtonClickHandler,
                               handleDateTimeChange,
                               handleTitleChange,
                               handleToChange,
                               handleFromChange,
                               handleContentChange,
                               getNow,
                               getNextWeek
                           }: BoardWriteVACProps) => {
    return (
        <Card className="w-96">
            <CardHeader className="flex flex-col sm:flex-row md:gap-4 lg:gap-6">
                <CardTitle>Post a ride</CardTitle>
                <CardDescription>Share your ride.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-4">
                    <Label className="sm:col-start-1" htmlFor="title">
                        Title
                    </Label>
                    <Input
                        maxLength={20}
                        className="h-10 w-full"
                        id="title"
                        placeholder="Enter a title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>

                <div className="grid gap-4">
                    <Label className="sm:col-start-1" htmlFor="content">
                        Content
                    </Label>
                    <Textarea
                        className="min-h-[100px] w-full"
                        id="content"
                        placeholder="Do not post your 3rd party contact. Post it in the comment area."
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-1">
                        <Label className="sm:col-start-1" htmlFor="from">
                            From
                        </Label>
                        <Input
                            id="from"
                            placeholder="Enter departing location"
                            value={from}
                            onChange={handleFromChange}
                        />
                    </div>
                    <ArrowRightIcon className="w-6 h-6 self-center"/>
                    <div className="grid gap-1">
                        <Label className="sm:col-start-1" htmlFor="to">
                            To
                        </Label>
                        <Input
                            id="to"
                            placeholder="Enter destination"
                            value={to}
                            onChange={handleToChange}
                        />
                    </div>
                </div>

                <div className="grid gap-4">
                    <Label className="sm:col-start-1" htmlFor="time">
                        Departure time
                    </Label>
                    <Input
                        type="datetime-local"
                        min={getNow}
                        max={getNextWeek}
                        id="time"
                        placeholder="Select date and time"
                        value={dateTime}
                        onChange={handleDateTimeChange}
                    />
                </div>
                <Button onClick={onPostBoardButtonClickHandler} size="lg">Post</Button>
            </CardContent>
        </Card>
    );
};

export default BoardWritePageVAC;