import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import PostCreation from '../PostCreation/PostCreation';
import { Helmet } from 'react-helmet';

const Home = () => {

   function getAllPosts(){
 
return axios.get("https://route-posts.routemisr.com/posts",{
  headers:{
    token:localStorage.getItem("token")
  }
})
   }
  const {isFetching,isLoading,isError,data}= useQuery({
    queryKey:["posts"],
    queryFn:getAllPosts,
    // refetchOnMount:false
    // refetchInterval:1000*60*60*24
    // retry:2,
    // retryDelay:5000
    // staleTime:5000
    // gcTime:5000
    // enabled:false
  })
  console.log(isLoading,"loading");
  console.log(isFetching,"Fetching");
  console.log(isError,"Error");
  console.log(data,"data")



  if(isLoading){
    return(
      <div className='h-screen flex items-center justify-center'>
        <i className='fa-solid fa-spinner fa-7x text-blue-400'></i>      
      
      </div>

    )
  }

  if(isError){
    return(
      <div className='h-screen flex items-center justify-center'>
      <h1 className='text-red-600 text-7xl '>Error</h1>      
      
      </div>

    )
  }


  

 
  return (
<>



 <div className='w-full md:w-[80%] lg:w-[50%] mx-auto my-10 p-5'>
  <Helmet>
            <title>Home page</title>
        </Helmet>
  <PostCreation/>
    
    {data?.data.data.posts.map(function(post,idx){
      return  <Post  key={idx} post={post}  isPostDetails={false} queryKey={["posts"]} />
    })}
     
    </div>


</>
   

     
  )
}

export default Home
