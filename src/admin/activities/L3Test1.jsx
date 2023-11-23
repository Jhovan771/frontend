import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavA from "../NavA";
import Axios from "axios";

const L3Test1 = () => {
  const wordData = ["Funny", "Like", "Yell", "Happy"];
  const [quizItemsCorrectness, setQuizItemsCorrectness] = useState(
    Array(wordData.length).fill("")
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const { sectionID } = useParams();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const allItemsAnswered = quizItemsCorrectness.every((item) => item !== "");
    const hasSelectedStudent = !!selectedStudent;

    if (allItemsAnswered && hasSelectedStudent) {
      updateTotalScore(selectedStudent.id, score);
    }
  }, [quizItemsCorrectness, selectedStudent, score]);

  const startListening = (index) => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        checkCorrectness(transcript, index);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      setIsListening(true);

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    } else {
      console.error("SpeechRecognition not supported in this browser.");
    }
  };

  const checkCorrectness = (transcript, index) => {
    const currentWord = wordData[index];
    const cleanedTranscript = transcript.trim().toLowerCase();
    const cleanedWord = currentWord.toLowerCase();

    if (cleanedTranscript === cleanedWord) {
      // Pronunciation is correct
      const updatedCorrectness = [...quizItemsCorrectness];
      updatedCorrectness[index] = "Correct";
      setQuizItemsCorrectness(updatedCorrectness);

      // Increment the score
      setScore((prevScore) => prevScore + 1);
    } else {
      // Pronunciation is wrong
      const updatedCorrectness = [...quizItemsCorrectness];
      updatedCorrectness[index] = "Wrong";
      setQuizItemsCorrectness(updatedCorrectness);
    }
  };

  let textToRead =
    "Macmac is a black crow. She is a funny crow. Macmac likes to go to the well. She likes to run around the well. Ted sees Macmac run around the well. Ted yells, Macmac dont run around the well! Macmac falls into the well! Oh, oh! She cant swim. What to do, what to do? Ted gets a big net. He gets Macmac out of the well. Thats good. Macmac is wet but Happy Ted is happy.";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const readAloud = () => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    const spanElements = document.querySelectorAll(".words-controller");
    const replacementTexts = [];

    spanElements.forEach((spanElement, index) => {
      const placeholder = `blank`;
      replacementTexts.push(spanElement.textContent);
      textToRead = textToRead.replace(replacementTexts[index], placeholder);
    });

    utterance.text = textToRead;
    speechSynthesis.speak(utterance);

    replacementTexts.forEach((replacementText) => {
      textToRead = textToRead.replace(`blank`, replacementText);
    });
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3001/api/studentList?sectionID=${sectionID}`
        );
        setStudentData(response.data);
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching student data.");
      }
    };
    fetchStudentData();
  }, [sectionID]);

  const fetchStudentById = async (studentID) => {
    try {
      if (selectedStudent) {
        updateTotalScore(selectedStudent.id, score);
      }

      setScore(0);
      setQuizItemsCorrectness(Array(wordData.length).fill(""));

      const response = await Axios.get(
        `http://localhost:3001/api/student?studentID=${studentID}`
      );
      setSelectedStudent(response.data);
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching student data.");
    }
  };

  const updateTotalScore = async (studentID, newScore) => {
    try {
      const response = await Axios.post(
        "http://localhost:3001/api/updateTotalScore",
        {
          studentID,
          newScore,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavA />
      <div className='class-section-main'>
        <div className='class-section-wrapper'>
          <div className='class-section-sidebar'>
            <div className='class-section-sidebar-wrapper'>
              <div className='class-sidebar-header'>
                <h1>Activities</h1>
              </div>
              <div className='class-sidebar-menu'>
                <ul>
                  <li>
                    <div className='class-sidebar-semi-container'>
                      <h3>
                        <div
                          onClick={toggleDropdown}
                          className='h2-lesson-control'>
                          Activity 1
                        </div>
                        {isDropdownOpen && (
                          <div className='dropdown-content'>
                            <div className='lesson-links-control'>
                              <Link
                                className='link-css-control'
                                to={`/lesson1/${sectionID}`}>
                                The Crow and the Pitcher
                              </Link>
                            </div>
                            <div className='lesson-links-control'>
                              <Link
                                className='link-css-control'
                                to={`/l1t1/${sectionID}`}>
                                Test: The Crow and the Pitcher
                              </Link>
                            </div>
                          </div>
                        )}
                      </h3>
                    </div>
                  </li>
                  <li>
                    <div className='class-sidebar-semi-container'>
                      <h3>
                        <div
                          onClick={toggleDropdown}
                          className='h2-lesson-control'>
                          Activity 2
                        </div>
                        {isDropdownOpen && (
                          <div className='dropdown-content'>
                            <div className='lesson-links-control'>
                              <Link
                                className='link-css-control'
                                to={`/lesson1/${sectionID}`}>
                                My Two Pet Cats
                              </Link>
                            </div>
                            <div className='lesson-links-control'>
                              <Link
                                className='link-css-control'
                                to={`/l2t1/${sectionID}`}>
                                Test: My Two Pet Cats
                              </Link>
                            </div>
                          </div>
                        )}
                      </h3>
                    </div>
                  </li>

                  <li>
                    <div className='class-sidebar-semi-container'>
                      <h3>
                        <div
                          onClick={toggleDropdown}
                          className='h2-lesson-control'>
                          Activity 3
                        </div>
                        {isDropdownOpen && (
                          <div className='dropdown-content'>
                            <div className='lesson-links-control'>
                              <Link
                                to={`/lesson3/${sectionID}`}
                                className='link-css-control'>
                                Funny Macmac
                              </Link>
                            </div>
                            <div className='lesson-links-control'>
                              <Link
                                className='link-css-control'
                                to={`/l3t1/${sectionID}`}>
                                Test: Funny Macmac
                              </Link>
                            </div>
                          </div>
                        )}
                      </h3>
                    </div>
                  </li>

                  <li>
                    <Link to='/unit4'>
                      <div className='class-sidebar-semi-container'>
                        <h2>Activity 4</h2>
                        <p>&#x1F512;</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='class-section-content'>
            <div className='class-test-main-wrapper'>
              <div className='class-test-box-1'>Funny Macmac</div>
              <div className='class-test-box-2'>
                Macmac is a black crow. She is a{" "}
                <span className='words-controller'>funny</span> crow. Macmac{" "}
                <span className='words-controller'>likes</span> to go to the
                well. She likes to run around the well. Ted sees Macmac run
                around the well. Ted{" "}
                <span className='words-controller'>yells</span>, Macmac dont run
                around the well! Macmac falls into the well! Oh, oh! She cant
                swim. What to do, what to do? Ted gets a big net. He gets Macmac
                out of the well. Thats good. Macmac is wet but{" "}
                <span className='words-controller'>Happy</span> Ted is happy,
                too.
              </div>
              <div className='class-test-box-3'>
                <button
                  className='class-test-button-control'
                  onClick={readAloud}>
                  Read Aloud
                </button>
              </div>
              <div className='class-test-box-4'>
                <table className='class-test-table'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>%</th>
                      <th>Menu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((student, index) => (
                      <tr key={student.id}>
                        <td
                          style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            color: "black",
                          }}>
                          {index + 1}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            color: "black",
                          }}>
                          {student.firstName}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            color: "black",
                          }}>
                          {student.lastName}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            color: "black",
                            display: "flex",
                            height: "100%",
                          }}>
                          <div className='progress-bar'>{`${
                            (student.total_score / 12) * 100
                          }%`}</div>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            color: "black",
                          }}>
                          <button
                            className='l1t1-take-btn'
                            onClick={() => fetchStudentById(student.id)}>
                            Take
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ height: "14px" }}>Your Score for this Quiz:</p>
              <input
                type='text'
                value={score}
                style={{
                  textAlign: "center",
                  height: "34px",
                  fontSize: "28px",
                }}
                disabled
              />
            </div>
          </div>
          <div className='quiz-items-wrapper'>
            {wordData.map((word, index) => (
              <div className='quiz-items' key={index}>
                <div className='quiz-item'>{word}</div>
                <div className='quiz-item-btn'>
                  <button
                    className='qz-itm-btn'
                    onClick={() => startListening(index)}
                    disabled={quizItemsCorrectness[index] !== ""}>
                    PRONOUNCE
                  </button>
                </div>
                <div className='right-wrong-indicator'>
                  {quizItemsCorrectness[index]}
                </div>
              </div>
            ))}
            <div className='name-of-taker'>
              <div className='student-name'>
                <div
                  className='id-and-name-wrapper'
                  style={{ display: "flex", flexDirection: "row" }}>
                  <input
                    type='text'
                    placeholder='ID'
                    style={{
                      color: "black",
                      maxWidth: "32px",
                      textAlign: "center",
                      padding: "0",
                    }}
                    disabled
                    value={selectedStudent ? selectedStudent.id : ""}
                  />
                  <input
                    type='text'
                    placeholder='STUDENT NAME'
                    style={{ textAlign: "center", color: "black" }}
                    disabled
                    value={
                      selectedStudent
                        ? `${selectedStudent.firstName} ${selectedStudent.lastName}`
                        : ""
                    }
                  />
                </div>

                <div className='quiz-item-indicator-wrapper'>
                  <div
                    className={`quiz-item-indicator ${
                      isListening ? "active-listening-2" : ""
                    } `}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default L3Test1;
