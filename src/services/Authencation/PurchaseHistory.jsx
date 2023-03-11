import {db} from '../../Firebase__config'
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";


const CollectionName = "PurchaseHistory"
const colRef = collection(db, CollectionName);
export const AddPurchaseHistory = async(uid,uPid,PurchaseHistory)=>{
    await setDoc(doc(db,CollectionName, uPid),PurchaseHistory)
    await updateDoc(doc(db,CollectionName, uPid),{
        Uid:uid,
    })
}

//get PurchaseHistory by user
export const GetPurchaseHistoryByUser = async(uid)=>{
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

//GetAllPurchaseHistory

export const GetAllPurchaseHistory = async()=>{
    const ListPur = [];
    const docsSnap = await getDocs(colRef)
    docsSnap.forEach(doc=>{
        ListPur.push({
            PurID: doc.id,
            Info:doc.data()
        })
    })
    return{
        success: true,
        payload:ListPur
    }

}