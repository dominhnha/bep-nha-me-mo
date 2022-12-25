import {db} from '../../Firebase__config'
import { addDoc, collection, doc, getDoc, updateDoc} from "firebase/firestore";


const CollectionName = "PurchaseHistory"

export const AddPurchaseHistory = async(uid,uPid,PurchaseHistory)=>{
    const colRef = collection(db, CollectionName);
    const PurDoc = await addDoc(colRef,PurchaseHistory);
    const docPur = await doc(db,"PurchaseHistory",PurDoc.id);
    
    await updateDoc(docPur,{
        Uid:uid,
    })
    
    
}

//get PurchaseHistory by user
export const GetPurchaseHistoryByUser = async(uid)=>{

}