import usePrepTimeStore from "@/store/prepTimeStore";
import { Button } from "@nextui-org/react";
import React from "react";

const StartRelaxStudy = () => {
  const {
    userPrepTimeData,
    updateStatusStuding,
    updateStatusResting,
    setStreakIncremented,
    setStreakOne,
  } = usePrepTimeStore((state) => ({
    userPrepTimeData: state.userPrepTimeData,
    updateStatusStuding: state.updateStatusStuding,
    updateStatusResting: state.updateStatusResting,
    setStreakIncremented: state.setStreakIncremented,
    setStreakOne: state.setStreakOne,
  }));
  function isDifferenceOneDay(startDate) {
    // Convert dates to milliseconds
    const startMillis = new Date(startDate).getTime();
    const endMillis = new Date(new Date().toLocaleDateString()).getTime();

    // Calculate the absolute difference in milliseconds
    const differenceMillis = Math.abs(endMillis - startMillis);

    // Calculate the number of milliseconds in a day
    const millisecondsInDay = 1000 * 60 * 60 * 24;

    // Check if the difference is exactly 1 day
    // console.log(startDate)
    return differenceMillis === millisecondsInDay;
  }
  const handleStartStudy = () => {
    updateStatusStuding();
    if (userPrepTimeData.streakDays >= 1) {
      let todayDate = new Date().toLocaleDateString();
      if (!(todayDate === userPrepTimeData.lastVisitedDay)) {
        if (isDifferenceOneDay(userPrepTimeData.lastVisitedDay)) {
          setStreakIncremented();
        } else {
          setStreakOne();
        }
      }
    }
  };
  return (
    <div className="flex flex-col mt-10 gap-7 mb-3">
      <Button
        onClick={handleStartStudy}
        isDisabled={userPrepTimeData.status === "Studying"}
        size="lg"
        className="self-center"
        color="success"
      >
        Start Study
      </Button>
      <Button
        onClick={updateStatusResting}
        isDisabled={userPrepTimeData.status === "Resting"}
        size="lg"
        className="self-center"
        color="warning"
      >
        Take a Break
      </Button>

    </div>
  );
};

export default StartRelaxStudy;
