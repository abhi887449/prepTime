import usePrepTimeStore from "@/store/prepTimeStore";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetailForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    exam: "",
    examDate: "",
  });
  const { addUserData } = usePrepTimeStore((state) => ({
    addUserData: state.addUserData,
  }));
  const onchangeInput = (e) => {
    if (e.target.name === "exam" || e.target.name === "name") {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value.toUpperCase(),
      });
      return;
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (userData.name.length === 0) {
      toast.error("Enter at least one character in name", {
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
    } else if (userData.exam.length === 0) {
      toast.error("Enter at least one character in exam name", {
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
    } else if (userData.examDate.length === 0) {
      toast.error("Select a date", {
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
    } else {
        toast.success("User data added successfully", {
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
      addUserData({
        userName: userData.name,
        lastVisitedDay: new Date().toLocaleDateString(),
        preparationStartDate: new Date().toLocaleDateString(),
        examDate: userData.examDate,
        examName: userData.exam,
      });
      
    }
  };
  return (
    <div>
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
      <Card className="flex m-auto w-96 mt-10">
        <CardHeader className="text-justify text-danger p-3 self-center">
          Note: Before navigating app please fill this form otherwise your
          statistics data will be incorrect
        </CardHeader>
        <CardBody>
          <Input
            type="text"
            name="name"
            value={userData.name}
            onChange={(e) => onchangeInput(e)}
            label="Name"
          />
          <Input
            className="mt-3"
            value={userData.exam}
            onChange={(e) => onchangeInput(e)}
            name="exam"
            type="text"
            label="What exam are you preparing for?"
          />
          <Input
            className="mt-3"
            value={userData.examDate}
            onChange={(e) => onchangeInput(e)}
            name="examDate"
            type="date"
            label="When will your exam be held?"
          />
          <div className="flex justify-center mt-5 gap-5 mb-3">
            <Button color="success" onClick={handleSubmit}>
              Submit
            </Button>
            <Button color="danger">Reset</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserDetailForm;
