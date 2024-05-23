import create from "zustand";

import { devtools, persist } from "zustand/middleware";

const prepTimeStore = (set) => ({
  courses: {
    userName: null,
    
  },
  addCourse: (course) => {
    set((state) => ({
      courses: [course, ...state.courses],
    }));
  },
  removeCourse: (courseId) => {
    set((state) => ({
      courses: state.courses.filter((c) => c.id !== courseId),
    }));
  },
  toggleCourseStatus: (courseId) => {
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? { ...course, completed: !course.completed }
          : course
      ),
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

export default useCourseStore;
