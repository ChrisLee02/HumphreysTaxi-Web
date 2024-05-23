import axios from "axios";
import {SignInRequestDto, SignUpRequestDto} from "./request/auth";
import {SignInResponseDto, SignUpResponseDto} from "./response/auth";
import {ResponseDto} from "./response";
import {GetUserResponseDto,} from "./response/user";
import {PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto,} from "./request/board";
import {
    DeleteBoardResponseDto,
    GetBoardResponseDto,
    GetCommentListResponseDto,
    PatchBoardResponseDto,
    PostBoardResponseDto,
    PostCommentResponseDto,
    PutFavoriteResponseDto,
} from "./response/board";
import {IdCheckResponseDto} from "@/apis/response/auth";
import {IdCheckRequestDto} from "@/apis/request/auth";
import {GetBoardPreviewResponseDto, GetJoinListResponseDto, PutLockResponseDto} from "@/apis/response/board";
import GetBoardListResponseDto from "@/apis/response/board/get-board-list-response.dto";
import PutJoinResponseDto from "@/apis/response/board/put-join-response.dto";

// const DOMAIN = "http://localhost:4000";
const DOMAIN = "https://api.humphreystaxi.shop";


const API_DOMAIN = `${DOMAIN}/api/v1`;

const authorization = (accessToken: string) => {
    return {headers: {Authorization: `Bearer ${accessToken}`}};
};

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;


export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios
        .post(SIGN_IN_URL(), requestBody)
        .then((response) => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios
        .post(SIGN_UP_URL(), requestBody)
        .then((response) => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios
        .post(ID_CHECK_URL(), requestBody)
        .then((response) => {
            const responseBody: IdCheckResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

const GET_BOARD_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}`;
const GET_BOARD_PREVIEW_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/preview`;
const GET_BOARD_LIST_URL = () =>
    `${API_DOMAIN}/board/boards`;
const GET_COMMENT_LIST_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/comments`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const POST_COMMENT_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/comment`;
const PATCH_BOARD_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}`;
const PUT_FAVORITE_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/favorite`;
const DELETE_BOARD_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}`;
const GET_JOIN_LIST = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/join`;
const PUT_JOIN = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/join`;
const PUT_LOCK = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/lock`;
// todo: 메소드별로 공통되는 콜백함수는 promise화해서 추출 가능할 듯.

export const getJoinListRequest = async (boardNumber: string | number) => {
    const result = await axios
        .get(GET_JOIN_LIST(boardNumber))
        .then((response) => {
            const responseBody: GetJoinListResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const putJoinRequest = async (boardNumber: string | number, accessToken: string) => {
    const result = await axios
        .put(PUT_JOIN(boardNumber), {}, authorization(accessToken))
        .then((response) => {
            const responseBody: PutJoinResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const putLockRequest = async (boardNumber: string | number, accessToken: string) => {
    const result = await axios
        .put(PUT_LOCK(boardNumber), {}, authorization(accessToken))
        .then((response) => {
            const responseBody: PutLockResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};


export const getBoardRequest = async (boardNumber: number | string) => {
    const result = await axios
        .get(GET_BOARD_URL(boardNumber))
        .then((response) => {
            const responseBody: GetBoardResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody = error.response.data;
            return responseBody;
        });

    return result;
};
export const getBoardPreviewRequest = async (boardNumber: number | string) => {
    const result = await axios
        .get(GET_BOARD_PREVIEW_URL(boardNumber))
        .then((response) => {
            const responseBody: GetBoardPreviewResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody = error.response.data;
            return responseBody;
        });

    return result;
};
export const getBoardListRequest = async () => {
    const result = await axios
        .get(GET_BOARD_LIST_URL())
        .then((response) => {
            const responseBody: GetBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody = error.response.data;
            return responseBody;
        });

    return result;
};

export const getCommentListRequest = async (boardNumber: string | number, accessToken: string) => {
    const result = await axios
        .get(GET_COMMENT_LIST_URL(boardNumber), authorization(accessToken))
        .then((response) => {
            const responseBody: GetCommentListResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const postBoardRequest = async (
    requestBody: PostBoardRequestDto,
    accessToken: string
) => {
    const result = await axios
        .post(POST_BOARD_URL(), requestBody, authorization(accessToken))
        .then((response) => {
            const responseBody: PostBoardResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const postCommentRequest = async (
    boardNumber: string | number,
    requestBody: PostCommentRequestDto,
    accessToken: string
) => {
    const result = await axios
        .post(POST_COMMENT_URL(boardNumber), requestBody, authorization(accessToken))
        .then((response) => {
            const responseBody: PostCommentResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const patchBoardRequest = async (
    boardNumber: string | number,
    requestBody: PatchBoardRequestDto,
    accessToken: string
) => {
    const result = await axios
        .patch(PATCH_BOARD_URL(boardNumber), requestBody, authorization(accessToken))
        .then((response) => {
            const responseBody: PatchBoardResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const putFavoriteRequest = async (
    boardNumber: string | number,
    accessToken: string
) => {
    const result = await axios
        .put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
        .then((response) => {
            const responseBody: PutFavoriteResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const deleteBoardRequest = async (
    boardNumber: string | number,
    accessToken: string
) => {
    const result = await axios
        .delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
        .then((response) => {
            const responseBody: DeleteBoardResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

const GET_USER_URL = (id: string) => `${API_DOMAIN}/user/${id}`;
const PATCH_USER_URL = (id: string) => `${API_DOMAIN}/user/${id}`;

export const getUserRequest = async (email: string) => {
    const result = await axios
        .get(GET_USER_URL(email))
        .then((response) => {
            const responseBody: GetUserResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};
export const patchUserRequest = async (email: string, accessToken: string) => {
    const result = await axios
        .patch(PATCH_USER_URL(email), authorization(accessToken))
        .then((response) => {
            const responseBody: GetUserResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};


const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const multipartFormData = {
    headers: {"Content-Type": "multipart/form-data"},
};

export const fileUploadRequest = async (data: FormData) => {
    const result = await axios
        .post(FILE_UPLOAD_URL(), data, multipartFormData)
        .then((response) => {
            const responseBody: string = response.data;
            return responseBody;
        })
        .catch((error) => {
            return null;
        });
    return result;
};
