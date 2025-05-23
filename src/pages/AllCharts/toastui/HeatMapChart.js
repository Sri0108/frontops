import React from "react"

import "tui-chart/dist/tui-chart.css"
import { HeatMapChart } from "@toast-ui/react-chart"
import TuiChart from "tui-chart"
import "./toastui.scss"

const theme = {
  chart: {
    background: {
      color: "#fff",
      opacity: 0
    }
  },
  title: {
    color: "#8791af"
  },
  xAxis: {
    title: {
      color: "#8791af"
    },
    label: {
      color: "#8791af"
    },
    tickColor: "#8791af"
  },
  yAxis: {
    title: {
      color: "#8791af"
    },
    label: {
      color: "#8791af"
    },
    tickColor: "#8791af"
  },
  plot: {
    lineColor: "rgba(166, 176, 207, 0.1)"
  },
  legend: {
    label: {
      color: "#8791af"
    }
  },
  series: {
    startColor: "#556ee6",
    endColor: "#139c4c",
    overColor: "#75b5aa",
    borderColor: "#F4511E"
  }
}
TuiChart.registerTheme("skoteTheme", theme)

const ProfileMenu = props => {
  const data = {
    categories: {
      x: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      y: ["Seoul", "Seattle", "Sydney", "Moskva", "Jungfrau"],
    },
    series: [
      [-3.5, -1.1, 4.0, 11.3, 17.5, 21.5, 24.9, 25.2, 20.4, 13.9, 6.6, -0.6],
      [3.8, 5.6, 7.0, 9.1, 12.4, 15.3, 17.5, 17.8, 15.0, 10.6, 6.4, 3.7],
      [22.1, 22.0, 20.9, 18.3, 15.2, 12.8, 11.8, 13.0, 15.2, 17.6, 19.4, 21.2],
      [-10.3, -9.1, -4.1, 4.4, 12.2, 16.3, 18.5, 16.7, 10.9, 4.2, -2.0, -7.5],
      [
        -13.2,
        -13.7,
        -13.1,
        -10.3,
        -6.1,
        -3.2,
        0.0,
        -0.1,
        -1.8,
        -4.5,
        -9.0,
        -10.9,
      ],
    ],
  }

  const options = {
    chart: {
      width: props.chartWidth,
      height: 380,
      title: "24-hr Average Temperature",
    },
    yAxis: {
      title: "City",
    },
    xAxis: {
      title: "Month",
    },
    series: {
      showLabel: true,
    },
    tooltip: {
      suffix: "°C",
    },
  }

  return (
    <React.Fragment>
      <HeatMapChart data={data} options={options} theme={theme} />
    </React.Fragment>
  )
}
export default HeatMapChart
