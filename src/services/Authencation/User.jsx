import {db} from '../../Firebase__config'
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import { set } from 'firebase/database';
import {AddBestSell, GetNameProduct, GetPriceProduct, GetQuantityProduct,} from '../Product/Product'
import { GetPercentDiscountByID } from './Discount';
import { AddPurchaseHistory } from './PurchaseHistory';
const CollectionName = "User"


export const AddUserCollection = async(uid,newUser)=>{
    const {Email,firstname,lastname} = newUser;
    const initUser = {
        Email:Email,
        Address:"",
        Number:"",
        ImgUser:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/36015793570193.5e6c1151cb04b.png",
        FullName:`${firstname} ${lastname}`,
        Birthdate:"",
        Role:"user",
    }    
    return await setDoc(doc(db, CollectionName, uid), initUser)
    .then(e=>{
        return {
            success: true,
            payload:null,
        }
    })
    .catch((error) => {
        return {
            success: false,
            payload:error,
        }
    })

}

export const GetUserCollection = async(uid)=>{
    
    const docRef = doc(db, CollectionName, uid);   
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {
            success: true,
            payload:docSnap.data(),
        }
    } else {
        // doc.data() will be undefined in this case
        return {
            success: false,
            payload:"No such document!",
        }
    }
}

export const UpdateUser = async(uid,updateUser)=>{
    const {
        Email,
        Address,
        Number,
        ImgUser,
        FullName,
        Birthdate, 
        
    } = updateUser;
    console.log(Email)
    const docRef = doc(db, CollectionName,uid);
    return await updateDoc(docRef,{
        Email:Email,
        Address:Address,
        Number:Number,
        ImgUser:ImgUser,
        FullName:FullName,
        Birthdate:Timestamp.fromDate(new Date(Birthdate)) ,
        Role: "User"
    })
    .then(docRef =>{
        return{
            success: true,
            payload:updateUser
        }
    })
    .catch(e=>{
        return{
            success: false,
            payload:e
        }
    })


}

export const AddToCart = async(value)=>{
    const {uid,Pid,Number} = value;
    const washingtonRef = doc(db,CollectionName, uid);
    //const docRef = await doc(db, `${CollectionName}/${uid}/Cart/`);

    // add new user 
    await updateDoc(washingtonRef, {
        Cart: arrayUnion({
            Pid:Pid,
            Number:Number,
        })
    });
 
}
export const GetToCart = async(uid)=>{
    // const docRef = doc(db,CollectionName,`${uid}/Cart/`);
    const washingtonRef = doc(db,CollectionName, uid,"Cart");
    await getDoc(washingtonRef)
    .then((e)=>{
        return {
            success: true,
            payload:e,
        }
    })
    .catch(e=>{
        return {
            success: false,
            payload:e,
        }
    })
    
}
export const setNewCart = async(uid,listProduct)=>{
    
    const washingtonRef = doc(db,CollectionName, uid);
    
    // add new user 
    await updateDoc(washingtonRef, {
        Cart: listProduct
    })
    .then(()=>{
        return {
            success: true,
            payload:null,
        }
    })
    .catch(e=>{
        return {
            success: false,
            payload:e,
        }
    })
}

//PurchaseHistory
export const AddPurchaseHistoryForUser = async(uid,status,Cart,ListProduct=[{pid:"",quantity:""}]) =>{ 
    const {emailOrPhone,Address,Payments,Total,PriceDiscount,
        FullName
    } = Cart;
        const initPur = {
            Item:ListProduct,
            Discount:PriceDiscount,
            Total:Total,
            DayPurchased:serverTimestamp(),
            Address:Address,
            Payments:Payments,
            FullName:FullName,
            Email:emailOrPhone,
        }
        if(status===true){
            
            const docRef = doc(db, CollectionName, uid);
            const colRef = collection(docRef, "PurchaseHistoryForUser");
            const PurDoc = await addDoc(colRef,initPur);
            for(let i=0;i<ListProduct.length;i++){
                const docRefP = doc(db,"Product",ListProduct[i].pid);
                const QuantityProduct = await GetQuantityProduct(ListProduct[i].pid);
                await updateDoc(docRefP,{
                    Quantity:(QuantityProduct-ListProduct[i].quantity).toString()})
                await AddBestSell(ListProduct[i].pid,ListProduct[i].quantity);
                
            }
            await AddPurchaseHistory(uid,PurDoc.id,initPur);
        }
        else{
            const colRef = collection(db,"PurchaseHistory");
            const PurDoc = await addDoc(colRef,initPur);
            const docPur = await doc(db,"PurchaseHistory",PurDoc.id);
            for(let i=0;i<ListProduct.length;i++){
                const docRefP = doc(db,"Product",ListProduct[i].pid);
                const QuantityProduct = await GetQuantityProduct(ListProduct[i].pid);
                await updateDoc(docRefP,{
                    Quantity:(QuantityProduct-ListProduct[i].quantity).toString()
                                     })
                await AddBestSell(ListProduct[i].pid,ListProduct[i].quantity);
                
            }
            await updateDoc(docPur,{
                    Uid:uid,
        })
        }
       
    }
    export const GetPurchaseHistoryByUser=async(uid,uPid)=>{
        const docRef = doc(db, CollectionName,uid,"PurchaseHistoryForUser",uPid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists())
            return await docSnap.data();
        return{
            success: false,
            payload:"No Purchase History"
        }
    }
    
    //Get quantity product
    export const GetQuantity=async(uid,uPid)=>{
        const docRef = doc(db, CollectionName,uid,"PurchaseHistoryForUser",uPid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists())
            return await docSnap.data().Item;
        return{
            success: false,
            payload:"No Purchase History"
        }
    }