//import//
import Hero from "../assets/THG Large.png";

export const Home = () => {
  return (
    <div className="flex h-screen flex-col justify-center md:flex-row md:items-center">
      <div className="flex w-full justify-end md:w-[50%]">
        <img src={Hero} alt="thg logo" className="h-96" />
      </div>
      <div className="flex w-full flex-col items-center md:w-[30%] md:items-start">
        <p className="text-9xl font-bold">
          THG
          <span className="hidden text-8xl text-red-600 md:block">
            Exteriors
          </span>
        </p>
        <p className="flex w-full justify-around text-2xl">
          <span>Quality </span>
          <span>Custom </span>
          <span>Exteriors</span>
        </p>
      </div>
    </div>
  );
};
