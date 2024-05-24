"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import SideNav from "@/components/ui/sidenav";
import { CSSTransition } from "react-transition-group";
import "@/components/css/hintAnimation.css";

const QuizQuestion = () => {
  const router = useRouter();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const storedQuestions = sessionStorage.getItem("quizQuestions");
    const storedSelectedOptions = sessionStorage.getItem("selectedOptions");

    if (storedQuestions && storedSelectedOptions) {
      const parsedQuestions = JSON.parse(storedQuestions);
      const parsedSelectedOptions = JSON.parse(storedSelectedOptions);
      setQuestions(parsedQuestions);

      const questionIndex = parseInt(id, 10) - 1;
      if (parsedQuestions[questionIndex]) {
        setQuestion(parsedQuestions[questionIndex]);
        setSelectedOption(parsedSelectedOptions[id] || null);
      } else {
        router.push("/quiz");
      }

      const answered = Object.keys(parsedSelectedOptions).map(Number);
      setAnsweredQuestions(answered);
    } else {
      router.push("/quiz");
    }
  }, [id, router]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const parsedSelectedOptions = JSON.parse(
      sessionStorage.getItem("selectedOptions") || "{}"
    );
    parsedSelectedOptions[id] = option;
    sessionStorage.setItem(
      "selectedOptions",
      JSON.stringify(parsedSelectedOptions)
    );

    setAnsweredQuestions([...answeredQuestions, Number(id)]);
  };

  const handleNext = useCallback(() => {
    if (parseInt(id, 10) < questions.length) {
      router.push(`/quiz/${parseInt(id, 10) + 1}`);
    } else {
      window.location.href = "/results";
    }
  }, [id, questions.length, router]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && selectedOption) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOption, handleNext]);

  if (!question) return <div>Loading...</div>;

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden ">
      <div className="w-full flex-none md:w-72 w p-1">
        <SideNav answeredQuestions={answeredQuestions} />
      </div>
      <div className="flex flex-col overflow-x-hidden justify-center flex-grow m-4 md:m-[7rem] rounded-3xl md:overflow-y-auto p-5 md:p-8 shadow-lg bg-white/10">
        <div className="max-w-3xl mx-2 w-full">
          <h2 className="text-xl md:text-2xl mb-4 mt-24 md:mt-0 text-neutral-400">
            Question {id}
          </h2>
          <p className="text-2xl mb-6 font-bold">{question.question}</p>
          <ul className="space-y-4">
            {["A", "B", "C", "D"].map((option) => (
              <li key={option} className="flex items-center">
                <label
                  className={`flex items-center space-x-3 pr-6 cursor-pointer ${
                    selectedOption === option
                      ? "bg-blue-600 transform scale-105"
                      : "bg-gray-700"
                  } p-2 rounded-lg transition-all duration-300`}
                >
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionSelect(option)}
                    className="form-radio sr-only"
                  />
                  <span className="text-lg">{question[option]}</span>
                </label>
              </li>
            ))}
          </ul>
          <button
            className="mt-6 inline-block text-blue-600 hover:text-blue-800"
            onClick={() => setShowHint(!showHint)}
          >
            Show Hint
          </button>
          <CSSTransition
            in={showHint}
            timeout={300}
            classNames="hint"
            unmountOnExit
          >
            <div className="mt-4 p-4 w-full border-l-4 border-blue-500 text-blue-700">
              {question.hint}
            </div>
          </CSSTransition>
          <div className="mt-8 flex justify-start">
            {id > 1 && (
              <button
                onClick={() => router.push(`/quiz/${parseInt(id, 10) - 1}`)}
                className="px-4 py-2 bg-slate-600 hover:bg-gray-700  rounded transition-colors duration-300"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 mx-6 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
