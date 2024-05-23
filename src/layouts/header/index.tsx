import React from 'react';
import ocp from '@/asset/ocp_pattern.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTaxi} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router";
import {MAIN_PATH, SIGN_IN_PATH, USER_PATH} from "@/constants";
import {useLoginUserStore} from "@/stores";
import {useCookies} from "react-cookie";

function Header() {

    const {loginUser, resetLoginUser} = useLoginUserStore();
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies();
    const navigateToHome = () => {
        navigate(MAIN_PATH());
    }
    const navigateToMyPage = () => {
        if(!loginUser) return;
        navigate(USER_PATH(loginUser.id));
    }
    const signOutHandler = () => {
        resetLoginUser();
        setCookies("accessToken", "", { path: MAIN_PATH(), expires: new Date() }); //
        navigate(SIGN_IN_PATH());
    }
    return (
        <header className="z-50 fixed top-0 left-0 w-full flex items-center px-4 lg:px-6 h-14 bg-[${ocp}] bg-repeat"
                style={{backgroundImage: `url(${ocp})`, backgroundSize: '300px 300px'}}>
            <FontAwesomeIcon icon={faTaxi} className="mr-2"/>
            <div onClick={navigateToHome} className="flex items-center font-bold  justify-center">
                Humphreys' Taxi Share
            </div>
            <nav className="ml-auto flex gap-2">
                <div onClick={navigateToHome} className="text-sm font-medium hover:underline underline-offset-4">
                    Home
                </div>
                <div onClick={navigateToMyPage} className="text-sm font-medium hover:underline underline-offset-4">
                    MyPage
                </div>
                <div onClick={signOutHandler} className="text-sm font-medium hover:underline underline-offset-4">
                    Sign-out
                </div>
            </nav>
        </header>
    );
}

export default Header;