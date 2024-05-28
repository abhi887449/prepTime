import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const HowToUse = () => {
  return (
    <div className="m-5 lg:m-10 mb-20">
      <div className="text-3xl font-black mb-5">Help</div>
      <div className="flex">
        <Accordion>
          <AccordionItem
            key="1"
            aria-label="What is PrepTime?"
            title="What is PrepTime?"
          >
            <div>
              PrepTime is a comprehensive tool that will help students in
              optimizing their study routines and enhancing academic
              performance. It offers a range of features to facilitate efficient
              study management and performance analysis:
              <ul class="mt-2 list-disc list-inside">
                <li>Study Time Analysis</li>
                <li>Test Analysis</li>
                <li>Performance Insights</li>
                <li>Last 10 test analysis</li>
                <li>
                  The streak feature helps in motivating students to maintain
                  consistency
                </li>
              </ul>
            </div>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Clock" title="Clock">
            The inclusion of the clock feature in PrepTime serves as a crucial
            time-tracking tool for students. By allowing students to monitor the
            duration of their study sessions, the clock feature empowers
            students to manage their time effectively and make the most out of
            their study sessions. It provides valuable insights into their study
            habits, helping them allocate their time more efficiently and
            maintain a balanced approach to learning.
          </AccordionItem>
          <AccordionItem key="3" aria-label="Timer" title="Timer">
            The timer feature helps students set a timer for a specified
            interval of time and receive notifications. I extended this feature
            by adding an auto-repeat option, allowing students to receive
            notifications after each interval of time they specify.
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Full Length Test"
            title="Full Length Test"
          >
            This feature will assist students during full-length tests. They can
            set the test timer when they begin the test and proceed to solve
            their paper. Each button serves the following purpose:
            <ul class="mt-2 list-disc list-inside">
              <li>
                <span className="text-warning">Start : </span>This button is
                used to start the test timer after specifying the test time.
              </li>
              <li>
                <span className="text-warning">Reset : </span>
                This button is used to reset the test timer if needed.
              </li>
              <li>
                <span className="text-warning">Completed : </span>
                Students will use this button when they complete their answer.
                By clicking the "Completed" button, they can add a timestamp to
                the test data indicating that the question has been solved.
              </li>
              <li>
                <span className="text-warning">Skip : </span>
                Students will use this button when they are unable to solve a
                question and wish to skip it. By clicking the "Skip" button,
                they can add a timestamp to the test data indicating that the
                question has not been solved.
              </li>
              <li>
                <span className="text-warning">Save Test Data : </span>
                Students will use this button when they want to add test data to
                the main test list. This test data will be used to analyze
                student performance.
              </li>
              <li>
                <span className="text-warning">
                  Save Test Data and End Test :{" "}
                </span>
                Students will use this button when they want to add test data to
                the main test list and navigate directly to the report page for
                analysis.
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem key="5" aria-label="Show Report" title="Show Report">
            Here, students will receive a brief description of their
            performance, including details such as total study hours,
            performance in the last 10 tests, and a comprehensive view of all
            test data. This information empowers them to prepare effectively for
            their exams by understanding their strengths and areas for
            improvement.
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default HowToUse;
