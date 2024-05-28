import React, { useEffect, useState } from "react";
import PrepTimeNavbar from "@/components/PrepTimeNavbar";
import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import usePrepTimeStore from "@/store/prepTimeStore";
import { Howl, Howler } from "howler";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const FullLengthTest = () => {
  const [value, setValue] = useState(0);
  const [timerTime, setTimerTime] = useState("00:00:00");
  const [playTimer, setPlayTimer] = useState("00:00:00");
  const [tempTimer, setTempTimer] = useState("00:00:00");
  const [testData, setTestData] = useState([]);
  const [intervals, setintervals] = useState([]);

  const router = useRouter();
  const addTest = usePrepTimeStore((state) => state.addTest);
  var sound = new Howl({
    src: ["/timeout.mp3"],
  });
  var timer;
  const playaudio = () => {
    sound.play();
    // Fires when the sound finishes playing.
    sound.on("end", function () {});
  };
  const startTimer = () => {
    setTempTimer(timerTime);
    var getHours = parseInt(timerTime.substring(0, 2));
    var getMinutes = parseInt(timerTime.substring(3, 5));
    var getSeconds = parseInt(timerTime.substring(6));
    const range = getHours * 60 * 60 + getMinutes * 60 + getSeconds;
    let timerEnd = range;
    timer = setInterval(() => {
      if (timerEnd <= 0) {
        playaudio();
        setValue(0);
        setTimerTime("00:00:00");
        clearInterval(timer);
        toast.success("Time up!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
      setValue(Math.floor((timerEnd * 100) / range));
      var hours = Math.floor(timerEnd / 3600);
      var minutes = Math.floor((timerEnd % 3600) / 60);
      var remainingSeconds = Math.floor(timerEnd % 60);
      setPlayTimer(
        `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${(
          "0" + remainingSeconds
        ).slice(-2)}`
      );
      timerEnd--;
    }, 1000);
    let temp = intervals;
    temp.push(timer);
    setintervals(temp);
  };
  const resetTimer = async () => {
    intervals.forEach((item) => {
      clearInterval(item);
    });
    setValue(0);
    setTimerTime("00:00:00");
    setPlayTimer("00:00:00");
    setTempTimer("00:00:00");
    toast.success("Timer Reseted Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  };
  const handleKeyPress = (e) => {
    if (e.key === " ") {
      document.getElementById("start-btn").click();
    }
     else if (e.key === "r" || e.key === "R") {
      resetTimer();
    }
     else if (e.key === "s" || e.key === "S") {
        document.getElementById("skip-btn").click();
    }
     else if (e.key === "c" || e.key === "C") {
        document.getElementById("complete-btn").click();
    }
  };
  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const handleAddTestData = (QuestionStatus) => {
    let [h1, m1, s1] = tempTimer.split(':').map(Number);
    let [h2, m2, s2] = playTimer.split(':').map(Number);
    setTempTimer(playTimer);
    let totalSeconds1 = h1 * 3600 + m1 * 60 + s1;
    let totalSeconds2 = h2 * 3600 + m2 * 60 + s2;
    let differenceSeconds = Math.abs(totalSeconds1 - totalSeconds2);
    let hours = Math.floor(differenceSeconds / 3600);
    let minutes = Math.floor((differenceSeconds % 3600) / 60);
    let seconds = differenceSeconds % 60;
    var tempTestData = {
      question: testData.length + 1,
      status: QuestionStatus,
      timeTaken: `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${(
        "0" + seconds
      ).slice(-2)}`,
    };
    setTestData([...testData, tempTestData]);
  };
  const saveTestData = () => {
    addTest({
        testDate: new Date().toLocaleString(),
        testData: testData
    });
    setTestData([]);
  };
  const handleSaveTestDataAndEndTest = () => {
    addTest({
        testDate: new Date().toLocaleString(),
        testData: testData
    });
    setTestData([]);
    resetTimer()
    router.push("/show-report");
  };
 
  return (
    <div className="mb-20">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <PrepTimeNavbar />
      <div className="flex justify-center flex-col">
        <CircularProgress
          aria-label="Loading..."
          classNames={{
            base: "self-center",
            svg: "w-64 h-64 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={value}
          strokeWidth={3}
          showValueLabel={true}
        />
        <Chip
          classNames={{
            base: "border-1 border-white/30 self-center mt-3",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
          size="lg"
        >
          {playTimer}
        </Chip>
      </div>
      <div className="flex flex-col mt-5">
        <div className="self-center">
          <Input
            type="time"
            step={1}
            label="Time"
            className="w-80"
            disableAnimation={true}
            value={timerTime}
            onChange={(e) => {
              setTimerTime(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center gap-3 mt-5">
          <Button
            id="start-btn"
            isDisabled={timerTime === "00:00:00"}
            onClick={startTimer}
            size="lg"
            color="success"
          >
            Start
          </Button>
          <Button onClick={resetTimer} size="lg" color="danger">
            Reset
          </Button>
        </div>
      </div>
      <div className="m-5">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>QUESTION</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>TIME TAKEN</TableColumn>
          </TableHeader>
          {testData.length === 0 ? (
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          ) : (
            <TableBody>
              {testData.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item?.question}</TableCell>
                    <TableCell>{item?.status}</TableCell>
                    <TableCell>{item?.timeTaken}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="flex justify-center gap-3 mt-8">
        <Button
          onClick={() => handleAddTestData("Completed")}
          size="lg"
          color="success"
          isDisabled={timerTime === "00:00:00"}
          id="complete-btn"
        >
          Completed
        </Button>
        <Button
          onClick={() => handleAddTestData("Skiped")}
          size="lg"
          color="warning"
          isDisabled={timerTime === "00:00:00"}
          id="skip-btn"
        >
          Skip
        </Button>
      </div>
      <div className="flex justify-center flex-col gap-5 mt-10">
        <Button
          className="self-center"
          size="lg"
          color="primary"
          onClick={saveTestData}
          isDisabled={testData.length === 0 && testData.length === 0}
        >
          Save Test Data
        </Button>
        <Button
          className="self-center"
          size="lg"
          color="primary"
          onClick={handleSaveTestDataAndEndTest}
          isDisabled={testData.length === 0 && testData.length === 0}
        >
          Save Test Data and End Test
        </Button>
        <Button onClick={()=>router.push("/show-report")} className="self-center" size="lg" color="secondary">
          Show Report
        </Button>
      </div>
    </div>
  );
};

export default FullLengthTest;
