import {ChangeEvent} from "react";

export interface SignUpPageVACProps {
    page: 1 | 2;
    id: string;
    password: string;
    passwordConfirm: string;
    unit: string;
    username: string;
    address: string;
    defaultDepartingPoint: string;
    isIdChecked: boolean;
    isPasswordValid: boolean;
    isPasswordMatched: boolean;
    onNextButtonClickHandler: () => void;
    onPrevButtonClickHandler: () => void;
    onIdCheckButtonClickHandler: () => void;
    onSignInNavigateButtonClickHandler: () => void;
    onSignUpButtonClickHandler: () => void;
    onIdChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    onPasswordChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    onPasswordConfirmChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    onUnitChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    onUsernameChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    onAddressChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    onDefaultDepartingPointChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}