import Image from "next/image";
import { Inter } from "next/font/google";
import PrepTimeNavbar from "@/components/PrepTimeNavbar"
import UserDetailForm from "@/components/UserDetailForm";
import StartRelaxStudy from "@/components/StartRelaxStudy";
import HowToUse from "@/components/HowToUse";
import usePrepTimeStore from "@/store/prepTimeStore";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { userPrepTimeData } = usePrepTimeStore((state) => ({
    userPrepTimeData: state.userPrepTimeData,
  }));
  return (
    <div className="mb-20">
    <PrepTimeNavbar/>
    {(userPrepTimeData.userName === "" || userPrepTimeData.examName === null || userPrepTimeData.examDate === null) ? <UserDetailForm/>:<StartRelaxStudy/>}
    <div className="flex justify-center">
    <img className="self-center mt-10" src="https://visitcount.itsvg.in/api?id=preptime&label=Page%20Views&color=2&icon=5&pretty=true" />

    </div>
    </div>
  );
}
