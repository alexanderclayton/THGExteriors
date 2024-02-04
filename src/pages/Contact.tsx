import { useRef, useState } from "react";
import { sendEmail } from "../helpers";

export const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  return (
    <div className="flex justify-center bg-gray-100 py-8">
      {submitSuccess && (
        <h2>Your message has been sent. We'll be in touch soon!</h2>
      )}
      {!submitSuccess && (
        <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Contact Us
          </h2>
          <form
            ref={form}
            onSubmit={(e) =>
              sendEmail(
                e,
                form,
                setEmailError,
                setIsSubmitting,
                setSubmitSuccess,
              )
            }
          >
            <div className="mb-4">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                className="mt-1 block h-12 w-full rounded-md border border-gray-300 pl-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="user_email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                className={`mt-1 block h-12 w-full rounded-md border border-gray-300 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  emailError && "border-red-500"
                } placeholder-gray-400`}
                placeholder="Enter your email"
                required
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-500">{emailError}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className=" mt-1 block h-32 w-full rounded-md border border-gray-300 px-3 py-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || submitSuccess}
              className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
                isSubmitting || submitSuccess
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
            >
              {isSubmitting ? "Sending..." : submitSuccess ? "Sent!" : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
