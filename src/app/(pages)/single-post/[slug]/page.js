"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";
import Image from "next/image";
import Link from "next/link";


export default function page({ params }) {
  const router = useRouter();

  const [blogId, setBlogId] = useState(null);
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);
  const [blogContent, setBlogContent] = useState([]);

  useEffect(() => {
    (async () => {
      const { slug } = await params;
      setBlogId(slug);
    })();
  }, [params]);

  useEffect(() => {
    if (blogId) {
      fetchBlogs(blogId);
    }
  }, [blogId]);

  const fetchBlogs = async (blogId) => {
    try {
      const response = await fetch(
        `https://tunica-blogs-backend.onrender.com/api/blog/getblog/${blogId}`,
        {
          credentials: 'include'
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch blog post: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setBlog(data.blog);
      setBlogContent(data.blog.insideContent);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching blog post:", error.message);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  const BlogCreatedDate = formatDate(blog?.createdAt);
  
  const navigateToUserPage = (url) => {
    router.push(`/author-page/${url}`);
  };

  if (loading) {
    return <Loader/>;
  }
  return (
    <section className="flex flex-col justify-center items-center my-10 pb-5">
      <div className="max-w-[800px] px-4">
        {/* Article Head Container */}
        <div className="text-white dark:text-white font-worksans flex flex-col justify-center gap-[20px] mb-8">
          {/* category */}
          <p className="bg-blue rounded-md w-[fit-content] text-[14px] px-2 py-1 font-medium">
            {/* Technology */}
            {blog.category}
          </p>
          {/* title */}
          <h1 className="text-boldTextcolor dark:text-white text-[36px] font-semibold leading-none">
            {/* The Impact of Technology on the Workplace: How Technology is Changing */}
            {blog?.title}
          </h1>
          {/* author-info */}
          <div
            className="text-grey dark:text-white flex justify-center items-center w-fit gap-[24px] cursor-pointer"
            onClick={() => navigateToUserPage(blogId)}
          >
            <div className="flex justify-center items-center gap-[8px]">
              <img
                alt="user image"
                src={blog.User.profilePic}
                className="h-[28px] w-[28px] rounded-[28px]"
                // height={50}
                // width={50}
              />
              <p>{blog.User.name}</p>
            </div>
            <p>{BlogCreatedDate}</p>
          </div>

          {/* Feature Image Container */}
          <div className="h-[462px]">
            <Image
              alt="blog image"
              src={blog.image}
              className="w-full h-full object-cover rounded-xl"
              width={600}  
              height={600}
            />
          </div>
        </div>

        {/* Article Content Container */}
        <div className="flex flex-col gap-[20px]">
          {blogContent.map((subBlog, index) => {
            return (
              <div
                key={index + 1}
                className="text-paraTextColor dark:text-white flex flex-col gap-[10px]"
              >
                {subBlog.heading ? (
                  <h3 className="font-worksans text-[24px] font-semibold">
                    {subBlog.heading}
                  </h3>
                ) : null}
                {subBlog.images ? (
                  <div className="h-[462px]">
                    <Image
                      alt="image"
                      src={subBlog.images[index]}
                      className="w-full h-full object-cover rounded-xl"
                      width={600}  
                      height={600}
                    />
                  </div>
                ) : null}
                <div className="flex flex-col gap-[20px]">
                  {subBlog.paragraphs.map((para, index) => {
                    return (
                      <p
                        key={index + 1}
                        className="font-paraFont text-[20px] font-normal text-justify"
                      >
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
