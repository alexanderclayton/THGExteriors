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
    <div>
      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" className='border'/>
      <label>Email</label>
      <input type="email" name="user_email" className='border'/>
      <label>Message</label>
      <textarea name="message" className='border'/>
      <input type="submit" value="Send" />
    </form>
    </div>
  )
}
