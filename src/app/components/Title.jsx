// components/Title.jsx
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

const Title = ({ text }) => {
  return (
    <h1
      className={`${poppins.className} text-xl md:text-3xl font-semibold text-[#a6804e] tracking-wide text-start my-6 relative`}
    >
      {text}
      <span className="block w-24 h-0.5 bg-[#a6804e] mt-2 rounded-full"></span>
    </h1>
  );
};

export default Title;
