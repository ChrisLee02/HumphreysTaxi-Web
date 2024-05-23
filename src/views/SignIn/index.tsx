import {Button, Input, Label} from '@/components/ui';
import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router";
import {signInRequest} from "@/apis";
import {SignInResponseDto} from "@/apis/response/auth";
import {ResponseDto} from "@/apis/response";
import {MAIN_PATH} from "@/constants";
import {useCookies} from "react-cookie";

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

    return (
        <div className="flex justify-center align-middle mx-auto max-w-4xl">
            <div className="flex flex-col justify-center align-middle mx-auto max-w-sm space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Sign In</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your ID and password to access your
                        account</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="id">ID</Label>
                    <Input value={id} onChange={onIdChangeHandler} maxLength={20} id="id" placeholder="A123456789"
                           required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input value={password} onChange={onPasswordChangeHandler} maxLength={20} id="password"
                           placeholder="Password" required type="password"/>
                </div>
                <div className="flex flex-col gap-2">
                    <Button onClick={onSignInButtonClickHandler} className="w-full" type="submit">
                        Sign In
                    </Button>
                    <div className="text-center" onClick={onSignUpNavigateButtonClickHandler}>
                        Don't have an account? Sign up
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;