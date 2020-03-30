import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Chart } from "../Chart/Chart";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Chart className="dashboard__chart" />
      <Sidebar />
    </div>
  );
};

export { Dashboard };
