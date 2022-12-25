import {  arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../Firebase__config'
import { GetAllProduct, GetNameProduct } from '../Product/Product'


const CollectionName = "RevenuePerMonth"
const Now = new Date(Date.now());
const Month = Now.toLocaleString("en", { month: "long" });
const Year = Now.getFullYear();
const subName = Month + " " + Year;
const revID = "oZaVDRFI6OBiZvDs4I9W";
const subID = Month + Year;
const docRef = doc(db, CollectionName, revID, subName, subID);
/*
Add RevenuePerMonth
*/

export const AddRevenuePerMonth = async () => {

    const newRev = {
        Item: [],
        TotalQuantitySold: ""
    }

    function surprise() {
        (function loop(AddRevenuePerMonth) {
            var now = new Date();
            if (now.getDate() === 1 && now.getHours() === 0 && now.getMinutes() === 0) {
                setDoc(docRef, newRev);
            }
            now = new Date();                  // allow for time passing
            var delay = 60000 - (now % 60000); // exact ms to next minute interval
            setTimeout(loop, delay);
        })();
    }
    return surprise();
}
export const AddProductToRevenue = async (pid, quantity) => {
    const NameProduct = await GetNameProduct(pid);
    const initProduct = {
        NameProduct: NameProduct,
        QuantitySold: quantity,
        Pid: pid
    }
    await updateDoc(docRef, {
        Item: arrayUnion(initProduct)
    });

    const docSnap = await getDoc(docRef);
    let QuantitySold = 0;
    for (let i = 0; i < docSnap.data().Item.length; i++) {
        if (docSnap.data().Item[i].QuantitySold === 0) {
            await updateDoc(docRef, {
                Item: arrayRemove(
                    docSnap.data().Item[i]
                )
            })
        }
        else {
            QuantitySold += docSnap.data().Item[i].QuantitySold
        }
    }
    await updateDoc(docRef, {
        QuantitySold: QuantitySold
    })
}

export const RevenuePerMonth = async () => {
    const docsSnap = await getDocs(collection(db, "PurchaseHistory"))
    const ListPurchase = [];
    const month = Now.getMonth() + 1;
    const year = Now.getFullYear();
    docsSnap.forEach(doc => {
        ListPurchase.push({
            PurId: doc.id,
            Month: doc.data().DayPurchased.toDate().getMonth() + 1,
            Year: doc.data().DayPurchased.toDate().getFullYear(),
            Item: doc.data().Item
        })
    })
    const ListProduct = await (await GetAllProduct()).payload;
    const ListItem = [];
    for (let i = 0; i < ListPurchase.length; i++) {
        if (month === ListPurchase[i].Month && year === ListPurchase[i].Year) {
            ListItem.push(ListPurchase[i].Item);
        }
    }
    const flatValues = ListItem.reduce((total, value) => {
        return total.concat(value);
    }, []);

    for (let i = 0; i < ListProduct.length; i++) {
        let total = 0;
        for (let j = 0; j < flatValues.length; j++) {

            if (ListProduct[i].Pid === flatValues[j].pid) {
                total += flatValues[j].quantity
            }

        }
        await AddProductToRevenue(ListProduct[i].Pid, total);

    }
}

export const GetQuantitySoldProductOrMonth = async (pid, month, year) => {
    try{
        if (month >= 1 && month <= 12) {
            const date = new Date(year, month - 1);
            const dateM = date.toLocaleString("en", { month: "long" });
            const dateY = date.getFullYear();
            const querySubNameID = dateM + dateY;
            const querySubName = dateM + " " + dateY;
            const docRefQuan = doc(db, CollectionName, revID, querySubName, querySubNameID);
            const docSnap = await getDoc(docRefQuan);
            if (docSnap.exists()) {
                console.log("2",docSnap.data())
                let total = 0;
                docSnap.data().Item.map(item=>{
                    if(item.Pid === pid){
                        total += item.QuantitySold;
                    }
                })

                return {
                    success: true,
                    payload: total
                }
            }
            else {
                return {
                    success: false,
                    payload: "No such document!"
                }
            }
    
        }
        else {
            return {
                success: false,
                payload: ""
            }
        }
        return {
            success: false,
            payload: 0
        }
    }catch(err){
        console.log(err);
    }
    
}
// get total number 
export const GetTotalQuantitySoldOrMonth = async (month, year) => {
    if (month >= 1 && month <= 12) {
        const date = new Date(year, month - 1);
        const dateM = date.toLocaleString("en", { month: "long" });
        const dateY = date.getFullYear();
        const querySubNameID = dateM + dateY;
        const querySubName = dateM + " " + dateY;
        const docRefQuan = doc(db, CollectionName, revID, querySubName, querySubNameID);
        const docSnap = await getDoc(docRefQuan);
        if (docSnap.exists()) {
            return {
                success: true,
                payload: docSnap.data().QuantitySold
            }
        }
        else {
            return {
                success: false,
                payload: 0
            }
        }
    }
    else {
        return {
            success: false,
            payload: 0
        }
    }
}

// get all infomation in month
export const GetRevenuePerMonth = async (month, year) => {
    if (month >= 1 && month <= 12) {
        const date = new Date(year, month - 1);
        const dateM = date.toLocaleString("en", { month: "long" });
        const dateY = date.getFullYear();
        const querySubNameID = dateM + dateY;
        const querySubName = dateM + " " + dateY;
        const docRefQuan = doc(db, CollectionName, revID, querySubName, querySubNameID);
        const docSnap = await getDoc(docRefQuan);
        if (docSnap.exists()) {
            return {
                success: true,
                payload: docSnap.data()
            }
        }
        else {
            return {
                success: false,
                payload: "No such document!"
            }
        }
    }
    else {
        return {
            success: false,
            payload: ""
        }
    }
}