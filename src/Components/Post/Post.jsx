import React from "react";
import PostHeader from "./../postHeader/postHeader";
import PostComment from "./../postComment/postComment";
import CreateComment from "../CreateComment/CreateComment";

const Post = ({ post, isPostDetails ,queryKey }) => {
  return (
    <div className="bg-slate-700 p-5 rounded-xl mb-5">
      {/* post header */}
      <PostHeader
        userName={post.user.name}
        createAt={post.createdAt}
        userImg={post.user?.photo}
        postUserId={post.user._id}
        postId={post.id}
        cardType="post"
      />
     

      {/* content */}
      <div className="content my-6">
        <p className="mb-5 text-center text-amber-50">{post?.body}</p>
        <p className="mb-5 text-center text-amber-50">{post?.id}</p>
        <img className="w-full" src={post?.image} />
      </div>

      {/* post a comment */}

      {post.comments?.length > 0 && isPostDetails == false ? (
        <>
          <link
            className="block text-center text-blue-500"
            to={`/postDetails/${post.id}`}
          >
            view post details
          </link>
          <PostComment
            commentBy={post.topComment.commentCreator?.name}
            createAt={post.topComment.createdAt}
            userCommentImg={post.topComment.commentCreator?.photo}
            comment={post.topComment?.content}
            userCardId={post.user._id}
          />
           <CreateComment  id={post.id}  queryKey={queryKey} />
        </>
      ) : (
     ""
      )}

       {post.comments?.length > 0 && isPostDetails == true ? (
      <>
           <CreateComment  id={post.id} />
    {post.comments?.map(function (comment,idx){return <>
   

        <PostComment
      key={idx}
          commentBy={comment.topComment.commentCreator?.name}
          createAt={comment.topComment.createdAt}
          userCommentImg={comment.topComment.commentCreator?.photo}
          comment={comment.topComment?.content}
        />
      
      
      
      </>})
    }
      </>
       
     
      ) : (
        ""
      )   
       }

       {post.comments? " " :<div className="text-red-700">No Comment</div>  }





    </div>
  );
};

export default Post;
