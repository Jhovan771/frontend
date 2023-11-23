import Navbar from "./Navbar";
import mic from "../assets/Microphone.png";
import { useNavigate } from "react-router-dom";

const HardPage = () => {
  const navigate = useNavigate();

  const redirectToPageNormal = () => {
    navigate("/lvlNormal");
  };

  const redirectToPageEasy = () => {
    navigate("/practice");
  };

  const redirectToPageHard = () => {
    navigate("/lvlHard");
  };

  return (
    <div>
      <Navbar />
      <div className='home-main'>
        <div className='home-wrapper'>
          <div className='box-main-control'>
            <div className='box-control-1'>
              <div className='box-1'>
                <h3>This is Hard Page</h3>
                <div className='box-content-1'>
                  <p className='prac-p-controller'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae totam dolor temporibus! Hic tenetur odio eum
                    magnam, laudantium exercitationem veniam, nobis voluptatum,
                    ea voluptatem odit.
                  </p>
                </div>
              </div>
              <div className='box-2'>
                <div className='box-content-2'>
                  <div>
                    <img src={mic} className='mic-controller' />
                    <h3 className='prac-h3-controller'>Start</h3>
                  </div>
                </div>
                <div className='box-content-3'>
                  <h2>CORRECT</h2>
                </div>
              </div>
            </div>
            <div className='box-control-2'>
              <div className='box-3'>
                <div className='mini-box'>
                  <button className='mini-box' onClick={redirectToPageEasy}>
                    EASY
                  </button>
                </div>
                <div className='mini-box'>
                  <button className='mini-box' onClick={redirectToPageNormal}>
                    NORMAL
                  </button>
                </div>
                <div className='mini-box'>
                  <button className='mini-box' onClick={redirectToPageHard}>
                    HARD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardPage;
