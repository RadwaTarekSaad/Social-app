import React, { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { authContext } from "../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const PostHeader = ({ userName, createAt, userImg, postUserId,postId,cardType }) => {
  const { userId,token } = useContext(authContext);
  const isThisCardIsMine = postUserId === userId;
  const endPoint=cardType === 'post'? "posts" :"comments";
  function handleDeleteCard() {
return axios.delete(`https://route-posts.routemisr.com/${endPoint}/${postId}`,{
headers:{
    token:token
}
 })
  }
const queryClient =useQueryClient()
  const{isPending,isError,mutate:handleDeleteMutation}=useMutation({
    mutationFn: handleDeleteCard,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["posts"]})
        toast.success('post created successfully',{autoClose:2000,closeOnClick:true})
    },
    onError:()=>{
       toast.success('error occurred while deleting post',{autoClose:2000,closeOnClick:true})
    }

  })
  return (
    <>
      <div className="postHeader ">
        <div className="flex items-center justify-between">
          {/* picture&paragraph */}
          <div className="flex items-center">
            {/* picture */}

            <div className="avatar  rounded-full me-2">
              <div className="w-24 rounded-full">
                <img className="rounded-full" src={userImg} />
              </div>
            </div>

            {/* paragraph */}
            <div>
              <h6 className="text-amber-50">{userName}</h6>
              <p className="text-amber-50">{createAt}</p>
            </div>
          </div>

          {isThisCardIsMine && (
            <div  disabled={isPending} className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm text-white"
              >
                <BsThreeDotsVertical />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
              >
                <li>
                  <button  onclick={handleDeleteMutation} className="flex gap-2">
                    🗑️ Delete
                  </button>
                </li>
                <li>
                  <button className="flex gap-2">✏️ Edit</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostHeader;
