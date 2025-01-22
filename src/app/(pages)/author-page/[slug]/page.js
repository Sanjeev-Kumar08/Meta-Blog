"use client";
import BlogList from "@/app/components/Blog-List/BlogList";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/app/components/Loader/Loader";
import Image from "next/image";

export default function page({ params }) {
  const [blogId, setBlogId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const { slug } = await params;
      setBlogId(slug);
    })();
  }, [params]);

  const fetchBlog = async (blogId) => {
    try {
      const response = await fetch(
        `https://tunica-blogs-backend.onrender.com/api/blog/getblog/${blogId}`,
        {
          credentials: 'include'
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch blog post++: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();

      if (data?.blog?.User) {
        setUser(data.blog.User);
        setLoading(false);
      } else {
        console.log("User data is missing in the API response");
      }
    } catch (error) {
      console.error("Error fetching blog post+++", error.message);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchBlog(blogId);
    }
  }, [blogId]);

  if(loading) return <Loader/>
  return (
    <>
      <section className="w-full h-full flex justify-center items-center my-12">
        {/* This is author : {slug} */}
        <div className="max-w-[1216px] w-full h-auto bg-[#F6F6F7] dark:bg-[#323232] rounded-xl flex justify-center items-center p-4 md:p-8">
          <div className="w-full max-w-[668px] h-auto flex flex-col justify-center items-center gap-[24px] text-center">
            <div className="flex justify-center items-center gap-[16px]">
              <div>
                <Image
                  // src="/userIcon.svg"
                  src={user?.profilePic}
                  className="object-contain rounded-full"
                  alt="User Icon"
                  height={64}
                  width={64}
                />
              </div>
              <div className="font-worksans text-center">
                <p className="text-boldTextcolor dark:text-white text-[20px] font-medium">
                  {/* Jonathan Doe */}
                  {user?.name}
                </p>
                <p className="text-greydark:text-white text-[14px] font-normal">
                  {/* Collaborator & Editor */}
                  {user?.designation}
                </p>
              </div>
            </div>

            <p className="text-paraTextColor dark:text-white text-[18px] font-worksans break-words">
              {user?.bio
                ? user?.bio
                : `Meet Jonathan Doe, a passionate writer and blogger with a love for
              technology and travel. Jonathan holds a degree in Computer Science
              and has spent years working in the tech industry, gaining a deep
              understanding of the impact technology has on our lives.`}
            </p>

            <div className="flex justify-center items-center gap-[8px]">
              <Link
                href={
                  user?.socialLinks?.facebook ? user?.socialLinks?.facebook : ""
                }
              >
                <div className="h-[32px] w-[32px] bg-grey rounded-md flex justify-center items-center cursor-pointer">
                  <Image src="/logo-facebook.svg" alt="Facebook Logo" width={16} height={12}/>
                </div>
              </Link>
              <Link
                href={
                  user?.socialLinks?.twitter ? user?.socialLinks?.twitter : ""
                }
              >
                <div className="h-[32px] w-[32px] bg-grey rounded-md flex justify-center items-center cursor-pointer">
                  <Image src="/logo-twitter.svg" alt="Twitter Logo" width={16} height={12}/>
                </div>
              </Link>

              <Link
                href={
                  user?.socialLinks?.instagram
                    ? user?.socialLinks?.instagram
                    : ""
                }
              >
                <div className="h-[32px] w-[32px] bg-grey rounded-md flex justify-center items-center cursor-pointer">
                  <Image src="/logo-instagram.svg" alt="Instagram Logo" width={16} height={12}/>
                </div>
              </Link>

              <Link
                href={
                  user?.socialLinks?.linkedin ? user?.socialLinks?.linkedin : ""
                }
              >
                <div className="h-[32px] w-[32px] bg-grey rounded-md flex justify-center items-center cursor-pointer">
                  <Image src="/logo-youtube.svg" alt="YouTube Logo" width={16} height={12}/>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BlogList />
    </>
  );
}
