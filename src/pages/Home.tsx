//import//
import Hero from "../assets/THG Large.png";

export const Home = () => {
  return (
    <div className="flex h-screen flex-col justify-center px-12 md:flex-row md:items-center">
      <div className="flex w-full justify-end md:w-[50%]">
        <img src={Hero} alt="thg logo" className="max-h-96" />
      </div>
      <div className="mr-12 flex flex-col items-center md:items-start">
        <p className="text-9xl font-bold text-text-900">
          THG
          <span className="hidden text-8xl text-primary-700 md:block">
            Exteriors
          </span>
        </p>
        <p className="flex w-full justify-around text-2xl text-text-900">
          <span>Quality </span>
          <span>Custom </span>
          <span>Exteriors</span>
        </p>
      </div>
    </div>
  );
};
