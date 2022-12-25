import React from 'react';
import { v4 } from 'uuid';
import Grid from '../Grid/Grid';
import ComponentLoading from '../LoadingSkeleton/ComponentLoading/ComponentLoading';
import ProductCand from '../ProductCand/ProductCand';

const Posts = ({ posts}) => {
    console.log(posts)
  return (
    <Grid
        col={4}
        mdCol={2}
        smCol={1}
        gap={10}
    >
        {
            posts
            ? posts.map(item=>{
                return(
                <ProductCand
                    key={item.Pid}
                    Pid={item.Pid}
                    Name={item.Info.NameProduct}
                    Description={item.Info.DescriptionProduct}
                    Image={item.Info.Image}
                    Price={item.Info.Price}
                    sale={30}
                />
                )
            })
            : Array(8)
            .fill(0)
            .map(item=>{
                 return(
                <ComponentLoading key={v4()}/>
                )
            })
            }
    </Grid>
    
  );
};

export default Posts;