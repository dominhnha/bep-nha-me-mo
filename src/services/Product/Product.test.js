import {expect, jest, test,it} from '@jest/globals';
import {GetProductById} from  '../Product/Product'

import { getFirestore } from "@firebase/firestore";


// describe('firebase testing ', async()=>{
//     // beforeAll(async()=>{
//     //     jest.setTimeout(10000)
//     //     await getFirestore();
//     // })
//     // console.log()
//     // beforeEach(async()=>{
//     //     const product =  await (await GetProductById("QN2QqV40L7rF0FsLqZc5")).success
//     //     expect(true).toBe(product)
//     // })
//     expect(()=>{
//         return true
//     }).toBe(true)

// })
// x
test('two plus two is four', async() => {
    expect(true).toBe(true);
    const getData  = GetProductById("") 
  });

