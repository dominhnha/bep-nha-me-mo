import{
    AUTH__SET,
    AUTH__REMOVE
} from './type'

export const AuthReducer = (state, action) =>{
    const {type,payload} = action;
    switch(type){
        case AUTH__SET:{
            console.log(payload)
            return state = {
                success:true,
                payload:payload.user,
              }
        }
        case AUTH__REMOVE:{
            return state = {
                success:false,
                payload:null,
              };
        }
        default:
            return state;
    }
}