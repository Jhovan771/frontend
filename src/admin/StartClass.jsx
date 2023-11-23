import { Link, useParams } from "react-router-dom";
import NavA from "./NavA";

const StartClass = () => {
  const { sectionID } = useParams();

  return (
    <div>
      <NavA />
      <div>
        <div className='class-section-main'>
          <div className='class-section-wrapper'>
            <div className='class-section-sidebar'>
              <div className='class-section-sidebar-wrapper'>
                <div className='class-sidebar-header'>
                  <h1>LESSONS</h1>
                </div>
                <div className='class-sidebar-menu'>
                  <ul>
                    <li>
                      <Link to={`/lesson1/${sectionID}`}>
                        <div className='class-sidebar-semi-container'>
                          <h2>UNIT 1</h2>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to='/unit2'>
                        <div className='class-sidebar-semi-container'>
                          <h2>UNIT 2</h2>
                          <p>&#x1F512; </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to='/unit3'>
                        <div className='class-sidebar-semi-container'>
                          <h2>UNIT 3</h2>
                          <p>&#x1F512; </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to='/unit4'>
                        <div className='class-sidebar-semi-container'>
                          <h2>UNIT 4</h2>
                          <p>&#x1F512;</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='class-section-content'>CONTENT</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartClass;
