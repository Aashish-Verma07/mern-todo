import { Link } from "react-router-dom";
import hero from "../assets/hero.png"
const LangingPage = () => {
  return (
    <>
      <section className=" max-w-screen mx-4 sm:mx-16  flex justify-between gap-7 items-center h-screen">
        <div>
          <h1 className="text-5xl mb-4 font-medium">
            <span>Organize work and life</span> <br /> <span className="text-purple-600">finally.</span>
          </h1>
          <p className="mb-7">
            type just anything into the task field and todolist <br /> on of its
            kind natural language recognition will instantlly fill your
            to-do-list
          </p>
          <div className="flex justify-start items-center gap-4">
          <Link to="/register" className="inline-block py-3 px-4 border-0 text-base rounded-sm bg-purple-700 hover:bg-purple-800  text-white  font-bold hover:scale-105 duration-300">Register Now</Link>
          <Link to="/login" className="inline-block py-3 px-4 border-0 text-base rounded-sm bg-pink-600 hover:bg-pink-700 text-white  font-bold hover:scale-105 duration-300">Login Now</Link>
          </div>
        </div>
        <div>
          <img src={hero} alt="heroImage" width={'100%'} height={'100%'} />
        </div>
      </section>
    </>
  );
};

export default LangingPage;
