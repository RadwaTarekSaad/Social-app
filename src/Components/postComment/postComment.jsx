import React from 'react'

const PostComment = ({commentBy,createAt,userCommentImg,comment,userCardId}) => {
  return (
    <>
     <div className='comment p-5'>
      <div className='border-2 border-slate-200/25 bg-slate-400 p-3 rounded-lg'>
       <div className='flex items-center justify-between' >
           {/* picture&paragraph */}
          <div className='flex items-center'>
            {/* picture */}
            
              <div className="avatar  rounded-full me-2">
  <div className="w-24 rounded-full">
    <img className='rounded-full' src={userCommentImg.includes("undefined")? "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg?semt=ais_hybrid&w=740&q=80":userCommentImg}/>
  </div>
</div>
         
            {/* paragraph */}
            <div>
              <h6 className='text-amber-50'>{commentBy}</h6>
              <p className='text-amber-50' >{createAt}</p>
            </div>

          </div>


          <div>
<i className="fa-solid fa-ellipsis text-amber-50"></i>
          </div>
         </div>

         <p className='my-3 text-amber-50 '>{comment}</p>

      </div>

    </div>

    </>
  )
}

export default PostComment
