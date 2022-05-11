const host = 'http://localhost:4000';
const Config={
    INSERT_CART_ORDER:`${host}/carts/order`,
    INSERT_CART_ORDER_DETAIL:`${host}/carts/order_detail`,
    ORDER_SEARCH:`${host}/carts/order_search`,
    GET_BONUSPOINTS:`${host}/carts/bonus`,
    RECEIVE_DATA:`${host}/carts/receive_data`
};

export default Config;