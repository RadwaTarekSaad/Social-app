import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const CreateComment = ({id,queryKey}) => {

const [comment,setComment]=useState("")
  const[isLoading,setIsLoading]=useState(false);
async function sendCommentToBe(){
    setIsLoading(true)
    const value={
        content:comment,
        post:id
    };

    

      return axios.post(`https://route-posts.routemisr.com/posts//comments`,value,{
            headers:{
                token:localStorage.getItem("token")
            }
        })

       }

      const{data,isPending,isError,isSuccess,mutate:tanStackCommentCreation} = useMutation({
        mutationFn:sendCommentToBe,
        onSuccess:()=>{
        
            client.invalidateQueries({queryKey:queryKey});
            setComment("")
        },
        
        onError:()=>{},
        onSettled:()=>{}
       })

     const client = useQueryClient()

  return (
    <div className="join !w-full">
  <div className='!w-full'>
    <label className="input validator join-item !w-full">
     
      <input value={comment} onChange={(e)=>setComment(e.target.value)} className='!w-full' type="text" placeholder="comment.." required />
    </label>
    <div className="validator-hint hidden">Enter valid email address</div>
  </div>
  <button  className="btn btn-primary join-item" onClick={tanStackCommentCreation}>{isLoading?<i className='fa-solid fa-spinner fa-spin text-white'></i>  :<i className="fa-solid fa-paper-plane text-white"></i>}</button>
</div>
  )
}

export default CreateComment
