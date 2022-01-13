import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";

const Graph = (props) => {
  const xAxis = props.xAxis;
  const yAxis = props.yAxis;
  console.log("xAxis", xAxis, yAxis);
  const [data, setData] = useState([]);

  // const data = [{ argument: xAxis, value: yAxis }];

  useEffect(() => {
    for (let i = 0; i < xAxis.length; i++) {
      setData((prevState) => [
        ...prevState,
        { argument: xAxis[i], value: yAxis[i] },
      ]);
    }
    // console.log("data", data);
  }, []);
  return (
    <Paper>
      {
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="value" argumentField="argument" />
        </Chart>
      }
    </Paper>
  );
};

export default Graph;
