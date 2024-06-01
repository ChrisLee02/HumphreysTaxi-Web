import React from 'react';
import {Avatar, AvatarFallback, AvatarImage, Button} from "@/components/ui";
import {CalendarDaysIcon, CompassIcon, MapPinIcon} from "lucide-react";
import BoardItem from "@/components/BoardListItem";
import {UserPageVACProps} from "@/views/User/props";

const UserPageVAC = ({userInfo, board}: UserPageVACProps) => {
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
    );
};

export default UserPageVAC;