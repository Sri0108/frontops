import React from "react";
import ReactEcharts from "echarts-for-react";

const BS4 = ({ data }) => {
    let x_data = data.Forecasted_Revenue_Comp.map((item) => item.Month)
    let y_data = data.Forecasted_Revenue_Comp.map((item) => item["Q4 2023 Actual"])
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
            name: 'Month',
            nameLocation: 'middle',
            nameGap: 25,
            position: 'bottom',
            type: 'category',
            data: x_data,
            
        },
        yAxis: {
            type: 'value',
            nameLocation: 'middle',
            // nameGap: 50,
            axisLine: { show: true },
            name: 'Revenue (€)',
            nameTextStyle: {
                padding: 40, // Space to the left of the axis
            },
        },
        series: [
            {
                data: [143955.9, 146325.11, 166921.25, {
                    value: 164343.47,
                    itemStyle: {
                        color: '#8FD9FF'
                    }
                }, {
                        value: 164343.47,
                        itemStyle: {
                            color: '#8FD9FF'
                        }
                    }, {
                        value: 164343.47,
                        itemStyle: {
                            color: '#8FD9FF'
                        }
                    }],
                type: 'bar',
                color: '#C8B0FF',
                barWidth: 50,
            }
        ]
    };

    return (
        <React.Fragment>
            <ReactEcharts style={{ height: "30rem" }} option={options} />
        </React.Fragment>
    );
}

export default BS4;

