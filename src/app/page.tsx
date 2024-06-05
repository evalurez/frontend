import Image from "next/image";
import FirstPage from "./firstPage/page";
import SecondPage from "./secondPage/page";
import ThirdPage from "./thirdPage/page";
import FourthPage from "./fourthPage/page";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-10"
      style={{ overflowX: "hidden" }}
    >
      <div className="flex flex-col gap-20">
        <FirstPage />
        <SecondPage />
        <ThirdPage />
        <FourthPage />
      </div>
    </main>
  );
}
