import {ChangeEvent} from "react";

export interface SignInPageVACProps {
    id: string;
    password: string;
    onSignUpNavigateButtonClickHandler: () => void;
    onSignInButtonClickHandler: () => void;
    onIdChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    onPasswordChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}
