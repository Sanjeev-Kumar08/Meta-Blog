import { motion } from "framer-motion";
import Image from "next/image";

export default function PostCard({
  category,
  title,
  User,
  date,
  featuredImage,
  onClick,
}) {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  const formattedDate = formatDate(date);

  return (
    <motion.button
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="group grid grid-cols-1 max-h-[488px] h-full max-w-[392px] w-full"
    >
      <div
        className="group grid grid-cols-1 max-h-[488px] h-full max-w-[392px] w-full border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-black/50 transition-all duration-50 gap-[16px] p-4"
        onClick={onClick}
      >
        <div className="rounded-lg h-[240px] w-full overflow-hidden">
          {/* <img
            alt="featured image"
            src={featuredImage}
            className="rounded-md w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500"
          /> */}
          <Image
            alt="featured image"
            src={featuredImage}
            className="rounded-md w-full h-full object-cover group-hover:scale-[1.05] transition-all duration-500"
            width={500}  
            height={500}
            priority
          />
        </div>

        <div className="p-[4px] grid grid-cols-1 gap-3 font-worksans font-bold not-italic">
          <div className="cursor-pointer bg-fadedBlueBackground w-fit max-h-fit rounded-lg">
            <p className="px-3 py-1 text-[14px] h-fit text-blue font-worksans font-medium">
              {category}
            </p>
          </div>
          <div className="text-left">
            <h3 className="text-[24px] text-boldTextcolor dark:text-white font-worksans font-semibold leading-tight">
              {title}
            </h3>
          </div>
          <div className="text-[#97989F] flex items-center gap-[12px] text-center sm:text-[16px] font-worksans font-normal">
            <Image
              alt="user image"
              src={User?.profilePic}
              className="h-[36px] w-[36px] rounded-[28px]"
              height={36}
              width={36}
            />
            <p>{User?.name}</p>
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
