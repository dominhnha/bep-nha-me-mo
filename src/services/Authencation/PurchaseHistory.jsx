import {db} from '../../Firebase__config'
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";


const CollectionName = "PurchaseHistory"

export const AddPurchaseHistory = async(uid,uPid,PurchaseHistory)=>{
    const colRef = collection(db, CollectionName);
    const PurDoc = await setDoc(doc(db,"PurchaseHistory",uPid),PurchaseHistory);
    
    await updateDoc(doc(db,"PurchaseHistory",uPid),{
        Uid:uid,
    })
    
    
}

//get PurchaseHistory by user
export const GetPurchaseHistoryByUser = async(uid)=>{
    const colRef = collection(db, CollectionName);
    const ListPur = [];
    const ListPurUser = [];
    const docsSnap = await getDocs(colRef)
    docsSnap.forEach(doc=>{
        ListPur.push({
            PurID: doc.id,
            Info:doc.data()
        })
    })
    for(let i=0; i<ListPur.length; i++){
        if(ListPur[i].Info.Uid ===uid){
            ListPurUser.push(ListPur[i])
        }
    }
    return{
        success: true,
        payload:ListPurUser,
    }
}