"use client";
import { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setBlogPosts } from "@/app/store/blogPostsSlice";

function BlogList() {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const [visiblePosts, setVisiblePosts] = useState(6);

  const isBlogsAvailable = useSelector(
    (state) => state.reduxBlogPosts.blogsAlreadyExist
  );
  const blogs = useSelector((state) => state.reduxBlogPosts.blogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://tunica-blogs-backend.onrender.com/api/blog/getblogs",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const blogs = await response?.json();
        dispatch(setBlogPosts(blogs)); // send all blogs to redux
      } catch (error) {
        console.log("Error fetching blogs:", error?.message);
      }
    };

    if (!isBlogsAvailable) {
      fetchBlogs();
    }
  }, []);

  const loadMorePosts = (pathName, length) => {
    if (pathName === "/") {
      setVisiblePosts(length);
    } else {
      setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 3);
    }
  };

  const getSingleBlog = (id) => {
    router.push(`/single-post/${id}`);
  };

  if (!isBlogsAvailable) {
    return (
      <>
        <Loader source={"blogList"} className={""}/>
      </>
    );
  }
  return (
    <section
      className={`w-full h-full flex justify-center items-center ${
        pathName === "/" ? "sm426:mt-[80px]" : null
      }`}
    >
      <div className="w-[1216px] flex flex-col gap-[20px]">
        <h3 className="text-[24px] text-boldTextcolor dark:text-white font-worksans font-bold p-2">
          {pathName === "/blog" ? "" : "Latest Post"}
        </h3>
        <div className="flex flex-col gap-6 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center p-2">
            {blogs?.slice(0, visiblePosts).map((blog) => {
              return (
                <PostCard
                  key={blog.id}
                  title={blog.title}
                  category={blog.category}
                  author={blog.author}
                  date={blog.createdAt}
                  featuredImage={blog.image}
                  User={blog.User}
                  onClick={() => getSingleBlog(blog.id)}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-center">
            <div className="border border-[#696A754D] text-[#696A75] text-[16px] font-worksans font-medium inline-block rounded-lg hover:bg-gray-200 hover:border-gray-200 cursor-pointer">
              <button
                aria-label="View Post"
                className="h-[48px] w-[142px]"
                onClick={() => loadMorePosts(pathName, blogs?.length)}
              >
                {pathName === "/" ? "View All Post" : "Load More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogList;
