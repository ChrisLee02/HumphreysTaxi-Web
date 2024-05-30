// const DOMAIN = "http://localhost:4000";
const DOMAIN = "https://api.humphreystaxi.shop";
const API_DOMAIN = `${DOMAIN}/api/v1`;

export const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
export const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
export const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;
export const GET_BOARD_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}`;
export const GET_BOARD_PREVIEW_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/preview`;
export const GET_BOARD_LIST_URL = () =>
    `${API_DOMAIN}/board/boards`;
export const GET_COMMENT_LIST_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/comments`;
export const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
export const POST_COMMENT_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/comment`;
export const PATCH_BOARD_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}`;
export const PUT_FAVORITE_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/favorite`;
export const DELETE_BOARD_URL = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}`;
export const GET_JOIN_LIST = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/join`;
export const PUT_JOIN = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/join`;
export const PUT_LOCK = (boardNumber: string | number) =>
    `${API_DOMAIN}/board/${boardNumber}/lock`;
export const GET_USER_URL = (id: string) => `${API_DOMAIN}/user/${id}`;
export const PATCH_USER_URL = (id: string) => `${API_DOMAIN}/user/${id}`;