import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { authContext } from "../Context/AuthContext";
import Post from "../Post/Post";

const Profile = () => {
  const {  userId } = useContext(authContext);

  const getUserPosts = () => {
    return axios.get(
      `https://route-posts.routemisr.com/users/profile-data`,
      {
        headers: { token:localStorage.getItem("token") },
      }
    );
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myPosts", userId],
    queryFn: getUserPosts,
  
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  const posts = data?.data.posts || [];

  return (
    <div className="w-[60%] mx-auto my-10">
      <h2 className="text-2xl mb-5">My Posts</h2>

      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post,idx) => (
          <Post
            key={idx}
            post={post}
            isPostDetails={false}
            queryKey={["myPosts", userId]}
          />
        ))
      )}
    </div>
  );
};

export default Profile;