//import//
import Hero from "../assets/THG Large.png";

export const Home = () => {
  return (
    <div className="flex items-center h-screen">
      <div className="w-[50%] flex justify-end">
        <img src={Hero} alt="thg logo" className="h-96" />
      </div>
      <div className="w-[30%]">
        <p className="font-bold text-9xl">THG<span className="text-8xl text-red-600">Exteriors</span></p>
        <p className="text-2xl flex justify-around"><span>Quality </span><span>Custom </span><span>Exteriors</span></p>
      </div>
    </div>
  );
};
