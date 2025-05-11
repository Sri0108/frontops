import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts';

const Card5 = () => {
  const lineEChartColors = ["#e37900"]; // Customize the chart color

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
      type: 'value',
      name: "Total Discount Amount(Euro)",
      position: 'bottom',
      nameLocation: 'middle',
      nameGap: 25,
      axisLine: { show: true }
      // inverse:true,
    },
    yAxis: {
      type: 'category',
      data: ['Catering', 'Zonder Bier', 'Ginger Beer', 'Tonic', 'Rose Lemonade'],
      inverse: true,
      name: "Item Name",
      nameLocation: "middle",
      // nameGap: 90,
      nameTextStyle: {
        padding: 100, // Space to the left of the axis
      },

    },
    series: [
      {
        data: [-0.01, -3.0, -3.25, -3.25, -3.5],
        type: 'bar',
        color: "#8FD9FF"
      }
    ]
  };

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "30rem" }} option={options} />
    </React.Fragment>
  );
};

export default Card5;
