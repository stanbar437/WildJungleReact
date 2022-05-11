const host = 'http://localhost:4000'

const Config = {
    TYSU_LOGIN: `${host}/members/login`,
    TYSU_SIGNUP: `${host}/members/signup`,
    TYSU_CONFIRM: `${host}/members/confirm`,
    TYSU_LOGOUT: `${host}/members/logout`,
    TYSU_FORGOT_PASS: `${host}/members/forgotpass`,
    TYSU_CHANGE_PASS: `${host}/members/changepass`,
    TYSU_MEMBER_INFO: `${host}/members/edit/`,
    TYSU_CREDITCARD_INFO: `${host}/members/creditcard/`,
    TYSU_CREDITCARD_ADD: `${host}/members/creditcard/add`,
    TYSU_CREDITCARD_DELETE: `${host}/members/creditcard/delete/`,
    TYSU_BONUS_INFO: `${host}/members/bonus/list/`,
    TYSU_CITY: `${host}/members/city/api`,
    TYSU_AREA: `${host}/members/711-areas/api/`,
    TYSU_PRODUCT_LIKE: `${host}/members/product-like`,
    TYSU_PRODUCT_LIKE_INFO: `${host}/members/product-like-info/`,
    TYSU_711_STORE: `${host}/members/711-oneareastores/api`,
    TYSU_711_Add: `${host}/members/convenience-store`,
    TYSU_711_DELETE: `${host}/members/convenience-store-delete`,
}

export default Config
