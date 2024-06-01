import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router";
import {signInRequest} from "@/apis";
import {SignInResponseDto} from "@/apis/response/auth";
import {ResponseDto} from "@/apis/response";
import {MAIN_PATH} from "@/constants";
import {useCookies} from "react-cookie";
import SignInPageVAC from "@/views/SignIn/pageComponent";
import {SignInPageVACProps} from "@/views/SignIn/props";

const SignIn = () => {

    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies();
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("server error");
            return;
        }
        const {code} = responseBody;
        if (code === "SF") alert("login failed");
        if (code === "DBE") alert("Database Error");
        if (code === "VF") alert("Validation failed, check out the blank section.");
        if (code !== "SU") return;

        const {token, expirationInSec} = responseBody as SignInResponseDto;

        const now = new Date().getTime();
        const expires = new Date(now + expirationInSec * 1000);


        setCookies("accessToken", token, {expires: expires, path: MAIN_PATH()});
        navigate(MAIN_PATH());

    }

    const onSignUpNavigateButtonClickHandler = () => {
        navigate("/sign-up");
    }

    const onSignInButtonClickHandler = () => {
        if (id === "" || password === "") {
            alert("please fill out the id and password");
            return;
        }

        signInRequest({id, password}).then(signInResponse);
    }

    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);

    }

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const props: SignInPageVACProps = {
        id,
        password,
        onSignInButtonClickHandler,
        onSignUpNavigateButtonClickHandler,
        onIdChangeHandler,
        onPasswordChangeHandler
    }

    return <SignInPageVAC {...props} />
};

export default SignIn;