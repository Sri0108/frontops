import React from "react";
import ReactEcharts from "echarts-for-react";

const Card4 = () => {
  const lineEChartColors = ["#8FD9FF"]; // Customize the chart color

  const options = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      // left: '5%',
      // right: '5%',
      // bottom: '3%',
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
      data: ["2024-08-12", "2024-08-19", "2024-08-26", "2024-09-02", "2024-09-09"],

    },
    yAxis: {
      type: "value",
      name: "Average Sentiment Score", // Y-axis label
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 12,
        padding: 25, // Space to the left of the axis
      },
      min: 0.20, // Minimum y-axis value
      max: 0.32, // Maximum y-axis valuec 
      interval: 0.02, // Tick interval
      axisLabel: {
        formatter: "{value}", // Format tick labels
        rotate: 45, // Display Y-axis labels at a slanting angle
      },
      axisLine: {
        lineStyle: {
          color: "#8791af",
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
        data: [0.32, 0.25, 0.26, 0.30, 0.21], // Data points
        type: "line",
        smooth: false, // Smooth curves
        symbol: "circle", // Points with circles
        symbolSize: 8, // Circle size
      },
    ],
    color: lineEChartColors,
    textStyle: {
      color: ["#8791af"],
    },
  };

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "30rem" }} option={options} />
    </React.Fragment>
  );
};

export default Card4;
