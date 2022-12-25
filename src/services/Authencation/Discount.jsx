import {db} from '../../Firebase__config'
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, Timestamp, increment } from "firebase/firestore";

const CollectionName = "Discount";

//Add new Discount

export const AddDiscount = async(newDiscount) =>{
    const {
        NameDiscount,
        DescriptionDiscount,
        PercentDiscount,
        Exp,
        Mfg,
        Quantity,
    } = newDiscount;
    const CollectionRef = collection(db, CollectionName);
    const initDiscount = {
        NameDiscount:NameDiscount,
        DescriptionDiscount:DescriptionDiscount,
        PercentDiscount:PercentDiscount*100,
        Exp: await Timestamp.fromDate(new Date(Exp)),
        Mfg: await Timestamp.fromDate(new Date(Mfg)),
        Quantity:Quantity,
    }
    return await addDoc(CollectionRef, initDiscount)
    .then(e=>{
        return{
            success: true,
            payload: initDiscount,
        }
    })
    .catch((e)=>{
        return{
            success:false,
            payload:e,
        }
    })
};

/*
EXP: expiry date
MFG: manufacturing date
 */
/*
Discount for product conditionsApply > quantitySoldOrMonth Before
*/
export const DiscountForProduct = async(newDiscount)=>{
    const {NameDiscount,PercentDiscount,conditionsApply} = newDiscount;
    const initDiscount={
        NameDiscount:NameDiscount,
        PercentDiscount:PercentDiscount,
        ConditionsApply:conditionsApply
    }
    return await addDoc(collection(db, CollectionName), initDiscount)
}

export const GetConditionsApply = async(dpid)=>{
    const docRef = doc(db,CollectionName,dpid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {
            success: true,
            payload: {
                Info: docSnap.data().ConditionsApply,
            }
        }
    } else {
        // doc.data() will be undefined in this case
        return {
            success: false,
            payload: "No such document!",
        }
    }
}
//Get PercentDiscount by id
export const GetPercentDiscountByID = async(did) =>{
    const docRef = doc(db,CollectionName,did);
    const docSnap = await getDoc(docRef);
    let PercentDiscount = "";
    if(docSnap.exists()){
        PercentDiscount = await docSnap.data().PercentDiscount;
        return PercentDiscount;
    }
    else{
        return{
            success:false,
            payload:"No such document!",
    }
}
}

//Get quantity discount
export const GetQuantityDiscount = async(did) =>{
    const docRef = doc(db,CollectionName,did);
    const docSnap = await getDoc(docRef);
    let Quantity = "";
    if(docSnap.exists()){
        Quantity = await docSnap.data().Quantity;
        return Quantity;
    }
    else{
        return{
            success:false,
            payload:"No such document!",
    }
}
}
//Get exp
export const GetExp = async(did) =>{
    const docRef = doc(db,CollectionName,did);
    const docSnap = await getDoc(docRef);
    let Exp = "";
    if(docSnap.exists()){
        Exp = await docSnap.data().Exp.toMillis();
        return Exp;
    }
    else{
        return{
            success:false,
            payload:"No such document!",
    }
}
}
//Get mfg
export const GetMfg = async(did) =>{
    const docRef = doc(db,CollectionName,did);
    const docSnap = await getDoc(docRef);
    let Mfg = "";
    if(docSnap.exists()){
        Mfg = await docSnap.data().Mfg.toMillis();
        return Mfg;
        
    }
    else{
        return{
            success:false,
            payload:"No such document!",
    }
}
}
//Check discount
export const CheckDiscount = async(did) =>{
    const MFG = await GetMfg(did);
    const EXP = await GetExp(did);
    const Time = new Date();
    const now = Time.getTime();
    const quantity = await GetQuantityDiscount(did);
    let PercentDiscount = await GetPercentDiscountByID(did);
    if((now>=MFG && now<=EXP)&&quantity>0){
        return PercentDiscount;
    }
    else{
        return 0;
    }
}

//-1 discount add to button pay 
export const IncrementDiscount = async(did) =>{
    const docRef = doc(db,CollectionName,did);
    await updateDoc(docRef,{
        Quantity:(await GetQuantityDiscount(did)-1).toString(),
    })
}