import React from "react";
import ReactEcharts from "echarts-for-react";

export default function BS2({ values }) {
    const items = [...Object.keys(values.top_5_revenue_items), ...Object.keys(values.bottom_5_revenue_items)];
    const ivalues = [...Object.values(values.top_5_revenue_items), ...Object.values(values.bottom_5_revenue_items)];
    const option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            }
        },
        grid: {
            top: "10",
            left: "15%",
            right: "10%"
        },
        xAxis: {
            type: "value",
            position: "bottom",
            splitLine: {
                lineStyle: {
                    type: "dashed"
                }
            },
            name: "Revenue (€)",
            nameLocation: "middle",
            nameTextStyle: {
                fontWeight: "bold",
                fontSize: 12,
                padding: 10
            },
        },
        yAxis: {
            type: "category",
            name: "Menu Item",
            nameLocation: "middle",
            nameTextStyle: {
                fontWeight: "bold",
                fontSize: 12,
                padding: 100
            },
            data: items,
            axisLine: { show: false },
            axisLabel: { show: true },
            axisTick: { show: false },
            splitLine: { show: false },

            inverse: true
        },
        series: [
            {
                name: "Revenue (€)",
                type: "bar",
                stack: "Total",
                data: ivalues.map((value) => ({
                    value,
                    itemStyle: { color: value >= 0 ? "#8FD9FF" : "#C8B0FF" }
                })),
                label: {
                    formatter: "{b}"
                }
            }
        ]
    };
    return (
        <React.Fragment>
            <ReactEcharts style={{ height: "30rem" }} option={option} />
        </React.Fragment>
    );
}