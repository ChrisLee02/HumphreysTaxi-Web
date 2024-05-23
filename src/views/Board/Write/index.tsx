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
} from '@/components/ui';
import {ArrowRightIcon} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import {PostBoardRequestDto} from "@/apis/request/board";
import {postBoardRequest} from "@/apis";
import {ResponseDto} from "@/apis/response";
import {PostBoardResponseDto} from "@/apis/response/board";
import {BOARD_DETAIL_PATH, BOARD_PATH} from "@/constants";
import {useLoginUserStore} from "@/stores";
import dayjs from "dayjs";

function BoardWrite() {
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [dateTime, setDateTime] = useState<string>('');

    const {loginUser} = useLoginUserStore();


    // Change handlers for each input field
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFrom(event.target.value);
    };

    const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTo(event.target.value);
    };

    const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateTime(event.target.value);
    };

    /*useEffect(() => {
        console.log(dateTime);
    }, [dateTime])*/

    const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {

        if (!responseBody) {
            alert("server error");
            return;
        }

        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "NU") alert("Not Exist User");
        if (responseBody.code === "FJ") alert("As you are on penalty or joining another board, you're forbidden to join.");
        if (responseBody.code !== "SU") return;

        const {id} = responseBody as PostBoardResponseDto;
        navigate(BOARD_PATH() + "/" + BOARD_DETAIL_PATH(id));
    }


    const onPostBoardButtonClickHandler = () => {
        const requestBody: PostBoardRequestDto = {
            title,
            content,
            startingPoint: from,
            destinationPoint: to,
            departTime: dateTime,
        }

        postBoardRequest(requestBody, cookies.accessToken).then(postBoardResponse);
    }

    const getNow = () => {
        return dayjs().format("YYYY-MM-DDTHH:mm");
    }

    const getNextWeek = () => {
        return dayjs().add(7, "day").format("YYYY-MM-DDTHH:mm");
    }

    useEffect(() => {
        //console.log(loginUser);
        if (!loginUser) return;
        if (loginUser.defaultDepartingPoint) setFrom(loginUser.defaultDepartingPoint);
        if (loginUser.address) setTo(loginUser.address);
    }, [])

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
                        min={getNow()}
                        max={getNextWeek()}
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
}

export default BoardWrite;