import React from "react";
import ReactEcharts from "echarts-for-react";
import { reverse } from "lodash";
import { interval } from "date-fns";

export default function BS1() {
  const data=  [
    {"combination": ["Bruin brood", "Vlees", "12 uurtje"], "count": 402},
        {"combination": ["Appeltaart", "Met slagroom", "Koffie"], "count": 316},
        {"combination": ["Bruin brood", "Vis", "12 uurtje"], "count": 296},
        {"combination": ["Sourcy Rood", "Cappucino", "Koffie"], "count": 236},
        {"combination": ["Lipton ice tea", "Pepsi", "1x Tapas onbeperkt"], "count": 229},
        {"combination": ["Thee", "Cappucino", "Koffie"], "count": 214},
        {"combination": ["Pepsi", "Pepsi max", "1x Tapas onbeperkt"], "count": 206},
        {"combination": ["Verse thee", "Cappucino", "Koffie"], "count": 200},
        {"combination": ["Lipton ice tea green", "Cappucino", "Koffie"], "count": 199}

]

    const option = {
        // title: {
        //   text: 'Menu items most commonly ordered together in 2024'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          top:'10',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: { 
          type: 'value',
          min: 0,
          max:400,
          interval:50,
          name: "Count",
          nameLocation: "middle",
          nameTextStyle: {
            fontWeight: "bold",
            fontSize: 12,
            padding: 10, // Space below the axis
          },
          boundaryGap: [0, 0.001]
        },
        yAxis: {
          type: 'category',
          name: "Combination",
          nameLocation: "middle",
          nameTextStyle: {
            fontWeight: "bold",
            fontSize: 12,
            padding: 300, // Space below the axis
          },
          data: data.map(e=>e.combination),
          inverse:true
        },
        series: [
          {
            // name: '2011',
            type: 'bar',
            data: data.map(e=>e.count),
            color: '#C8B0FF'
          }
        ]
      };

      return (
        <React.Fragment>
            <ReactEcharts style={{ height: "30rem" }} option={option} />
        </React.Fragment>
    );
}