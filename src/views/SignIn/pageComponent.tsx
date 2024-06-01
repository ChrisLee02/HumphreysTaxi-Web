import React from 'react';
import {Button, Input, Label} from "@/components/ui";
import KakaoLogin from "@/components/KakaoLogin";
import {SignInPageVACProps} from "@/views/SignIn/props";

const SignInPageVAC = ({
                           id,
                           password,
                           onIdChangeHandler,
                           onPasswordChangeHandler,
                           onSignUpNavigateButtonClickHandler,
                           onSignInButtonClickHandler
                       }: SignInPageVACProps) => {
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

                <KakaoLogin/>

            </div>
        </div>
    );
};

export default SignInPageVAC;