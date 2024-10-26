"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={() => handleTagClick(post.tag)}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search States
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchAllPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  const filteredPosts = (searchTerm) => {
    const searchRegex = new RegExp(searchTerm, "i");
    return allPosts.filter(
      (post) =>
        searchRegex.test(post.tag) ||
        searchRegex.test(post.creator.username) ||
        searchRegex.test(post.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filteredPosts(e.target.value);
        setSearchResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResults = filteredPosts(tag);
    setSearchResults(searchResults);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchResults.length ? searchResults : allPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
