import React, { useEffect, useState } from "react";
import PrepTimeNavbar from "@/components/PrepTimeNavbar";
import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Input,
} from "@nextui-org/react";
import { Howl, Howler } from "howler";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Timer = () => {
  const [value, setValue] = useState(0);
  const [timerTime, setTimerTime] = useState("00:00:00");
  const [isSelected, setIsSelected] = useState(false);
  const [playTimer, setPlayTimer] = useState("00:00:00");
  const [intervals, setintervals] = useState([]);

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
    var getHours = parseInt(timerTime.substring(0, 2));
    var getMinutes = parseInt(timerTime.substring(3, 5));
    var getSeconds = parseInt(timerTime.substring(6));
    const range = getHours * 60 * 60 + getMinutes * 60 + getSeconds;
    let timerEnd = range;
    timer = setInterval(() => {
      if (timerEnd <= 0 && isSelected) {
        playaudio();
        setValue(100);
        timerEnd = range;
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
      } else if (timerEnd <= 0) {
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
      setIsSelected(false)
      setPlayTimer("00:00:00")
      setTimerTime("00:00:00")
      setValue(0)
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
    } else if (e.key === "r" || e.key === "R") {
      resetTimer();
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
          <Checkbox
            className="mt-3"
            color="warning"
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            Auto repeat
          </Checkbox>
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
    </div>
  );
};

export default Timer;
