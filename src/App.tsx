import React, {useEffect} from 'react';
import './App.css';
import {useCookies} from "react-cookie";
import {useLoginUserStore} from "@/stores";
import {Routes} from "react-router";
import {Route} from 'react-router-dom';
import Container from "@/layouts/container";
import {
    BOARD_DETAIL_PATH,
    BOARD_PATH,
    BOARD_WRITE_PATH,
    MAIN_PATH,
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    USER_PATH
} from "@/constants";
import Main from "@/views/Main";
import SignUp from './views/SignUp';
import User from "@/views/User";
import BoardWrite from "@/views/Board/Write";
import BoardDetail from "@/views/Board/Detail";
import SignIn from "@/views/SignIn";
import {jwtDecode} from "jwt-decode";
import {getUserRequest} from "@/apis";
import {ResponseDto} from "@/apis/response";
import {GetUserResponseDto} from './apis/response/user';
import UserType from "@/types/interface/user.interface";

export default function App() {
    const {setLoginUser, resetLoginUser} = useLoginUserStore();
    const [cookies, setCookies] = useCookies();

    const getUserResponse = (
        responseBody: GetUserResponseDto | ResponseDto | null
    ) => {
        if (!responseBody) return;
        const {code: responseCode} = responseBody;
        if (responseCode === "NU" || responseCode === "DBE") {
            resetLoginUser();
            return;
        }

        const {code, message, ...userProps} = responseBody as GetUserResponseDto;
        const loginUser: UserType = {...userProps};

        setLoginUser(loginUser);
    };

    useEffect(() => {
        if (!cookies.accessToken) {
            resetLoginUser();
            return;
        }

        const id = jwtDecode(cookies.accessToken).sub;

        if (!id) {
            resetLoginUser();
            return;
        }

        getUserRequest(id).then(getUserResponse);
    }, [cookies.accessToken])
    return (
        <Routes>
            <Route element={<Container/>}>
                <Route path={MAIN_PATH()} element={<Main/>}/>
                <Route path={SIGN_UP_PATH()} element={<SignUp/>}/>
                <Route path={SIGN_IN_PATH()} element={<SignIn/>}/>
                <Route path={USER_PATH(":userEmail")} element={<User/>}/>
                <Route path={BOARD_PATH()}>
                    <Route path={BOARD_WRITE_PATH()} element={<BoardWrite/>}/>
                    <Route
                        path={BOARD_DETAIL_PATH(":boardNumber")}
                        element={<BoardDetail/>}
                    />
                </Route>
                <Route path="*" element={<h1>404 Not Found</h1>}/>
            </Route>
        </Routes>
    )


}

