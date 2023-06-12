import {
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut ,
    signInWithCustomToken,
    signInWithPopup,
    GoogleAuthProvider
   } from "firebase/auth";

import {auth} from '../../Firebase__config' 

// Sign Up website by email and password
export const AddUserAuthencation = async(user) =>{
    try{
        const {email, password} = user; // 
        
        const data = await createUserWithEmailAndPassword( auth, email, password) .then((userCredential) => {
            // Signed in 
            const user = userCredential.user.uid;
            return {
                success: true,
                payload:user,
            }
          })
          .catch((error) => {
            return {
                success: false,
                payload:error,
            }
          });
          return data;
        
    }catch(errors){
        return {
            success: false,
            payload:errors,
        }
    }
}
// Sign Ip website by email and password
 export const SiginUserAuthencation = async(user)=>{
    const {email, password} = user;
    const data = await signInWithEmailAndPassword( auth, email, password) .then((userCredential) => { 
        const user = userCredential.user;
        return {
            success: true,
            payload:user,
        }
      })
      .catch((error) => {
        return {
            success: false,
            payload:error,
        }
      });
      return data;
}

export const SignOut = async()=>{
    signOut(auth).then(() => {
        return {
            success: true,
            payload:"Sign-out successful",
        }
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      return {
        success: false,
        payload:error,
    }
    });
}

export const GoogleSignIn = async()=>{
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        return user;
        
      })
    return {
        success: true,
        payload:user,
    }
}

