import React from "react";
import ReactEcharts from "echarts-for-react";

const Card6 = () => {
  const options = {
    tooltip: {
      trigger: 'axis'
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
      name: 'Date',
      nameLocation: 'middle',
      nameGap: 25,
      position: 'bottom',
      type: 'category',
      data: ["2024-09-14", "2024-09-21", "2024-09-17"]
    },
    yAxis: {
      type: 'value',
      nameLocation: 'middle',
      // nameGap: 50,
      axisLine: { show: true },
      name: 'Projected Total Sales (€)',
      nameTextStyle: {
        padding: 30, // Space to the left of the axis
      },
    },
    series: [
      {
        data: [7410.45, 7410.45, 6079.3],
        type: 'bar',
        color: '#C8B0FF'
      }
    ]
  };

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "30rem" }} option={options} />
    </React.Fragment>
  );
}

export default Card6;

