import React, { useState } from "react";
import PrepTimeNavbar from "@/components/PrepTimeNavbar";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import usePrepTimeStore from "@/store/prepTimeStore";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ShowReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { userPrepTimeData } = usePrepTimeStore((state) => ({
    userPrepTimeData: state.userPrepTimeData,
  }));
  function getDateDifference() {
    // Convert dates to milliseconds
    const startDate = new Date(userPrepTimeData.preparationStartDate)
    const endDate=new Date()
    const startMillis = startDate.getTime();
    const endMillis = endDate.getTime();

    // Calculate the difference in milliseconds
    const differenceMillis = endMillis - startMillis;

    // Convert milliseconds to days
    const differenceDays = Math.floor(differenceMillis / (1000 * 60 * 60 * 24));

    return differenceDays?differenceDays:1;
}
  function addTimes(time1, time2) {
    // Split time strings into hours, minutes, and seconds
    const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
    const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

    // Calculate total seconds for each time
    const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
    const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;

    // Add the total seconds together
    let totalSecondsSum = totalSeconds1 + totalSeconds2;

    // Calculate hours, minutes, and seconds from the total seconds sum
    const hoursSum = Math.floor(totalSecondsSum / 3600);
    totalSecondsSum %= 3600;
    const minutesSum = Math.floor(totalSecondsSum / 60);
    const secondsSum = totalSecondsSum % 60;

    // Format the result back into "hh:mm:ss" format
    const formattedResult = [
      ("0" + hoursSum).slice(-2),
      ("0" + minutesSum).slice(-2),
      ("0" + secondsSum).slice(-2),
    ].join(":");

    return formattedResult;
  }
  const calculateMinutes = (num) => {
    const [hours1, minutes1, seconds1] = num.split(":").map(Number);
    return (hours1 * 3600 + minutes1 * 60 + seconds1) / 60;
  };
  const calculateSeconds = (num) => {
    const [hours1, minutes1, seconds1] = num.split(":").map(Number);
    return (hours1 * 3600 + minutes1 * 60 + seconds1);
  };
  const averageSolutionPerMin = userPrepTimeData.test.map((item) => {
    let Completed = "00:00:00";
    let Skiped = "00:00:00";
    let tempc = 0
    let temps = 0
    for (let i = 0; i < item.testData.length; i++) {
      if (item.testData[i]["status"] === "Completed") {
        Completed = addTimes(Completed, item.testData[i]["timeTaken"]);
        tempc=tempc+1
      } else {
        Skiped = addTimes(Skiped, item.testData[i]["timeTaken"]);
        temps = temps+1
      }
    }
    Completed = Math.floor(calculateSeconds(Completed)/tempc)
    Skiped = Math.floor(calculateSeconds(Skiped)/tempc)
    const hoursSum1 = Math.floor(Completed / 3600);
    Completed %= 3600;
    const minutesSum1 = Math.floor(Completed / 60);
    const secondsSum1 = Completed % 60;
    const hoursSum2 = Math.floor(Skiped / 3600);
    Skiped %= 3600;
    const minutesSum2 = Math.floor(Skiped / 60);
    const secondsSum2 = Skiped % 60;
    return { Completed: [
        ("0" + hoursSum1).slice(-2),
        ("0" + minutesSum1).slice(-2),
        ("0" + secondsSum1).slice(-2),
      ].join(":"), Skiped: [
        ("0" + hoursSum2).slice(-2),
        ("0" + minutesSum2).slice(-2),
        ("0" + secondsSum2).slice(-2),
      ].join(":") };
  });
  const calculateCompletedSum = () => {
    let sum = "00:00:00";
    for (let index = 0; index < averageSolutionPerMin.length; index++) {
      sum = addTimes(sum, averageSolutionPerMin[index]?.Completed);
    }
    const [hours1, minutes1, seconds1] = sum.split(":").map(Number);
    return parseFloat((hours1 * 3600 + minutes1 * 60 + seconds1) / 60);
  };
  const calculateAverageCompletedSum = () => {
    let sum = "00:00:00";
    let temp = 0
    for (let index = 0; index < averageSolutionPerMin.length; index++) {
      sum = addTimes(sum, averageSolutionPerMin[index]?.Completed);
      temp=temp+1
    }
    const [hours1, minutes1, seconds1] = sum.split(":").map(Number);
    return (hours1 * 3600 + minutes1 * 60 + seconds1) / (60*temp);
  };
  const calculateSkipedSum = () => {
    let sum = "00:00:00";
    for (let index = 0; index < averageSolutionPerMin.length; index++) {
      sum = addTimes(sum, averageSolutionPerMin[index]?.Skiped);
    }
    const [hours1, minutes1, seconds1] = sum.split(":").map(Number);
    return parseFloat((hours1 * 3600 + minutes1 * 60 + seconds1) / 60);
  };
  const calculatePieData = ()=>{
    let Completed = "00:00:00";
    let Skiped = "00:00:00";0
    userPrepTimeData.test.map((item)=>{
      for (let i = 0; i < item.testData.length; i++) {
        if (item.testData[i]["status"] === "Completed") {
          Completed = addTimes(Completed, item.testData[i]["timeTaken"]);
        } else {
          Skiped = addTimes(Skiped, item.testData[i]["timeTaken"]);
        }
      }
    })
    return [calculateMinutes(Completed),calculateMinutes(Skiped)]
  }
  const totalAverageSolutionPerMin =
    (calculateAverageCompletedSum() / averageSolutionPerMin.length);
  const optionsline = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Question vs Time (in minutes)",
      },
    },
  };
  const optionsdoughnut = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Time Spend (in minutes)",
      },
    },
  };
  let array = [];
  for (let index = 1; index <= 100; index++) {
    array.push(index);
  }
  const labelsline = array;
  let newTestData = userPrepTimeData.test.slice(0, 10);
  const datasets = newTestData.map((item, index) => {
    let color = [
      Math.random() * 200 + 50,
      Math.random() * 200 + 50,
      Math.random() * 200 + 50,
    ];
    let inittime = 0;
    return {
      label: `Test ${index + 1}`,
      data: item?.testData.map((test) => {
        inittime = inittime + calculateMinutes(test["timeTaken"]);
        return inittime;
      }),
      borderColor: `rgb(${color[0]},${color[1]},${color[2]})`,
      backgroundColor: `rgb(${color[0]},${color[1]},${color[2]},${0.5})`,
      borderWidth: 1,
    };
  });
  const dataline = {
    labels: labelsline,
    datasets: datasets,
  };
  const datadoughnut = {
    labels: ["Solving time", "Skiped time"],
    datasets: [
      {
        label: "Time Spend (in minutes)",
        data: calculatePieData(),
        backgroundColor: ["rgb(20, 83, 45,0.8)", "rgb(128, 128, 128,0.8)"],
        borderColor: ["rgb(20, 83, 45)", "rgb(128, 128, 128)"],
        borderWidth: 3,
      },
    ],
  };
  return (
    <div className="mb-20">
      <PrepTimeNavbar />
      <div className="flex justify-center flex-col mb-5 mt-5 ">
        <span className="text-4xl lg:text-5xl font-black text-white self-center">{userPrepTimeData.userName}</span>
        <span className="self-center text-warning">{userPrepTimeData.examName}</span>
      </div>
      <div className="flex justify-center flex-col md:flex-row">
        <Card className="h-40 w-60 m-5 self-center bg-gradient-to-r from-yellow-900 to-slate-900 shadow-inner">
          <CardHeader className="font-bold ">Test Attempted</CardHeader>
          <CardBody className="text-7xl mt-[-15px] font-black">
            {userPrepTimeData.test.length}
          </CardBody>
        </Card>
        <Card className="h-40 w-60 m-5 self-center bg-gradient-to-r from-red-900 to-slate-800 shadow-inner">
          <CardHeader className="font-bold ">Average solution/min</CardHeader>
          <CardBody className="text-7xl mt-[-15px] font-black">
            {totalAverageSolutionPerMin
              ? totalAverageSolutionPerMin.toFixed(2)
              : 0}
          </CardBody>
        </Card>

        <Card className="h-40 w-60 m-5 self-center bg-gradient-to-r from-green-900 to-slate-900 shadow-inner">
          <CardHeader className="font-bold ">Total study hours</CardHeader>
          <CardBody className="text-7xl mt-[-15px] font-black">{userPrepTimeData.hoursStudy? parseFloat(userPrepTimeData.hoursStudy).toFixed(1):0}</CardBody>
        </Card>
        <Card className="h-40 w-60 m-5 self-center bg-gradient-to-r from-orange-900 to-slate-900 shadow-inner">
          <CardHeader className="font-bold ">Study hours per day</CardHeader>
          <CardBody className="text-7xl mt-[-15px] font-black">{userPrepTimeData.preparationStartDate ? parseFloat(userPrepTimeData.hoursStudy).toFixed(1)/getDateDifference():0}</CardBody>
        </Card>
      </div>
      {userPrepTimeData.test.length === 0 ? (
        <></>
      ) : (
        <>
        <div className="flex justify-center mt-10 text-center p-1 text-small">
        The pie chart below illustrates the overall time taken by you to solve questions and the overall time taken by you to skip questions, both measured in minutes.
          </div>
          <div className="flex justify-center m-auto h-96 w-96 mt-10">
            <Doughnut data={datadoughnut} options={optionsdoughnut} />
          </div>
          <div className="flex justify-center mt-10 text-center p-1 text-small">
          The graph below illustrates the frequency of completed questions over time, measured in minutes since the test started, presented as a cumulative graph
          </div>
          <div className="flex justify-center p-3 lg:pl-52 lg:pr-52 ">
            <Line options={optionsline} data={dataline} />
          </div>
        </>
      )}
      <div className="flex justify-center flex-col mt-10">
        {userPrepTimeData.test.length === 0 ? (
         <> <div className="text-2xl font-black self-center text-center">Give a test to show test statistics</div></>
        ) : (
          <>
            <span className="text-2xl font-black self-center">
              Test : {currentPage}
            </span>
            <span className="text-small self-center">
              <b>Test Date :</b>{" "}
              <i
                dangerouslySetInnerHTML={{
                  __html: userPrepTimeData?.test[currentPage - 1]?.testDate,
                }}
              ></i>
            </span>{" "}
          </>
        )}
      </div>
      <div className="m-5">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>QUESTION</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>TIME TAKEN</TableColumn>
          </TableHeader>
          {userPrepTimeData.test.length === 0 ? (
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          ) : (
            <TableBody>
              {userPrepTimeData.test[currentPage - 1]["testData"].map(
                (item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{item?.question}</TableCell>
                      <TableCell>{item?.status}</TableCell>
                      <TableCell>{item?.timeTaken}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="flex justify-center">
        <Pagination
          total={userPrepTimeData.test.length}
          color="secondary"
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
      <div className="flex justify-center gap-5 mt-5">
        <Button
          size="sm"
          variant="solid"
          color="secondary"
          isDisabled={currentPage <= 1}
          onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="solid"
          color="secondary"
          isDisabled={currentPage >= userPrepTimeData.test.length}
          onPress={() =>
            setCurrentPage((prev) =>
              prev < userPrepTimeData.test.length ? prev + 1 : prev
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ShowReport;
