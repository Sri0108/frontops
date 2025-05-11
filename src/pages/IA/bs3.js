import React from "react";
import ReactEcharts from "echarts-for-react";

const BS3 = () => {
  const lineEChartColors = ["#8FD9FF"]; // Customize the chart color

  const options = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      x: 50,
      x2: 50,
      y: 30,
      y2: 30,
      containLabel: true
    },

    xAxis: {
      type: "category",
      name: "Week Of", // X-axis label
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 12,
        padding: 20, // Space below the axis
      },
      data: ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06","2024-07","2024-08","2024-09"],
      axisLine: { show: true }, // Show X-axis line
      axisTick: { show: true }, // Show ticks
      splitLine: { show: true }
    },
    yAxis: {
      type: "value",
      name: "Average Sentiment Score", // Y-axis label
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 12,
        padding: 30, // Space to the left of the axis
      },
      min: 0.014, // Minimum y-axis value
      max: 0.026, // Maximum y-axis valuec 
      interval: 0.002, // Tick interval
      axisLabel: {
        formatter: "{value}", // Format tick labels
      },
      axisLine: {
        lineStyle: {
          color: "#8FD9FF",
        },
      },

      splitLine: {
        lineStyle: {
          color: "rgba(0, 0, 0, 0.1)", // Gridline color
        },
      },
    },
    series: [
      {
        data: [0.014358156889495224, 0.01683869713506139, 0.021848959072305593, 0.02040482537517053, 0.021680708049113234, 0.021604316507503413, 0.019190765347885403,  0.0246676002728513, 0.0234036275579809], // Data points
        type: "line",
        smooth: false, // Smooth curves
        symbol: "circle", // Points with circles
        symbolSize: 8, // Circle size
      },
    ],
    color: lineEChartColors,
    textStyle: {
      color: ["#8FD9FF"],
    },
  };

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "30rem" }} option={options} />
    </React.Fragment>
  );
};

export default BS3;
