import Link from "next/link";

export default function SideNav({ answeredQuestions }) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 justify-center">
      <Link
        className="flex h-20 mb-2 md:mb-0 md:w-64 items-center text-center justify-center rounded-md bg-white/5 md:fixed md:top-10"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <h1 className="text-2xl font-bold">Quiz</h1>
          <h2 className="text-xs">App</h2>
        </div>
      </Link>
      <div className="grid grid-cols-4 gap-2 rounded-2xl bg-white/10 p-2">
        {new Array(16).fill(0).map((_, i) => (
          <Link key={i} href={`/quiz/${i + 1}`}>
            <p
              className={`flex h-[4rem] max-w-auto text-xl items-center justify-center rounded-md transition-all duration-300 transform ${
                answeredQuestions.includes(i + 1)
                  ? "bg-green-500 scale-105"
                  : "bg-gray-800 hover:bg-gray-500"
              } hover:scale-105`}
            >
              {i + 1}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
