import React, {ChangeEvent, useState} from 'react';
import {Button, Input, Label} from '@/components/ui';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import {idCheckRequest, signUpRequest} from "@/apis";
import {IdCheckResponseDto, SignUpResponseDto} from "@/apis/response/auth";
import {ResponseDto} from "@/apis/response";
import {SignUpRequestDto} from "@/apis/request/auth";
import {MAIN_PATH} from "@/constants";

function SignUp() {

    const [page, setPage] = useState<1 | 2>(1);
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();

    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [unit, setUnit] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [defaultDepartingPoint, setDefaultDepartingPoint] = useState<string>("");

    const [isIdChecked, setIdChecked] = useState<boolean>(false);
    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
    const [isPasswordMatched, setPasswordMatched] = useState<boolean>(true);

    const idCheckResponse = (responseBody: IdCheckResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("server error");
            return;
        }
        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "DI") {
            alert("ID duplicated");
            setIdChecked(false);
        }

        if (responseBody.code !== "SU") return;

        setIdChecked(true);
    }

    const signUpResponse = (responseBody: SignUpResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("server error");
            return;
        }
        if (responseBody.code === "DI") alert("ID duplicated");
        if (responseBody.code === "DBE") alert("Database Error");
        if (responseBody.code === "DN") alert("Username duplicated");

        if (responseBody.code !== "SU") return;

        const {token, expirationInSec} = responseBody as SignUpResponseDto;

        const now = new Date().getTime();
        const expires = new Date(now + expirationInSec * 1000);


        setCookies("accessToken", token, {expires: expires, path: MAIN_PATH()});
        navigate(MAIN_PATH());
    }

    const onNextButtonClickHandler = () => {
        setPage(2);
    }

    const onPrevButtonClickHandler = () => {
        setPage(1);
    }

    const onIdCheckButtonClickHandler = () => {
        idCheckRequest({id}).then(idCheckResponse);
    }

    const onSignInNavigateButtonClickHandler = () => {
        navigate("/sign-in");
    }

    const onSignUpButtonClickHandler = () => {
        if (!isIdChecked || !isPasswordValid || !isPasswordMatched) {
            alert("please check out the page 1");
            return;
        }

        if (unit === "" || username === "") {
            alert("please check out the page 2");
            return;
        }

        const signUpRequestBody: SignUpRequestDto = {
            id,
            password,
            username,
            unit,
            address,
            defaultDepartingPoint,
        }

        if (address === "") {
            signUpRequestBody.address = null;
        }
        if (defaultDepartingPoint === "") {
            signUpRequestBody.defaultDepartingPoint = null;
        }

        signUpRequest(signUpRequestBody).then(signUpResponse);


    }


    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
        setIdChecked(false);
    }

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordValid(event.target.value.length >= 8);
        setPasswordMatched(event.target.value === passwordConfirm);
    }

    const onPasswordConfirmChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);
        setPasswordMatched(event.target.value === password);
    }

    const onUnitChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUnit(event.target.value);
    }

    const onUsernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    }

    const onDefaultDepartingPointChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDefaultDepartingPoint(event.target.value);
    }


    return (
        <div className="flex justify-center align-middle mx-auto max-w-4xl">
            {(page === 1) ?
                <div className="mx-auto max-w-sm space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Sign Up</h1>
                        <p className="text-gray-500 dark:text-gray-400">Enter your ID and password to create an
                            account</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="id">*ID</Label>
                        <div className="flex items-center space-x-2">
                            <Input maxLength={20} value={id} onChange={onIdChangeHandler} id="id"
                                   placeholder="A123456789"
                                   required/>
                            <Button onClick={onIdCheckButtonClickHandler} variant="outline">Check ID</Button>
                        </div>
                        {isIdChecked && <div className="flex items-center space-x-2 mt-1">
                            <span className="text-green-500 text-xs font-medium">ID is valid</span>
                        </div>}

                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">*Password</Label>
                        <Input maxLength={20} value={password} onChange={onPasswordChangeHandler} id="password"
                               placeholder="Password"
                               required
                               type="password"/>
                        {isPasswordValid ? <div className="flex items-center space-x-2 mt-1">
                            <span className="text-green-500 text-xs font-medium">Password is valid</span>
                        </div> : <div className="flex items-center space-x-2 mt-1">
                            <span
                                className="text-red-500 text-xs font-medium">Password length should be at least 8</span>
                        </div>}

                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">*Confirm Password</Label>
                        <Input maxLength={20} value={passwordConfirm} onChange={onPasswordConfirmChangeHandler}
                               id="confirm-password"
                               placeholder="Confirm Password"
                               required type="password"/>
                        {isPasswordMatched ? <div className="flex items-center space-x-2 mt-1">
                            <span className="text-green-500 text-xs font-medium">Passwords match</span>
                        </div> : <div className="flex items-center space-x-2 mt-1">
                            <span className="text-red-500 text-xs font-medium">Passwords are not matched</span>
                        </div>}

                    </div>
                    <Button onClick={onNextButtonClickHandler} className="w-full" type="submit">
                        Next
                    </Button>
                    <div className="text-blue-500 hover:underline"
                         onClick={onSignInNavigateButtonClickHandler}>{'If you have account, click here for sign-in.'}
                    </div>


                </div>
                :
                <div className="mx-auto max-w-sm space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Complete Sign Up</h1>
                        <p className="text-gray-500 dark:text-gray-400">Enter the remaining information to create your
                            account</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="unit">*Unit</Label>
                        <Input maxLength={20} value={unit} onChange={onUnitChangeHandler} id="unit"
                               placeholder="Unit 123" required/>
                        {unit === "" && <div className="flex items-center space-x-2 mt-1">
                            <span className="text-red-500 text-xs font-medium">unit is required</span>
                        </div>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">*Username</Label>
                        <Input maxLength={20} value={username} onChange={onUsernameChangeHandler} id="username"
                               placeholder="Username"
                               required/>
                        {username === "" && <div className="flex items-center space-x-2 mt-1">
                            <span className="text-red-500 text-xs font-medium">unit is required</span>
                        </div>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input maxLength={20} value={address} onChange={onAddressChangeHandler} id="address"
                               placeholder="1234 Main St"
                               required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="departing-point">Default Departing Point</Label>
                        <Input maxLength={20} value={defaultDepartingPoint}
                               onChange={onDefaultDepartingPointChangeHandler}
                               id="departing-point" placeholder="Home"
                               required/>
                    </div>

                    <div className="flex gap-8">
                        <Button onClick={onPrevButtonClickHandler} className="w-full bg-white text-black" type="submit">
                            Prev
                        </Button>
                        <Button onClick={onSignUpButtonClickHandler} className="w-full" type="submit">
                            Sign Up
                        </Button>
                    </div>


                </div>
            }
        </div>
    );
}


export default SignUp;