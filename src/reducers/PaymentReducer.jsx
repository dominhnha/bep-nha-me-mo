import{
    PAYMENT__SET, PAYMENT__UPDATA
} from './type'

export const PaymentReducer = (state, action) =>{
    const {type,payload} = action;
    switch(type){
        case PAYMENT__SET:{
            return state = {
                success:true,
                payload:payload,
              }
        }
        case PAYMENT__UPDATA:{
            const initPayment = [payload];
                return state = {
                    success:true,
                    payload:initPayment,
                };
        }
        default:
            return state;
    }
}