"use client"
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, like sending the form data to an API
    console.log("Form submitted:", { name, email, message });
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
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white dark:bg-[#383838]  p-8 rounded-lg shadow-md space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-700 dark:text-[#ffffff] font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="dark:bg-slate-700 dark:border-slate-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-gray-700 dark:text-[#ffffff] font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="dark:bg-slate-700 dark:border-slate-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-gray-700  dark:text-[#ffffff] font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="dark:bg-slate-700 dark:border-slate-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                rows="6"
                placeholder="Write your message here"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Send Message
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
            <p className="text-lg text-gray-800 dark:text-[#ffffff]">📞 Phone: +1 234 567 890</p>
            <p className="text-lg text-gray-800 dark:text-[#ffffff]">
              📍 Address: Sunny Side Park, Solan, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
