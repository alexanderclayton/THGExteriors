import Placeholder from "../assets/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";

export const About = () => {
  return (
    <div className="mx-auto flex items-center justify-center space-x-8 py-12">
      <div className="max-w-lg">
        <h1 className="mb-4 text-3xl font-bold text-primary-700">
          About THG Exteriors
        </h1>
        <p className="text-lg leading-relaxed text-gray-700">
          <span className="font-semibold">THG Exteriors</span>, established by
          founder Christopher Thompson, is a premier choice for exterior
          painting services. With Chris's leadership, the company is committed
          to delivering top-tier craftsmanship and ensuring client satisfaction.
          Drawing from his background as a former fireman, Chris instills a
          culture of precision and attention to detail in the company's
          operations. Under his guidance, THG Exteriors has become synonymous
          with excellence in the industry, providing transformative painting
          solutions tailored to the unique needs of each client.
        </p>
      </div>
      <div className="overflow-hidden rounded-lg border-4 border-accent-400">
        <img src={Placeholder} alt="placeholder" className="h-auto w-full" />
      </div>
    </div>
  );
};
