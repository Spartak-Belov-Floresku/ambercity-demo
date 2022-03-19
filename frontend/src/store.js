import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers';
import { 
    productListReducers, 
    productDetailsReducers,
    productDeleteReducers,
    productCreateReducers,
    productUpdateReducers,
    productReviewCreateReducers,
    productTopRatedReducers,   
} from './reducers/productReducers';
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpadteProfileReducer, 
    userListReducer, 
    userDeleteReducer,
    userUpdateReducer,
 } from './reducers/userReducers';
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer, 
} from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate: productUpdateReducers,
    productReviewCreate: productReviewCreateReducers,
    productTopRated: productTopRatedReducers,

    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpadteProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
});

const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))  || null;
const shippingAddressFromStorage = JSON.parse(localStorage.getItem('shippingAddress'))  || {};                 

const initialState = {
    cart:       {
        cartItems:       cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin:  {userInfo:  userInfoFromStorage},

};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

