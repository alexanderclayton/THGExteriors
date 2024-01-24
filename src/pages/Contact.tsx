//import//
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current !== null) {
      emailjs
        .sendForm(
          "service_41ujjab",
          "template_965u3gf",
          form.current,
          "kJthuFNYVpXF8bJnA",
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          },
        );
    }
  };

  return (
    <div className="flex justify-center">
      <form ref={form} onSubmit={sendEmail} className="flex w-[60%] flex-col">
        <label className="font-bold">Name:</label>
        <input type="text" name="user_name" className="w-[50%] border" />
        <label className="font-bold">Email:</label>
        <input type="email" name="user_email" className="w-[50%] border" />
        <label className="font-bold">Message:</label>
        <textarea name="message" className="border" />
        <input
          type="submit"
          value="Send"
          className="mt-4 w-[25%] rounded-lg border border-slate-300 bg-green-300 py-3 hover:cursor-pointer"
        />
      </form>
    </div>
  );
};
