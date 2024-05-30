import axios, {AxiosError, AxiosResponse} from "axios";
import {SignInRequestDto, SignUpRequestDto} from "./request/auth";
import {SignInResponseDto, SignUpResponseDto} from "./response/auth";
import {ResponseDto} from "./response";
import {PostBoardRequestDto, PostCommentRequestDto,} from "./request/board";
import {IdCheckResponseDto} from "@/apis/response/auth";
import {IdCheckRequestDto} from "@/apis/request/auth";
import {
    DELETE_BOARD_URL,
    GET_BOARD_LIST_URL,
    GET_BOARD_PREVIEW_URL,
    GET_BOARD_URL,
    GET_COMMENT_LIST_URL,
    GET_JOIN_LIST,
    GET_USER_URL,
    ID_CHECK_URL,
    PATCH_USER_URL,
    POST_BOARD_URL,
    POST_COMMENT_URL,
    PUT_JOIN,
    PUT_LOCK,
    SIGN_IN_URL,
    SIGN_UP_URL
} from "@/apis/api_urls";
import {
    DeleteBoardResponseDto,
    GetBoardResponseDto,
    GetCommentListResponseDto,
    GetJoinListResponseDto,
    PostBoardResponseDto,
    PostCommentResponseDto,
    PutLockResponseDto
} from "@/apis/response/board";
import PutJoinResponseDto from "@/apis/response/board/put-join-response.dto";
import GetBoardListResponseDto from "@/apis/response/board/get-board-list-response.dto";
import {GetUserResponseDto, PatchUserResponseDto} from "@/apis/response/user";


const authorization = (accessToken: string) => {
    return {headers: {Authorization: `Bearer ${accessToken}`}};
};

const callbackThen = <ResponseDtoType extends ResponseDto>(response: AxiosResponse<any>) => {
    const responseBody: ResponseDtoType = response.data;
    return responseBody;
}

const callbackCatch = (error: AxiosError<any>) => {
    if (!error.response) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
}


export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios
        .post(SIGN_IN_URL(), requestBody)
        .then(callbackThen<SignInResponseDto>)
        .catch(callbackCatch);
    return result;
};
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios
        .post(SIGN_UP_URL(), requestBody)
        .then(callbackThen<SignUpResponseDto>)
        .catch(callbackCatch);
    return result;
};

export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios
        .post(ID_CHECK_URL(), requestBody)
        .then(callbackThen<IdCheckResponseDto>)
        .catch(callbackCatch);
    return result;
};


// todo: 메소드별로 공통되는 콜백함수는 promise화해서 추출 가능할 듯.


export const getJoinListRequest = async (boardNumber: string | number) => {
    const result = await axios
        .get(GET_JOIN_LIST(boardNumber))
        .then(callbackThen<GetJoinListResponseDto>)
        .catch(callbackCatch);
    return result;
};

export const putJoinRequest = async (boardNumber: string | number, accessToken: string) => {
    const result = await axios
        .put(PUT_JOIN(boardNumber), {}, authorization(accessToken))
        .then(callbackThen<PutJoinResponseDto>)
        .catch(callbackCatch);
    return result;
};

export const putLockRequest = async (boardNumber: string | number, accessToken: string) => {
    const result = await axios
        .put(PUT_LOCK(boardNumber), {}, authorization(accessToken))
        .then(callbackThen<PutLockResponseDto>)
        .catch(callbackCatch);
    return result;
};


export const getBoardRequest = async (boardNumber: number | string) => {
    const result = await axios
        .get(GET_BOARD_URL(boardNumber))
        .then(callbackThen<GetBoardResponseDto>)
        .catch(callbackCatch);

    return result;
};
export const getBoardPreviewRequest = async (boardNumber: number | string) => {
    const result = await axios
        .get(GET_BOARD_PREVIEW_URL(boardNumber))
        .then(callbackThen<GetBoardResponseDto>)
        .catch(callbackCatch);

    return result;
};
export const getBoardListRequest = async () => {
    const result = await axios
        .get(GET_BOARD_LIST_URL())
        .then(callbackThen<GetBoardListResponseDto>)
        .catch(callbackCatch);

    return result;
};

export const getCommentListRequest = async (boardNumber: string | number, accessToken: string) => {
    const result = await axios
        .get(GET_COMMENT_LIST_URL(boardNumber), authorization(accessToken))
        .then(callbackThen<GetCommentListResponseDto>)
        .catch(callbackCatch);
    return result;
};

export const postBoardRequest = async (
    requestBody: PostBoardRequestDto,
    accessToken: string
) => {
    const result = await axios
        .post(POST_BOARD_URL(), requestBody, authorization(accessToken))
        .then(callbackThen<PostBoardResponseDto>)
        .catch(callbackCatch);
    return result;
};

export const postCommentRequest = async (
    boardNumber: string | number,
    requestBody: PostCommentRequestDto,
    accessToken: string
) => {
    const result = await axios
        .post(POST_COMMENT_URL(boardNumber), requestBody, authorization(accessToken))
        .then(callbackThen<PostCommentResponseDto>)
        .catch(callbackCatch);
    return result;
};


export const deleteBoardRequest = async (
    boardNumber: string | number,
    accessToken: string
) => {
    const result = await axios
        .delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
        .then(callbackThen<DeleteBoardResponseDto>)
        .catch(callbackCatch);
    return result;
};


export const getUserRequest = async (email: string) => {
    const result = await axios
        .get(GET_USER_URL(email))
        .then(callbackThen<GetUserResponseDto>)
        .catch(callbackCatch);
    return result;
};
export const patchUserRequest = async (email: string, accessToken: string) => {
    const result = await axios
        .patch(PATCH_USER_URL(email), authorization(accessToken))
        .then(callbackThen<PatchUserResponseDto>)
        .catch(callbackCatch);
    return result;
};
