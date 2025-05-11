// import * as echarts from 'echarts/core';
import React from "react";
import ReactEcharts from "echarts-for-react";
import { Legend } from "recharts";

// import {
//   TitleComponent,
//   TooltipComponent,
//   GridComponent
// } from 'echarts/components';
// import { BarChart } from 'echarts/charts';
// import { CanvasRenderer } from 'echarts/renderers';

// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   BarChart,
//   CanvasRenderer
// ]);
// var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom);
// var option;

const Card3 = ({ lables, Sales, AverageSales }) => {
    const options = {
        legend: {
            orient: 'vertical',
            right: 10,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            // left: '5%',
            // right: '5%',
            // bottom: '3%',
            x: 30,
            x2: 40,
            y: 50,
            y2: 30,
            containLabel: true
        },
        xAxis: {
            name: "Sales (€)",
            nameLocation: "middle",
            type: 'value',
            position: 'bottom',
            axisLine: { show: true },
            boundaryGap: [0, 0.01],
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLabel: {
                color: "black",
            },
            nameTextStyle: {
                color: "black",
                
                padding: 20,
            },
        },
        yAxis: {
            name: "Category",
            nameLocation: "middle",
            // nameGap: 125,
            type: 'category',
            inverse: true,
            axisLine: { show: true },
            axisLabel: { show: true },
            axisTick: { show: false },
            splitLine: { show: false },
            data: lables,
            axisLabel: {
                color: "black",
                
            },
            nameTextStyle: {
                color: "black",
                padding:100
                
            },
        },
        series: [
            {
                name: 'Sales (€)',
                type: 'bar',
                data: Sales,
                itemStyle: {
                    color: "#8FD9FF",
                    barBorderRadius: [5, 5, 5, 5]
                },
            },
            {
                name: 'Average Sales (Previous 8 weeks)',
                type: 'bar',
                data: AverageSales,
                itemStyle: {
                    color: "#C8B0FF",
                    barBorderRadius: [5, 5, 5, 5]
                },
            }
        ]
    };

    return (
        <React.Fragment>
            <ReactEcharts style={{ height: "30rem" }} option={options} />
        </React.Fragment>
    );
}
export default Card3;


