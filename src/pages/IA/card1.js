import React from "react";
import ReactEcharts from "echarts-for-react";
import Chart from "react-apexcharts";
// import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const Card1 = ({ data }) => {



    const options = {
        legend:{},
        grid: {
            zlevel: 0,
            x: 80,
            x2: 50,
            y: 30,
            y2: 30,
            borderWidth: 0,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0)",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                crossStyle: {
                    color: "black",
                },
            },
        },
        xAxis: [
            {
                type: "category",
                data: ["Day Before", "Day Of", "Day After"],
                axisPointer: {
                    type: "shadow",
                },
                axisLine: {
                    lineStyle: {
                        color: "#8791af",
                    },
                },
                axisLabel: {
                    color: "black", // Set the x-axis label color to black
                },
                splitLine: {
                    show: true, // Enable vertical grid lines
                    lineStyle: {
                        color: "rgba(166, 176, 207, 0.1)", // Light gray grid lines
                    },
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "Sales (€)",
                min: 0,
                max: 6000,
                interval: 1000,
                axisLine: {
                    lineStyle: {
                        color: '#8FD9FF',
                        width: 1, // Border for the left y-axis
                        type: 'solid', // Border style
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(166, 176, 207, 0.1)"
                    }
                },
                axisLabel: {
                    formatter: '{value}',
                    color: "black", // Sales value text color (left y-axis)
                },
                nameTextStyle: {
                    color: "black", // Set the "Sales" axis name text color to black
                },
            },
            {
                type: "value",
                name: "Change (%)",
                min: -50, // Adjusted to create space above the -25 value
                max: 150,
                interval: 25,
                axisLine: {
                    lineStyle: {
                        color: '#8FD9FF'
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(166, 176, 207, 0.1)"
                    }
                },
                axisLabel: {
                    formatter: '{value} ',
                    color: "black", 
                },
                nameTextStyle: {
                    color: "black", 
                },
            },
        ],
        series: [
            {
                name: "Sales (€)",
                type: "bar",
                data: [3279.8, 2481.26, 5955.85],
                itemStyle: {
                    color: "#8FD9FF" ,// Bar color done
                    barBorderRadius:[15, 15, 15, 15] 
                },
            },
            {
                name: "Change (%)",
                type: "line",
                yAxisIndex: 1,
                data: [-24.34721629367644, 140.03328953837968],
                lineStyle: {
                    color: "#C8B0FF",
                },
                itemStyle: {
                    color: "#C8B0FF"
                },
            },
        ],
        textStyle: {
            color: "#139c4c",
        },
    };
    // const options = {
    //     series: [{
    //     name: 'series1',
    //     data: [31, 40, 28, 51, 42, 109, 100]
    //   }, {
    //     name: 'series2',
    //     data: [11, 32, 45, 32, 34, 52, 41]
    //   }],
        
    //   dataLabels: {
    //     enabled: false
    //   },
    //   stroke: {
    //     curve: 'smooth'
    //   },
    //   xaxis: {
    //     type: 'datetime',
    //     categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    //   },
    //   tooltip: {
    //     x: {
    //       format: 'dd/MM/yy HH:mm'
    //     },
    //   },
    //   };
    return (
        <React.Fragment>
            <ReactEcharts style={{ height: "30rem", }} option={options} />
            
        </React.Fragment>
    );
};

export default Card1;