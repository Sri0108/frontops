import React from "react";
import ReactEcharts from "echarts-for-react";

const Card2 = ({ values, labels }) => {
    // const bar_colors = ["#3174a1", "#e1812b", "#3b933c", "#c03e3e", "#9272b1", "#835b53", "#d584be", "#7f7f7f", "#a9a83c", "#2eadb7"]
    const options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return `${params[0].name}<br>${params[0].marker}<span style="float: right; margin-left: 20px"><b>€${params[0].value}</b></span>`;

            }
        },
        legend: {},
        grid: {
            // left: '5%',
            // right: '5%',
            // bottom: '3%',
            x: 80,
            x2: 50,
            y: 30,
            y2: 30,
            containLabel: true
        },
        xAxis: {
            name: "Projected Sales(€)",
            type: 'value',
            axisLine: { show: false },
            boundaryGap: [0, 0.01],
            nameGap: 25,
            nameLocation: 'middle',
            nameTextStyle: {
                color: "black", // Set the "Change (%)" axis name text color to black
                
            },
            axisLabel: {
                formatter: '{value} ',
                color: "black", // Change value text color (right y-axis)
            },
            
        },
        yAxis: {
            name:"Category",
            axisLabel: { show: true },
            nameLocation:"middle",
            
            inverse: true,
            type: 'category',
            data: labels,
            nameTextStyle: {
                color: "black", // Set the "Change (%)" axis name text color to black
                padding:100,
            },
            axisLabel: {
                formatter: '{value} ',
                color: "black", 
            },
        },
        series: [
            {
                label: {
                    show: true,
                    formatter: '€{c}',
                    color: 'black'
                },
                type: 'bar',
                data: values.map((e, index) => {
                    return {
                        value: e,
                        itemStyle: {
                            color: "#C8B0FF",
                            barBorderRadius:[10, 10, 10, 10] 
                        }
                    }
                })
            }
        ]
    };
    return (
        <React.Fragment>
            <ReactEcharts style={{ height: "30rem" }} option={options} />
        </React.Fragment>
    );
};
export default Card2;
