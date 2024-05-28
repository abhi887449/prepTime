import {create} from "zustand";

import { devtools, persist } from "zustand/middleware";

function getDateDifferenceInHours(startDate) {
    // Convert dates to milliseconds
    const startD = new Date(startDate)
    const endDate = new Date()
    const startMillis = startD.getTime();
    const endMillis = endDate.getTime();

    // Calculate the difference in milliseconds
    const differenceMillis = endMillis - startMillis;

    // Convert milliseconds to hours
    const differenceHours = differenceMillis / (1000 * 60 * 60);
    return differenceHours;
}

const prepTimeStore = (set) => ({
  userPrepTimeData: {
    test: [],
    hoursStudy: 0,
    streakDays: 0,
    userName: "",
    preparationStartDate: null,
    examDate: null,
    examName: null,
    status: "resting",
    lastVisitedDay: null,
    learningStartedAt: null,
  },
  addTest: (testData) => {
    set((state) => ({
      userPrepTimeData: {
        ...state.userPrepTimeData,
        test: [testData, ...state.userPrepTimeData.test],
      },
    }));
  },
  updateStatusStuding: () => {
    set((state) => ({
      userPrepTimeData: {
        ...state.userPrepTimeData,
        status: "Studying",
        learningStartedAt: new Date()
      },
    }));
  },
  updateStatusResting: () => {
    set((state) => ({
      userPrepTimeData: {
        ...state.userPrepTimeData,
        status: "Resting",
        hoursStudy:parseFloat(state.userPrepTimeData.hoursStudy)+parseFloat(getDateDifferenceInHours(state.userPrepTimeData.learningStartedAt)),
        learningStartedAt:null
      },
    }));
  },
  addUserData: (userData) => {
    set((state) => ({
        userPrepTimeData: {
        ...state.userPrepTimeData,
        userName: userData.userName,
        lastVisitedDay: userData.lastVisitedDay,
        preparationStartDate: userData.preparationStartDate,
        examDate: userData.examDate,
        examName: userData.examName,
        hoursStudy: 0,
        streakDays: 1,
        status: "Resting",
        learningStartedAt: null,
      },
    }));
  },
  setStreakOne: () => {
    set((state) => ({
        userPrepTimeData: {
        ...state.userPrepTimeData,
        streakDays: 1,
        lastVisitedDay: new Date().toLocaleDateString()
      },
    }));
  },
  setStreakIncremented: () => {
    set((state) => ({
        userPrepTimeData: {
        ...state.userPrepTimeData,
        streakDays: ++state.userPrepTimeData.streakDays,
        lastVisitedDay: new Date().toLocaleDateString()
      },
    }));
  },
});

const usePrepTimeStore = create(
  devtools(
    persist(prepTimeStore, {
      name: "prepTime",
    })
  )
);

export default usePrepTimeStore;
