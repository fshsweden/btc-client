// import "./styles.css";
import React, { useState, useEffect } from "react";

const STATUS_STATES = ["Online", "Wip", "Offline"];
const STATUS_COLORS = ["green", "orange", "red"];

const Switch = ({ label, color, onClick }) => (
  <div
    onClick={onClick}
    style={{ borderRadius: 5, height: 25, width: 60, background: color, margin: 2 }}
  >{label}</div>
);

// const Switch = () => {
//   const [status, setStatus] = useState(0);

//   const handleClick = () => {
//     const newStatus = (status + 1) % STATUS_STATES.length;
//     setStatus(newStatus);
//   };

//   const text = STATUS_STATES[status];

//   return (
//     <>
//       <Selection onClick={handleClick} color={STATUS_COLORS[status]} />
//       <Selection onClick={handleClick} color={STATUS_COLORS[status]} />
//       <Selection onClick={handleClick} color={STATUS_COLORS[status]} />
//       <Selection onClick={handleClick} color={STATUS_COLORS[status]} />
//       <div onClick={handleClick}>{text}</div>
//     </>
//   );
// };

export default Switch;