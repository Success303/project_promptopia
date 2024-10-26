"use client";

import Profile from "@components/Profile";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const userId = searchParams.get("id").toString();

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    fetchUserPosts();
  }, []);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
