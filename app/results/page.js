"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRandomQuestionsWithSeed } from "@/utils/quizUtils";
import quizQuestions from "@/public/questions.json";
import Confetti from "react-confetti";
import CountUp from "react-countup";

const Results = () => {
  const router = useRouter();

  const [score, setScore] = useState(null);
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    const seed = sessionStorage.getItem("location");
    const storedQuestions = JSON.parse(sessionStorage.getItem("quizQuestions"));
    const storedSelectedOptions = JSON.parse(
      sessionStorage.getItem("selectedOptions")
    );

    if (!seed || !storedQuestions || !storedSelectedOptions) {
      setMessage("You haven't attempted the quiz yet. Redirecting to quiz...");
      router.push("/quiz");
      return;
    }

    if (Object.keys(storedSelectedOptions).length !== storedQuestions.length) {
      const missingQuestionId = storedQuestions.findIndex(
        (question, index) => !storedSelectedOptions[index + 1]
      );
      setMessage(
        `You have not completed the Quiz. Redirecting to unanswered question...`
      );
      setTimeout(() => {
        router.push(`/quiz/${missingQuestionId + 1}`);
      }, 3000);
      return;
    }

    const calculateScore = async () => {
      const questions = getRandomQuestionsWithSeed(quizQuestions, seed);
      let score = 0;
      questions.forEach((question, index) => {
        if (storedSelectedOptions[index + 1] === question.answer) {
          score += 4;
        } else {
          score -= 1;
        }
      });

      setScore(score);

      if (score >= 40) {
        setMessage(`Congratulations! You scored:`);
      } else {
        setMessage(`You scored:`);
      }
    };
    calculateScore();

    if (score !== null && message.indexOf("not") === -1) {
      setShowConfetti(true);
    }
  }, [message, router, score]);

  const handleGoHome = () => {
    setShowConfetti(false);
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      {showConfetti && <Confetti />}
      <div className="rounded-lg shadow-xl text-center">
        <p className="text-4xl font-bold mb-4">{message}</p>
        {score !== null && message.indexOf("not") === -1 && (
          <>
            <div className="text-6xl font-extrabold text-blue-500 mb-6">
              <CountUp start={0} end={score} duration={2.5} /> /64
            </div>
            {score < 40 && (
              <p className="text-lg font-bold mb-6">
                Try again to get a better score!
              </p>
            )}
            <button
              onClick={handleGoHome}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Go Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
