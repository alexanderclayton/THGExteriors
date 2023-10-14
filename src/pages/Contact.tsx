//import//
import { useRef } from 'react'
import emailjs from '@emailjs/browser'

export const Contact = () => {
  const form: any = useRef()

  const sendEmail = (e: any) => {
    e.preventDefault()

    emailjs.sendForm('service_41ujjab', 'template_965u3gf', form.current as any, 'kJthuFNYVpXF8bJnA')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }
  return (
    <div className='flex justify-center'>
      <form ref={form} onSubmit={sendEmail} className='flex flex-col w-[60%]'>
      <label className='font-bold'>Name:</label>
      <input type="text" name="user_name" className='border w-[50%]'/>
      <label className='font-bold'>Email:</label>
      <input type="email" name="user_email" className='border w-[50%]'/>
      <label className='font-bold'>Message:</label>
      <textarea name="message" className='border'/>
      <input type="submit" value="Send" className='bg-green-300 w-[25%] mt-4 py-3 border-slate-300 border rounded-lg hover:cursor-pointer'/>
    </form>
    </div>
  )
}
