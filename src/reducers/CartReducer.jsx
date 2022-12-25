import{
    CART__SET,
    CART__REMOVE,
    CART__UPDATA,
    CART__DELETE,
    CART__DECREMENT,
    CART__INCREMENT,
   
} from './type'

export const CartReducer = (state, action) =>{
    const {type,payload} = action;
    console.log(state.payload,payload );
    switch(type){
        case CART__SET:{
            // payload == obj new Cart
            console.log("Payload",payload)
            return state = {
                success:true,
                payload:payload,
              }
            
        };
        case CART__REMOVE:{
            //payload == Pid
             console.log(payload)
             const newCart = state.payload.filter(item=>{return item.Pid!=payload}) 
             localStorage.setItem("CART",JSON.stringify(newCart));
             return state = {
                success:true,
                payload:newCart,
            };;
            
        };
        case CART__UPDATA:{
            //payload == new Product
            let check = false;
            console.log("cheker",payload)
            const curCart = state.payload.map(item =>{
                if(item.Pid === payload.Pid){
                    check = true;
                    const Quantity = item.Quantity + payload.Quantity;
                    return {
                        Pid:payload.Pid, 
                        Quantity:Quantity,
                        Price:item.Price,
                        Image:item.Image,
                        NameProduct:item.NameProduct
                    }
                }else{
                    return item;
                }
                
            })
            if(check == true){
                localStorage.setItem("CART",JSON.stringify(curCart));
                return state = {
                    success:true,
                    payload:curCart,
                };
            }else{
                const newCart = [...state.payload,payload];
                localStorage.setItem("CART",JSON.stringify(newCart));
                return state = {
                    success:true,
                    payload:newCart,
                };
            }
           
        }
        case CART__INCREMENT:{

            const index = state.payload.find(item=>{return item.Pid==payload});
            index.Quantity++;
            // const initQuantity = state.payload[index].Quantity + 1;
            // console.log("inir",initQuantity)
            // state.payload[index].Quantity = initQuantity;
            localStorage.setItem("CART",JSON.stringify(state.payload));
             return state = {
                success:true,
                payload:state.payload,
             };
        }
        case CART__DECREMENT:{
            const index = state.payload.find(item=>{return item.Pid==payload});
            if(index.Quantity <=1 ){
                localStorage.setItem("CART",JSON.stringify(state.payload));
                return state = {
                    success:true,
                    payload:state.payload,
                 };
            }else{
                index.Quantity--;
                localStorage.setItem("CART",JSON.stringify(state.payload));
                return state = {
                    success:true,
                    payload:state.payload,
                 };    
            }
            
            // const initQuantity = state.payload[index].Quantity + 1;
            // console.log("inir",initQuantity)
            // state.payload[index].Quantity = initQuantity;
           
        }
        default:
            console.log("fff")
            return state;
    }
   
}