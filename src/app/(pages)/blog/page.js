"use client";
import Link from "next/link";
import BlogList from "@/app/components/Blog-List/BlogList";
import Image from "next/image";

export default function page() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-0 pb-8 lg:px-52 font-worksans">
        <h2 className="text-[30px] font-semibold text-boldTextcolor dark:text-white">
          Page Title
        </h2>
        <div className="flex justify-center items-center gap-3">
          <Link
            href={"/"}
            className="text-[#3B3C4A] text-[16px] font-normal dark:text-white"
          >
            Home
          </Link>
          <hr className="border border-[#E8E8EA] h-5" />
          <Link
            href={"/"}
            className="text-[#696A75] text-[16px] font-normal dark:text-white"
          >
            Link One
          </Link>
        </div>
      </div>
      
      <div className="flex justify-center items-center">
        <div className="w-[1216px] h-[450px] flex justify-center items-center m-4 rounded-lg overflow-hidden mb-10 font-worksans">
          <div className="item-container w-full h-[450px] relative bg-red-100 overflow-cover">
          <Image src="/Image.svg" alt="title card"  fill priority className="rounded-lg object-cover"/>
            {/* <img
              alt="Featured Image"
              src="/Image.svg"
              className="rounded-lg w-full h-full object-cover"
            /> */}
            <div className="absolute max-w-full md:max-w-[49vw] z-10 border-black text-white bottom-0 left-0 sm375:px-6 sm375:py-4 py-2">
              <div className="border-black flex flex-col gap-3 w-full rounded-[10px] p-[10px] justify-center">
                <p className="bg-blue rounded-md w-[fit-content] px-2 py-1 sm:text-[14px] sm375:text-[10px] text-[12px]">
                  Technology
                </p>
                <p className="sm375:text-[15px] sm:text-lg md:text-[22px] lg:text-[32px] lg:leading-9 font-semibold dark:text-white text-left text-[16px]">
                  The Impact of Technology on the Workplace: How Technology is
                  Changing
                </p>
                <div className="flex items-center text-center text-[16px] lg:gap-[20px] sm375:gap-[10px] gap-2">
                  <img
                    alt="User Icon"
                    src="/userIcon.svg"
                    className="h-6 sm375:h-[36px] w-[36px]"
                  />
                  <p className="font-medium">Jason Francisco</p>
                  <p className="font-normal">August 20, 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlogList />
    </>
  );
}
