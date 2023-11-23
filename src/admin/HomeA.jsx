import Navbar from "./NavA";
import lg from "../assets/teacher.png";

const HomeA = () => {
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
                To learn to read is to light a fire; every syllable that is
                spelled is a spark.
              </p>
            </div>
            <button className='btn'>Start Class</button>
          </div>
          <img src={lg} className='img-wrapper' />
        </div>
      </div>
    </div>
  );
};

export default HomeA;
9;
