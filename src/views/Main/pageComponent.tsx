import React from 'react';
import {Button, Input} from "@/components/ui";
import {SearchIcon} from "lucide-react";
import BoardItem from "@/components/BoardListItem";
import {MainPageVACProps} from "@/views/Main/props";


const MainPageVAC = ({boardList, onNewRideButtonClickHandler}: MainPageVACProps) => {
    return (
        <section key="1" className="w-full md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-2">
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Discover
                                available rides.</h1>
                            <div
                                className="max-w-[600px] text-gray-500 md:text-xl flex items-center dark:text-gray-400 h-12">
                                <Button onClick={onNewRideButtonClickHandler}
                                        className="bg-orange-500 hover:bg-orange-400 text-black w-full">
                                    Click to make new ride
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <div className="relative flex-1">
                                <SearchIcon
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400"/>
                                <Input
                                    className="pl-10 pr-4 h-10 rounded-md border border-gray-200 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:ring-gray-300"
                                    placeholder="Search by title, starting point, destination, depart time"
                                    type="text"
                                />
                            </div>
                            <Button className="h-10 rounded-md px-6 text-sm font-medium">Search</Button>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        {boardList.map((boardListItem, index) => <BoardItem {...boardListItem} key={index}/>)}
                    </div>
                </div>
            </div>
        </section>


    );
};

export default MainPageVAC;