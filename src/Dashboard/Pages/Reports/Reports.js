import React from "react";
import "./Reports.css";
import Donut from "./Donut";
import Bars from "./Bars";

const Reports = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "rgba(116, 255, 116, 0.145)",
        overflowY: "scroll",
        height: "84.5vh",
      }}
    >
      <Donut />
      <Bars />
    </div>
  );
};

export default Reports;
