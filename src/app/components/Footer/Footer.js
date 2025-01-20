export default function Footer() {
  return (
    <footer className="xl:px-52 lg:px-40 font-PlusJakarta bg-gray-100 dark:bg-[#383838] py-10 px-6 mt-10 w-[1,216px]">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-gray-300 pt-8">
        {/* About Section */}
        <div className="dark:text-white">
          <h3 className="font-semibold text-[18px] mb-4 text-boldTextcolor dark:text-white">About</h3>
          <p className="text-grey dark:text-white mb-4 text-[16px] font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
          <p className="text-grey dark:text-white text-[16px] font-normal">
            <span className="font-semibold text-boldTextcolor dark:text-white">Email</span> : info@jstemplate.net
          </p>
          <p className="text-grey dark:text-white">
            <span className="font-semibold text-boldTextcolor dark:text-white">Phone</span> : 880 123 456 789
          </p>
        </div>

        {/* Quick Links & Categories */}
        <div className="flex justify-evenly">
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[18px] text-boldTextcolor dark:text-white mb-4">Quick Link</h3>
            <ul className="font-PlusJakarta space-y-2 text-grey dark:text-white font-normal text-[16px]">
              <li>Home</li>
              <li>About</li>
              <li>Blog</li>
              <li>Archived</li>
              <li>Author</li>
              <li>Contact</li>
            </ul>
          </div>
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-[18px]  mb-4">Category</h3>
            <ul className="space-y-2 text-grey dark:text-white">
              <li>Lifestyle</li>
              <li>Technology</li>
              <li>Travel</li>
              <li>Business</li>
              <li>Economy</li>
              <li>Sports</li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white p-[32px] rounded-lg font-worksans">
          <h3 className="font-semibold text-[20px]  mb-4 dark:text-black">
            Weekly Newsletter
          </h3>
          <p className="text-grey mb-4 dark:text-black">
            Get blog articles and offers via email
          </p>
          <form className="space-y-4">
            <div className="relative w-full">
              {/* Input Field */}
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue dark:text-black"
                required
              />
              {/* Envelope Icon */}
              <img
                alt="mailbox icon"
                src="/mailboxIcon.svg"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              />
            </div>
            <button
            aria-label="Subscribe"
              type="submit"
              className="w-full bg-blue text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-gray-300 mt-8 pt-4 text-sm text-gray-500 dark:text-white font-PlusJakarta font-normal text-[16px]">
        <div className="flex justify-center items-center gap-2">
          <div>
            <img alt="Meta Blog" src="/Union.svg" className="h-[45px] dark:bg-white rounded-3xl dark:border-none" />
          </div>
          <div className="flex flex-col">
            <p className="text-lg text-boldTextcolor dark:text-white text-[20px] font-normal">
              <span className="tracking-wider">
                Meta
                <span className="font-extrabold">
                  {""}
                  Blog
                </span>
              </span>
            </p>
            <p>© JS Template 2023. All Rights Reserved.</p>
          </div>
        </div>
        {/* <p>Terms of Use · Privacy Policy · Cookie Policy</p> */}
        <div className="flex gap-2 flex-row">
            <p>Terms of Use</p>
            <p>· Privacy Policy</p>
            <p>· Cookie Policy</p>
        </div>
      </div>
    </footer>
  );
}
