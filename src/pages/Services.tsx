//import//
import { useNavigate } from 'react-router-dom'
import Placeholder from '../assets/THG Small (2).png'

export const Services = () => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-around items-center h-screen'>
        <div className="bg-blue-200 w-[25%] flex flex-col items-center rounded-2xl p-8 hover:cursor-pointer">
            <img src={Placeholder} alt="placeholder" className=''/>
            <h1 className='font-bold text-3xl'>Painting</h1>
        </div>
        <div className="bg-blue-200 w-[25%] flex flex-col items-center rounded-2xl p-8 hover:cursor-pointer">
            <img src={Placeholder} alt="placeholder" className=''/>
            <h1 className='font-bold text-3xl'>Exteriors [placeholder]</h1>
        </div>
        <div className="bg-blue-200 w-[25%] flex flex-col items-center rounded-2xl p-8 hover:cursor-pointer" onClick={() => navigate("/holiday-heroes")}>
            <img src={Placeholder} alt="placeholder" className=''/>
            <h1 className='font-bold text-3xl'>Christmas Lights <span className='text-xl'>by Holiday Heroes</span></h1>
        </div>
    </div>
  )
}
