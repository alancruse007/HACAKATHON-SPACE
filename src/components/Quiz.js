import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber"; // Three.js integration for React
import { Image as ImageImpl, Scroll, ScrollControls } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei"; // Orbit controls and text component
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing"; // Post-processing effects for Three.js
import { useRef } from "react";
import "../stylesheets/quiz.css";

function ComingSoon() {
  const quizData = [
    {
      question: "WHAT IS AN EXOPLANET?",
      options: ["A planet within our solar system", "A planet outside our solar system", "A planet outside our galaxy", "A galaxy"],
      answer: "A planet outside our solar system",
    },
    {
      question: "What is the most common type of exoplanet discovered so far?",
      options: [
        "Gas giant",
        "Terrestrial planet",
        "Super-Earth",
        "Hot Jupiter",
      ],
      answer: "Gas giant"
    },
    {
      question: "TOI-6255 BELONGS TO WHICH TYPE OF EXO PLANET?",
      options: [
        "super earth",
        "Gas giant",
        "Neptunian",
        "Terrestrial",
      ],
      answer: "super earth",
    },
    {
      question: "WHICH PLANET IN THE LIST BELOW ORBITS A M-TYPE STAR?",
      options: [
        "HIP 8152 c ",
        "TOI-757 b",
        "HD 6061 b",
        "GJ 238 b ",
      ],
      answer: "GJ 238 b ",
    },
    {
      question: "HOW MUCH TIME DOES KIC 10001893 b take to orbit a B-type star?",
      options: [
        "0.9 days ",
        "12 days",
        "30 days",
        "0.2 days",
      ],
      answer: "0.2 days",
    },
    {
      question: "WHAT IS THE DISCOVERY METHOD OF Kepler-1990 c?",
      options: [
        "Transit",
        "Doppler effect",
        "Direct imaging",
        "Astrometry",
      ],
      answer: "Transit",
    },
    {
      question: "WHAT IS THE PLANET MASS OF TOI-2529 b?",
      options: [
        "13.8 Jupiter’s ",
        "25.8 Jupiter’s",
        "3.45 Jupiter’s",
        "2.34 Jupiter’s",
      ],
      answer: "3.45 Jupiter’s",
    },
    {
      question: "TWHAT IS THE ORBITAL PERIOD OF Kepler-1982 b?",
      options: [
        "9.3 days ",
        "3.8 days ",
        "12.5 days",
        "15.0 days",
      ],
      answer: "3.8 days ",
    },
    {
      question: "THE MWC 758 c ORBITS WHICH TYPE OF STAR?",
      options: [
        "A-type star",
        "M-type star",
        "G-type star",
        "B-type star",
      ],
      answer: "A-type star",
    },
    {
      question: "WHAT IS THE ECCENTRICTY OF HIP 8152 c?",
      options: [
        "0.1 ",
        "0.5",
        "0.4",
        "0.2",
      ],
      answer: "0.2",
    },
  ];
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [step, setStep] = React.useState(-1);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const groupRef = useRef();
  const starCount = 500; // Number of stars to generate
  const positions = [...Array(starCount)].map(() => ({
    // Generate random positions for stars within a certain spread
    x: THREE.MathUtils.randFloatSpread(40),
    y: THREE.MathUtils.randFloatSpread(40),
    z: THREE.MathUtils.randFloatSpread(40),
  }));

  const handleOptionClick = (option, index) => {
    setIsDisabled(true);
    setSelectedOption(option);
    setCurrentQuestion(index);
    setIsAnswered(true);

    if (option === quizData[index].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setCurrentQuestion(index + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setStep(index + 1);
      setIsDisabled(false);
    }, 1000);
  };

  return (
    <section className="coming-soon">
      <div className="quiz-container">
        {step < 0 && (
          <div class="heading-conatiner">
            <h2 className="heading">Test your knowledge</h2>
            <button onClick={() => {setStep(0); setScore(0);}} className="start_btn">
              Start Quiz
            </button>
          </div>
        )}

        <div className="">
          {quizData.map(
            (question, index) =>
              step === index && (
                <div
                  key={index}
                  className={`question ${
                    isAnswered && selectedOption === question.answer
                      ? "answered"
                      : ""
                  }`}
                >
                  <h3 className="quiz_question">{question.question}</h3>
                  <div className="options">
                    {question.options.map((option, optionIndex) => (
                      <button
                        disabled={isDisabled}
                        key={optionIndex}
                        onClick={() => handleOptionClick(option, index)}
                        className={`option ${
                          option === (question.answer)
                            ? "active_true"
                            : "active_false"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
        <div className="score">
          {step >= quizData.length && (
            <div className="score-container">
              <h2 className="score-heading">
                Congratulations! You have completed the quiz!
              </h2>
              <h3>
                Score: {score}/{quizData.length}
              </h3>
              <button onClick={() => { setStep(-1); setScore(0); }} className="start_btn">
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="canvas-container">
        <Canvas
          className="canvas"
          gl={{ alpha: true, clearColor: "transparent", sortObjects: true }}
        >
          {/* Add orbit controls for navigating the scene */}
          <OrbitControls
            autoRotate
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <ScrollControls damping={1.2} pages={0}>
            {" "}
            {/* Scroll controls for smooth scrolling effects */}
            <Scroll>
              {Array.from({ length: 2 }).map((_, index) => (
                <group
                  key={index}
                  ref={groupRef}
                  position={[0, -40 * index, 10]}
                >
                  {positions.map((pos, i) => (
                    // Create stars in random positions
                    <mesh key={i} position={[pos.x, pos.y, pos.z]}>
                      <sphereGeometry
                        args={[
                          index === 0 ? 0.005 : 0.008,
                          index === 0 ? 2 : 1,
                          2,
                        ]}
                      />
                      <meshBasicMaterial color="#ffffff" />{" "}
                      {/* Basic white material for stars */}
                    </mesh>
                  ))}
                </group>
              ))}
            </Scroll>
          </ScrollControls>
          {/* Post-processing effects for the scene */}
          <EffectComposer disableNormalPass>
            <Bloom mipmapBlur radius={0.75} luminanceThreshold={1} />
            <Vignette eskil={false} offset={1.0} darkness={0.0} />
            <BrightnessContrast brightness={0} />
          </EffectComposer>
        </Canvas>
      </div>
    </section>
  );
}

export default ComingSoon;
