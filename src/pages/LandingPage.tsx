import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Presentio</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Making Presentations Better</p>
      <div className="flex flex-col gap-2 items-center">
        <Link to="/app">
          <button className="btn btn-wide btn-secondary">
            Start
          </button>
        </Link>
        <button className="btn btn-alt w-fit">
          How does it work?
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
