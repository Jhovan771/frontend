import Navbar from "./Navbar";
import lg from "../assets/teacher.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const redirectToPage = () => {
    navigate("/practice");
  };
  return (
    <div>
      <Navbar />
      <div className='home-main'>
        <div className='home-wrapper'>
          <div className='words-wrapper'>
            <div className='title-wrapper'>
              <h2>
                <span className='remark-home'>Welcome to</span>{" "}
                <span className='name-home'>Speak Wise</span>
              </h2>
            </div>
            <div className='sub-title-wrapper'>
              <p>
                The more that you read, the more things you will know. The more
                that you learn, the more places you’ll go.
              </p>
            </div>
            <button className='btn' onClick={redirectToPage}>
              Start Now
            </button>
          </div>
          <img src={lg} className='img-wrapper' />
        </div>
      </div>
    </div>
  );
};

export default Home;
