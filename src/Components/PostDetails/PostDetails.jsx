import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'

const PostDetails = () => {
    const {id} = useParams();

    function getSinglePost(){
        return axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })

    }

    const{data,isError,isLoading}=useQuery({
        queryKey:["post",id],
        queryFn:getSinglePost
    })


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
    
     <Post   post={data?.data.post} isPostDetails={true} queryKey={["post",id]}/>
   
    </div>

    </>
  )
}

export default PostDetails
