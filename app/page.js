import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Frosty } from "@/components/ui/frosty";
import { Button } from "@/components/ui/moving-border";
import { FlipWords } from "@/components/flip-words";
import Link from "next/link";

export default function Home() {
  const words = ["fun", "exciting", "engaging", "educational", "interactive"];
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl">
        <Frosty>
          <div className="flex flex-col justify-items-center lg:justify-between lg:flex-row md:flex-col md:justify-center md:text-center">
            <div className="lg:w-2/3 ">
              <div className="text-6xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 lg:text-left">
                Dive into a world of <br />
                <FlipWords words={words} />
                Quizzes.
              </div>
              <div className="text-2xl mx-auto my-10 font-normal antialiased lg:text-left text-neutral-200">
                Discover a variety of quizzes that sharpen your mind and broaden
                your knowledge. Are you ready for the challenge?
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start ">
                <div className="text-2xl mx-1 font-bold antialiased text-center md:text-left text-neutral-200">
                  Test your knowledge of
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-1 mx-1">
                  <span className="animate-pulse">React</span>
                </div>
                <div className="text-2xl mx-1 font-bold antialiased text-center md:text-left text-neutral-200">
                  now!
                </div>
              </div>
            </div>
            <div className="lg:flex flex-col lg:justify-end md:justify-items-center gap-10 mx-5">
              <Link href="/quiz" className="flex justify-center items-center">
                <Button
                  borderRadius="1.75rem"
                  className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 hover:bg-neutral-500 hover:dark:bg-slate-700"
                >
                  <p className="text-3xl">Start</p>
                </Button>
              </Link>
            </div>
          </div>
        </Frosty>
      </div>
    </BackgroundGradientAnimation>
  );
}
