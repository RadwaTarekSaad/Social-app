import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate } from "react-icons/md"

const PostCreation = () => {
     const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const[imagePreview,setImagePreview]=useState(null)
  const imageElement=useRef()
  const captionElement=useRef()

  function handleChangeImage(e){
    // console.log("changed",e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))


  }
  function handleClearImage(){
    setImagePreview(null)
    imageElement.current.value=" "
  }

  function  handleCreatePost(){
    const postObj=new FormData();
    if(captionElement.current.value){
        postObj.append('body',captionElement.current.value)

    }
    if(imageElement.current.value){
        postObj.append('image',imageElement.current.files[0])

    }
   
    return axios.post("https://route-posts.routemisr.com/posts",postObj,{
        headers:{
            token:localStorage.getItem("token")
        }
    })
  }

const queryClient=useQueryClient()
const{data,isPending,isError,isSuccess,mutate}=  useMutation({
    mutationFn: handleCreatePost,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["posts"],exact:true})


        toast.success('post created successfully',{autoClose:2000,closeOnClick:true})
    },
    onError:(error)=>{
        toast.success('error occurred',{autoClose:2000,closeOnClick:true})
    },
    onSettled:()=>{}
  })
  return (
    <>
      {/* CARD */}
      <div className="card bg-blue-300 shadow-md p-4 my-2">
        <div className="flex items-center gap-3">
          
          {/* Avatar */}
          <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                </div>
              </div>
           {/* Fake input */}
          <div
            onClick={() => setOpen(true)}
            className="bg-base-200 cursor-pointer w-full p-3 rounded-full text-sm text-gray-400 hover:bg-base-300"
          >
            What's on your mind?
          </div>

        </div>
      </div>
       {/* MODAL */}
       {open && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-lg">

            {/* HEADER */}
            <h3 className="font-bold text-lg text-center">
              Create Post
            </h3>

            {/* USER INFO */}
            <div className="flex items-center gap-2 mt-4">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                </div>
              </div>
              <h2 className="font-semibold">Radwa</h2>
            </div>

            {/* TEXTAREA */}
            <textarea
            ref={captionElement}
              className="textarea textarea-bordered w-full mt-3"
              placeholder="What's on your mind, Radwa?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* image preview should be rendered when image uploaded */}
        { imagePreview &&  <div className="relative mt-4">
             <img
  src={imagePreview}
  className="rounded-lg w-full"
  alt="preview"
/>

              <IoCloseCircleOutline
                onClick={handleClearImage}
                className="absolute top-2 right-2 text-white text-2xl cursor-pointer"
              />
            </div>
}
            {/* FOOTER */}
            <div className="modal-action flex  items-center">
<label>
     <MdOutlineAddPhotoAlternate  className='cursor-pointer text-2xl text-blue-500' />
    <input type="file" hidden ref={imageElement} onChange={handleChangeImage} />
</label>


               
                    
             
              <button
                className="btn"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

              <button
                className={`btn btn-primary ${!text.trim() && "btn-disabled"}`}
                disabled={isPending}
                onClick={() => {
                 mutate();
                  setOpen(false);
                  setText("");
                }}
              >
                Post
              </button>

             
            </div>

          </div>
        </dialog>
      )}
    </>
  );
}
    
    
  


export default PostCreation
