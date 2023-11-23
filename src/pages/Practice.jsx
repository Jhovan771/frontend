import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import mic from "../assets/Microphone.png";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Practice = () => {
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState(null);
  const [wordData, setWordData] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showWords, setShowWords] = useState(true);
  const [overallScoreHistory, setOverallScoreHistory] = useState(
    JSON.parse(localStorage.getItem("overallScoreHistory")) || [0]
  );
  const scoreRef = useRef(0);
  const chartRef = useRef(null);

  const speakWord = () => {
    const wordToSpeak = wordData[currentWordIndex];
    if (wordToSpeak) {
      const utterance = new SpeechSynthesisUtterance(wordToSpeak);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Fetch words from the API
    fetch("http://localhost:3001/api/wordData")
      .then((response) => response.json())
      .then((data) => {
        setWordData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleRecognition = () => {
    // Speech recognition logic here
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Adjust recognition properties for better accuracy
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const currentWord = wordData[currentWordIndex].toLowerCase();
      const isPronunciationCorrect = transcript === currentWord;

      setIsCorrect(isPronunciationCorrect);

      // Update the score if the pronunciation is correct
      if (isPronunciationCorrect) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }

      // Move to the next word
      setCurrentWordIndex(currentWordIndex + 1);

      // If all words have been pronounced, hide the words
      if (currentWordIndex >= wordData.length - 1) {
        setShowWords(false);
      }
    };

    recognition.onend = () => {
      setOverallScoreHistory((prevScoreHistory) => [
        ...prevScoreHistory,
        scoreRef.current,
      ]);
    };

    recognition.start();
  };

  const redirectToPageNormal = () => {
    navigate("/lvlNormal");
  };

  const redirectToPageEasy = () => {
    navigate("/practice");
  };

  const redirectToPageHard = () => {
    navigate("/lvlHard");
  };

  const allWordsPronounced = currentWordIndex >= wordData.length - 1;

  const handleRetake = () => {
    setScore(0);
    setCurrentWordIndex(0);
    setShowWords(true);
    const updatedChartData = generateChartData();
    localStorage.setItem("chartData", JSON.stringify(updatedChartData));
    window.location.reload();
  };

  const handleNext = () => {
    localStorage.setItem(
      "overallScoreHistory",
      JSON.stringify(overallScoreHistory)
    );

    setCurrentWordIndex(currentWordIndex + 1);

    if (currentWordIndex >= 9) {
      setScore(0);
      setCurrentWordIndex(0);
    }

    const updatedChartData = generateChartData();

    localStorage.setItem("chartData", JSON.stringify(updatedChartData));

    setShowWords(true);

    window.location.reload();
  };

  const generateChartData = () => {
    return {
      labels: overallScoreHistory.map((_, index) => `Attempt ${index + 1}`),
      datasets: [
        {
          label: "Overall Score",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
          hoverBorderColor: "rgba(75, 192, 192, 1)",
          data: overallScoreHistory,
        },
      ],
    };
  };

  const getChartImageURL = () => {
    if (chartRef.current) {
      return chartRef.current.toBase64Image();
    }
    return null;
  };

  const downloadChart = () => {
    const chartDataURL = getChartImageURL();
    if (chartDataURL) {
      const a = document.createElement("a");
      a.href = chartDataURL;
      a.download = "score_chart.png";
      a.click();
    }
  };

  const chartData = generateChartData();

  return (
    <div>
      <Navbar />
      <div className='home-main'>
        <div className='home-wrapper'>
          <div className='box-main-control'>
            <div className='box-control-1'>
              <div className='box-1'>
                <h3>This is Easy Page</h3>
                <div className='box-content-1'>
                  {showWords && (
                    <p className='prac-p-controller' onClick={speakWord}>
                      {wordData[currentWordIndex] &&
                        `Say '${wordData[currentWordIndex]}'`}
                    </p>
                  )}
                </div>
                <div className='scores-graph' id='scores-chart'>
                  <Bar
                    data={chartData}
                    ref={chartRef}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false, // Set to false to control width and height independently
                      height: 200, // Set your desired height
                    }}
                  />
                </div>
              </div>
              <div className='box-2'>
                <div className='box-content-2'>
                  {showWords && (
                    <button
                      id='startRecognitionButton'
                      className='start-button'
                      onClick={handleRecognition}>
                      <img
                        src={mic}
                        className='mic-controller'
                        alt='Microphone'
                      />
                      <h3 className='prac-h3-controller'>Start</h3>
                    </button>
                  )}
                  {!showWords && (
                    <button className='retake-button' onClick={handleRetake}>
                      Retake
                    </button>
                  )}
                  {!showWords && (
                    <button className='next-button' onClick={handleNext}>
                      Next
                    </button>
                  )}
                </div>
                <div
                  className={`box-content-3 ${
                    isCorrect === true
                      ? "correct"
                      : isCorrect === false
                      ? "incorrect"
                      : ""
                  }`}>
                  <h2>
                    {allWordsPronounced
                      ? `Score: ${score}`
                      : isCorrect === true
                      ? "Correct!"
                      : isCorrect === false
                      ? "Incorrect!"
                      : ""}
                  </h2>
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
      <button className='download-button' onClick={downloadChart}>
        Download Chart
      </button>
    </div>
  );
};

export default Practice;
