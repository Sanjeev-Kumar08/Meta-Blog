"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/app/components/Loader/Loader";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageSending, setMessageSending] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageSending(true);
    const data = { name, email, message };
    console.log("Form submitted:", data);

    try {
      const response = await fetch(
        "https://tunica-blogs-backend.onrender.com/api/auth/contact-us",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message
          })
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("DATA:::", data);
        setName("");
        setEmail("");
        setMessage("");
        setMessageSending(false);
        setIsMessageSent(true);
        setMessageSending(false);

        setTimeout(() => {
          setIsMessageSent(false);
        }, 5000);
      }
    } catch (error) {
      setMessageSending(false);
      console.error("ERROR:", error);
    }
  };

  return (
    <section className="w-full min-h-screen py-12 px-6 sm:px-8 lg:px-24 font-worksans">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 dark:text-[#ffffff]">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-[#ffffff] ">
            Have any questions or inquiries? Feel free to reach out to us.
          </p>
        </div>

        <div className="mt-8">
          {/* Invalid Password */}

          {isMessageSent ? (
            <div className="flex justify-center items-center">
              <div
                className="max-w-fit flex items-center justify-center gap-2 font-worksans p-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-lg"
                role="alert"
              >
                <p>Message Sent Successfully.</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => setIsMessageSent(false)}
                  className="cursor-pointer mt-[1px]"
                />
              </div>
            </div>
          ) : null}
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white dark:bg-[#383838]  p-8 rounded-lg shadow-md space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-900 dark:text-[#ffffff] font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // required
                  className="dark:bg-slate-700 dark:border-slate-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-gray-900 dark:text-[#ffffff] font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // required
                  className="dark:bg-slate-700 dark:border-slate-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-gray-900  dark:text-[#ffffff] font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                // required
                className="dark:bg-slate-700 dark:border-slate-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                rows="6"
                placeholder="Write your message here"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                aria-label="Sign in"
                className="w-full bg-[#162D3A] dark:bg-blue text-center px-3 py-2 rounded-xl text-[#FFFFFF] text-[20px] font-Roboto"
              >
                {messageSending ? (
                  <Loader source={"contact"} className={"h-[30px] w-[30px]"} />
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-[#ffffff]">
            Our Contact Info
          </h3>
          <p className="mt-4 text-lg text-gray-600 dark:text-[#ffffff]">
            Feel free to reach out to us directly at the following:
          </p>
          <div className="mt-6">
            <p className="text-lg text-gray-800 dark:text-[#ffffff]">
              📧 Email: abc@gmail.com
            </p>
            <p className="text-lg text-gray-800 dark:text-[#ffffff]">
              📞 Phone: +1 234 567 890
            </p>
            <p className="text-lg text-gray-800 dark:text-[#ffffff]">
              📍 Address: Sunny Side Park, Solan, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
