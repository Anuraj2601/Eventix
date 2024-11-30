import axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Upcoming from "../../components/Upcoming";
import Feedback from "../../components/Feedback";
import RegistrationModal from "../../components/RegistrationModal";
import PostService from "../../service/PostService";
import UsersService from "../../service/UsersService";
import LikeButton from "../../components/LikeButton";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserForPosts = async (posts) => {
    try {
      const token = localStorage.getItem("token");
      const postsWithUsers = await Promise.all(
        posts.map(async (post) => {
          try {
            const response = await UsersService.getUserById(post.published_user_id, token);
            return {
              ...post,
              userImage: response.users.photoUrl,
              likes: Math.floor(Math.random() * 500) + 1,
            };
          } catch {
            return {
              ...post,
              userImage: "default-image.jpg",
              likes: Math.floor(Math.random() * 500) + 1,
            };
          }
        })
      );
      setPosts(postsWithUsers);
    } catch (error) {
      console.error("Error fetching user details for posts", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await PostService.getAllPosts(token);
        const approvedPosts = response.content.filter((post) => post.post_status === "APPROVED") || [];
        fetchUserForPosts(approvedPosts);
      } catch (error) {
        console.error("Error fetching posts", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const renderPosts = (filteredPosts) => {
    return filteredPosts.map((post, index) => (
      <div
        key={index}
        className="bg-[#0b0b0b] p-10 rounded-2xl mb-8 py-10 custom-3d-shadow"
        style={{
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="flex flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-2 custom-card">
            <img
              src={post.userImage || "default-image.jpg"}
              alt=""
              className="w-11 h-11 rounded-full border-2 border-[#AEC90A]"
            />
            <div className="flex flex-col">
              <p>{post.name}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <p>
            {post.description}
            {post.link && (
              <a
                href={post.link}
                className="text-[#AEC90A] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.link}
              </a>
            )}
          </p>
          {post.post_image && <img src={post.post_image} alt="" className="w-auto h-100 object-cover mt-3" />}
          <LikeButton initialLikes={post.likes} className="absolute bottom-4 right-4" />
        </div>
      </div>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to fetch posts. Please try again later.</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-y-auto">
      {/* Sidebar */}
      <Sidebar className="flex-shrink-0 md:w-1/4" />
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-neutral-900 text-white flex-1 overflow-y-auto">
          {/* Mobile-first layout */}
          <div className="block md:hidden">
            <div className="px-4 mb-6">
              <h2 className="text-lg font-bold mb-4">Upcoming Events</h2>
              <Upcoming />
            </div>
            <div className="px-4 mb-6">
              <h2 className="text-lg font-bold mb-4">Feedback</h2>
              <Feedback className="p-4 bg-[#1c1c1c] rounded-xl" />
            </div>
            <div className="px-4">
              <h2 className="text-lg font-bold mb-4">Posts</h2>
              {renderPosts(posts)}
            </div>
          </div>
          {/* Desktop layout */}
          <div className="hidden md:flex md:flex-row md:gap-4">
            {/* Posts */}
            <div className="w-2/4 px-4 md:px-10">{renderPosts(posts)}</div>
            {/* Sidebar - Upcoming & Feedback */}
            <div className="w-2/4 flex flex-col gap-4 px-4">
              <div className="h-[380px] overflow-y-auto rounded-2xl p-4 bg-[#1c1c1c]">
                <Upcoming />
              </div>
              <div className="flex-1 overflow-y-auto bg-[#1c1c1c] rounded-xl p-6">
                <Feedback />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default Dashboard;
