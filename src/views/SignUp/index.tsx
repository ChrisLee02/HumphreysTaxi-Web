import React, {ChangeEvent, useState} from 'react';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import {idCheckRequest, signUpRequest} from "@/apis";
import {IdCheckResponseDto, SignUpResponseDto} from "@/apis/response/auth";
import {ResponseDto} from "@/apis/response";
import {SignUpRequestDto} from "@/apis/request/auth";
import {MAIN_PATH} from "@/constants";
import {SignUpPageVACProps} from "@/views/SignUp/props";
import SignUpPageVAC from "@/views/SignUp/pageComponent";

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
        if (responseBody.code === "VF") alert("Validation failed, check out the blank section.");
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

    const props: SignUpPageVACProps = {
        page,
        id,
        password,
        onIdChangeHandler,
        onPasswordChangeHandler,
        onDefaultDepartingPointChangeHandler,
        defaultDepartingPoint,
        isIdChecked,
        onAddressChangeHandler,
        isPasswordMatched,
        isPasswordValid,
        onNextButtonClickHandler,
        onSignUpButtonClickHandler,
        onIdCheckButtonClickHandler,
        onPasswordConfirmChangeHandler,
        onPrevButtonClickHandler,
        onSignInNavigateButtonClickHandler,
        onUnitChangeHandler,
        address,
        onUsernameChangeHandler,
        unit,
        username,
        passwordConfirm
    }

    return <SignUpPageVAC {...props} />

}


export default SignUp;