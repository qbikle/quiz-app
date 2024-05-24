"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import quizQuestions from "@/public/questions.json";
import { getRandomQuestionsWithSeed } from "@/utils/quizUtils";
import SideNav from "@/components/ui/sidenav";

const Quiz = () => {
  const router = useRouter();
  const seed = Math.floor(Math.random() * 100000);
  const selectedQuestions = getRandomQuestionsWithSeed(quizQuestions, seed);
  selectedQuestions.forEach((question) => {
    delete question.answer;
  });

  useEffect(() => {
    if (
      sessionStorage.getItem("location") &&
      sessionStorage.getItem("quizQuestions") &&
      sessionStorage.getItem("selectedOptions")
    ) {
      router.push("/quiz/1");
    }
    sessionStorage.setItem("location", seed);
    sessionStorage.setItem("quizQuestions", JSON.stringify(selectedQuestions));
    sessionStorage.setItem("selectedOptions", JSON.stringify({}));
    router.push("/quiz/1");
  }, [router, seed, selectedQuestions]);

  return (
    <>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-white"></div>
            <p className="text-2xl ml-4">Loading...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
