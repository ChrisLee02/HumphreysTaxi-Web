enum ResponseCode {
    SUCCESS = "SU",

    //400
    VALIDATION_FAILED = "VF",
    DUPLICATE_ID = "DI",
    DUPLICATE_NICKNAME = "DN",
    NOT_EXISTED_USER = "NU",
    NOT_EXISTED_BOARD = "NB",


//401
    SIGN_IN_FAIL = "SF",
    AUTHORIZATION_FAIL = "AF",

    //403
    NO_PERMISSION = "NP",
    FORBIDDEN_TO_JOIN = "FJ",
    ALREADY_FUlL_BOARD = "AFB",
    //500
    DATABASE_ERROR = "DBE",

}

export default ResponseCode;


