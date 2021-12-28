import React, { useState } from "react";
import "./Weight.css";
import "./Queries.css";
import trashbin from "../img/trash-bin.png";

const Weight = ({ weight, deleteWeightComponent }) => {
  const [today, setToday] = useState(new Date());
  const [time, setTime] = useState(today.getHours() + ":" + today.getMinutes());
  const [dateDay, setDateDay] = useState(today.getDate());
  const [dateMonth, setDateMonth] = useState(today.getMonth());

  return (
    <div className="weight-box">
      <p>{weight} kg</p>
      <p className="weight-box-date">{`${dateMonth}/${dateDay}, ${time}`}</p>
      {/* <img
        src={trashbin}
        alt="trash bin"
        className="trash-bin"
        // onClick={deleteWeightComponent(key)}
        onClick={console.log(key)}
      /> */}
    </div>
  );
};

export default Weight;
