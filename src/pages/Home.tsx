//import//
import Hero from "../assets/THG Large.png";

export const Home = () => {
  return (
    <div className="flex flex-col justify-center md:flex-row md:items-center h-screen">
      <div className="md:w-[50%] w-full flex justify-end">
        <img src={Hero} alt="thg logo" className="h-96" />
      </div>
      <div className="md:w-[30%] w-full flex flex-col items-center md:items-start">
        <p className="font-bold text-9xl">THG<span className="text-8xl text-red-600 hidden md:block">Exteriors</span></p>
        <p className="text-7xl text-red-600">Exteriors</p>
        <p className="w-full text-2xl flex justify-around"><span>Quality </span><span>Custom </span><span>Exteriors</span></p>
      </div>
    </div>
  );
};
