import { useEffect, useState } from 'react';
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css';
import PrepTimeNavbar from "@/components/PrepTimeNavbar"

const clock = () => {
    const currenttime = new Date()
    const [value, setValue] = useState(currenttime);
    const [digitaltime,setDigitaltime]=useState(`${currenttime.getHours()}:${currenttime.getMinutes()}:${currenttime.getSeconds()}:${currenttime.getMilliseconds()} `)
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
    const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]


  useEffect(() => {
    const interval = setInterval(() => {
        const newtime = new Date()
        setValue(newtime)
        setDigitaltime(`${newtime.getHours()}:${newtime.getMinutes()}:${newtime.getSeconds()}:${newtime.getMilliseconds()} `)
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className='mb-20'>
    <PrepTimeNavbar/>
    <div className='flex justify-center mt-[6vh]'>
      <Clock value={value} size={300} hourMarksWidth={4} hourMarksLength={15} />
    </div>
    <div className='flex flex-col mt-9 m-auto h-32 w-32 bg-white rounded-2xl'>
        <div className='flex justify-center pt-1 text-lg font-bold bg-warning w-32 h-9 rounded-t-2xl'>{months[value.getMonth()]}</div>
        <div className='flex justify-center pt-1 text-6xl font-bold text-black'>{value.getDate()}</div>
        <div className='flex justify-center text-lg font-bold text-black w-32 h-9'>{days[value.getDay()]}</div>
    </div>
      </div>
  )
}

export default clock