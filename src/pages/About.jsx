import Navbar from "./Navbar";
import Pers from "../assets/Person.png";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className='about-main'>
        <div className='about-wrapper'>
          <div className='content-wrapper'>
            <div className='content-control'>
              <img className='img-control' src={Pers} alt='' />
              <span className='AName-control'>Jay Ann Robles</span>
              <span className='ATitle'>Leader</span>
              <span className='AQoute'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
                delectus.
              </span>
            </div>
            <div className='content-control'>
              <img className='img-control' src={Pers} alt='' />
              <span className='AName-control'>Jay Ann Robles</span>
              <span className='ATitle'>Leader</span>
              <span className='AQoute'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
                delectus.
              </span>
            </div>
            <div className='content-control'>
              <img className='img-control' src={Pers} alt='' />
              <span className='AName-control'>Jay Ann Robles</span>
              <span className='ATitle'>Leader</span>
              <span className='AQoute'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
                delectus.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
