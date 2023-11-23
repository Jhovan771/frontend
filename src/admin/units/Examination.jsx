import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavA from "../NavA";
import Axios from "axios";
import { Bar } from "react-chartjs-2";

const Examination = () => {
  const { studentID } = useParams();
  const [stories, setStories] = useState([]);
  const [storyDetails, setStoryDetails] = useState(null);
  const [studentData, setStudentData] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });

  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [pronouncedWords, setPronouncedWords] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  const handlePronounceClick = (word, index) => {
    const shouldPronounce = window.confirm(
      `Do you want to pronounce "${word}"?`
    );

    if (shouldPronounce) {
      startListening(word, index);
      setPronouncedWords((prevWords) => [...prevWords, index]);
    }
  };

  const startListening = (word, index) => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        checkCorrectness(transcript, word, index);
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

  const checkCorrectness = (transcript, word) => {
    const cleanedTranscript = transcript.trim().toLowerCase();
    const cleanedWord = word.toLowerCase();

    if (cleanedTranscript === cleanedWord) {
      // Pronunciation is correct
      // Increment total score
      setTotalScore((prevScore) => prevScore + 1);
      setFeedback("Correct pronunciation");
    } else {
      // Pronunciation is wrong
      setFeedback("Wrong pronunciation");
    }

    setIsListening(false);
  };

  const readAloud = () => {
    if (storyDetails?.content) {
      const fullText = `${storyDetails.title}. ${storyDetails.content}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      speechSynthesis.speak(utterance);
    }
  };

  const handleSelect = async (selectedStoryId) => {
    try {
      console.log("Story ID:", selectedStoryId);
      const response = await fetch(
        `http://localhost:3001/fetch-story/${selectedStoryId}`
      );
      const data = await response.json();
      setStoryDetails(data);
    } catch (error) {
      console.error("Error Fetching Story Details:", error);

      if (error.response) {
        console.log("Full Response:", await error.response.text());
      }
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://localhost:3001/get-stories");
        if (response.ok) {
          const storiesData = await response.json();
          console.log("Stories Data:", storiesData);
          setStories(storiesData);
        } else {
          console.error("ERROR FETCHING STORIES.");
        }
      } catch (error) {
        console.error("ERROR FETCHING STORIES", error);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3001/api/studentExam?studentID=${studentID}`
        );
        setStudentData(response.data);
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching student details");
      }
    };

    fetchStudentDetails();
  }, [studentID]);

  const isWordPronounced = (index) => pronouncedWords.includes(index);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  const graphData = {
    labels: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"],
    datasets: [
      {
        label: "Scores",
        data: [80, 90, 75, 85, 95],
        backgroundColor: "black",
        color: "white",
      },
    ],
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting score:", { studentID, totalScore });

      // Send the data to the server
      await Axios.post("http://localhost:3001/api/submitScore", {
        studentID,
        totalScore,
      });

      // Optionally, you can display a success message or reset the total score.
      alert("Score submitted successfully");
      setTotalScore(0);
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the score");
    }
  };

  return (
    <div>
      <NavA />
      <div className='assessment-main-wrapper'>
        <div className='exam-sub-wrapper'>
          <div className='cont-wrapper'>
            <div className='cont-1'>
              <div className='txt-wrapper'>
                <div className='for-id'>
                  <input
                    style={{
                      height: "100%",
                      fontSize: "40px",
                      textAlign: "center",
                    }}
                    type='text'
                    value={studentData.id}
                    disabled
                  />
                </div>
                <div className='for-name'>
                  <input
                    style={{
                      height: "100%",
                      fontSize: "40px",
                      textAlign: "center",
                    }}
                    type='text'
                    value={`${studentData.firstName} ${studentData.lastName}`}
                    disabled
                  />
                </div>
                <div
                  style={{
                    backgroundColor: "white",
                    width: "132px",
                    padding: "6px",
                    color:
                      feedback === "Correct pronunciation" ? "green" : "red",
                  }}>
                  {feedback}{" "}
                  <span style={{ color: isListening ? "green" : "red" }}>
                    {isListening ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
            <div className='cont-2'>
              <div style={{ maxHeight: "240px", overflow: "auto" }}>
                <table className='table-main-wrapper'>
                  <thead>
                    <tr>
                      <th>TITLE</th>
                      <th>MENU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stories.map((story) => (
                      <tr key={story.title}>
                        <td>{story.title}</td>
                        <td style={{ width: "20%" }}>
                          <button
                            className='dlt-btn'
                            onClick={() => {
                              console.log("Clicked storyId:", story.stories_id);
                              handleSelect(story.stories_id);
                            }}>
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='cont-3'>
              <div className='word-btn-wraper-1'>
                <div className='words-to-pronounce'>
                  {storyDetails && storyDetails.words && (
                    <div>
                      {storyDetails.words.map((word, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}>
                          <input
                            key={index}
                            type='text'
                            value={word}
                            style={{
                              textAlign: "center",
                              margin: "5px",
                              textTransform: "uppercase",
                            }}
                            disabled
                          />
                          <div className='btn-to-pronounce'>
                            <button
                              className='btn2-to-pronounce'
                              onClick={() => handlePronounceClick(word, index)}
                              disabled={isListening || isWordPronounced(index)}>
                              PRONOUNCE
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                className='sum-bmit'
                style={{ width: "100%", height: "38px", border: "2px" }}
                onClick={handleSubmit}>
                SUBMIT
              </button>
            </div>
          </div>
          <div className='cont-wrapper-2'>
            <div className='stories-content'>
              <div className='stories-wrapper'>
                <p className='ttl-wrapper'>{storyDetails?.title}</p>
                <p className='cntnt-wrapper'>{storyDetails?.content}</p>
                <button
                  className='class-test-button-control'
                  onClick={readAloud}>
                  READ ALOUD
                </button>
              </div>
            </div>
            <div className='graph-for-score'>
              <Bar
                data={graphData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  plugins: {
                    legend: {
                      labels: {
                        font: {
                          size: 16, // Set font size for legend
                        },
                        color: "black", // Set text color for legend
                      },
                    },
                    title: {
                      display: true,
                      text: "Quiz Scores", // Add title
                      font: {
                        size: 20, // Set font size for title
                      },
                      color: "black", // Set text color for title
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examination;
