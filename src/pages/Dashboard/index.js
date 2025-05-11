import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, ButtonGroup } from "reactstrap";
import { Responsive, WidthProvider } from "react-grid-layout"
import { getGuestInfo, netSalesInfo, spendingRange, labourTrends, spendingSegments, revenueBreakDown, transactionTimes, events } from "api";
import axios from 'axios';
import CgCoffee from "../../assets/images/img2.svg";
import IoFastFoodOutline from "../../assets/images/img4.svg";
import BiDish from "../../assets/images/img6.svg";
import PopularSpendingRange from "./PopularSpendingRange";
import MonthlyEarning from "./MonthlyEarning";
import ProductWiseSpend from './ProductWiseSpend';
import TrendingComp from "./TrendingComp";
import LabourTrends from "./LabourTrends";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import GridItemContainer from "./GridItemContainer";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Graph1 from "./Graph";
import "./calendarStyles.css"
import "./style.css"
import CalendarComponent from "./calender";
import EventsDetails from "./Events";
import ReactWeather, { useVisualCrossing } from 'react-open-weather';
import { size } from "lodash";
import dollar_icon from '../../assets/images/hub/GrossSales.svg'
import useradd_icon from '../../assets/images/hub/NewGuests.svg'
import users_icon from '../../assets/images/hub/Guests.svg'
import breakfast_icon from '../../assets/images/hub/breakfast.svg'
import lunch_icon from '../../assets/images/hub/lunch.svg'
import idcard_icon from '../../assets/images/hub/labourTrends.svg'
import dinner_icon from '../../assets/images/hub/dinner.svg'
import MyWeather from "./weather-custom";
import LabourSchedule from "./labour_schedule";
import PeakActivity from "./PeakActivity";
import TableContainer from "./TableContainer";

const ResponsiveGridLayout = WidthProvider(Responsive);


const Dashboard = props => {
    const [guest_result, setguest_result] = useState({})
    const [net_sales_result, setnet_sales_result] = useState({})
    const [spending_range, setspending_range] = useState({})
    const [labour_trends, setlabour_trends] = useState({})
    const [spending_segments, setspending_segments] = useState({})
    const [revenue_break_down, setRevenue_break_down] = useState({})
    const [transactionTimesData, setTransactionTimes] = useState({})
    const [EventsData, setEventsData] = useState({})
    const [date, setdate] = useState("13-09-2024");
    const [pins, setpins] = useState(JSON.parse(localStorage.getItem('pins')))
    const [rSelected, setRSelected] = useState(null);
    const [LaborTableHeight, setLaborTableHeight] = useState(1);
    const [EventsTableHeight, setEventsTableHeight] = useState(1);

    console.log(pins);
    // const date = "30-09-2023";
    const labour_data = [
        {
            "Employee": "Rob Smith",
            "Schedule": "9:00AM to 12:00PM",
            "Date": "September 14,2024"
        },
        {
            "Employee": "Rebecca News",
            "Schedule": "9:00AM to 12:00PM",
            "Date": "September 14,2024"
        },
        {
            "Employee": "Rob Smith",
            "Schedule": "9:00AM to 3:00PM",
            "Date": "September 15,2024"
        },
        {
            "Employee": "Rebecca News",
            "Schedule": "9:00AM to 6:00PM",
            "Date": "September 15,2024"
        },
        {
            "Employee": "Ashley  Made",
            "Schedule": "9:00AM to 3:30PM",
            "Date": "September 16,2024"
        },
    ]
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
        window.history.pushState(null, document.title, window.location.href);
    });

    useEffect(() => {
        if (localStorage.getItem('pins') != null) {
            setpins(JSON.parse(localStorage.getItem('pins')))
        }
        setguest_result({})
        setnet_sales_result({})
        setspending_range({})
        setlabour_trends({})
        setspending_segments({})
        setRevenue_break_down({})
        axios.get(getGuestInfo + `?date=${date}`).then(function (response) {
            setguest_result(response.data);
        }).catch((e) => { return e })
        axios.get(netSalesInfo + `?date=${date}`).then(function (response) {
            setnet_sales_result(response.data);
        }).catch((e) => { return e })


        axios.get(spendingRange + `?date=${date}`).then(function (response) {
            setspending_range(response.data);
        }).catch((e) => { return e })

        axios.get(labourTrends + `?date=${date}`).then(function (response) {
            setlabour_trends(response.data);
        }).catch((e) => { return e })

        axios.get(spendingSegments + `?date=${date}`).then(function (response) {
            setspending_segments(response.data);
        }).catch((e) => e)

        axios.get(revenueBreakDown + `?date=${date}`).then(function (response) {
            setRevenue_break_down(response.data);
        }).catch((e) => e)

        axios.get(transactionTimes + `?date=${date}`).then(function (response) {
            setTransactionTimes(response.data);
        }).catch((e) => e)

        axios.get(events + `?date=${date}`).then(function (response) {
            setEventsData(response.data);
        }).catch((e) => e)

    }, [date])

    const customStyles = {
        fontFamily: 'Helvetica, sans-serif',
        // gradientStart: 'white',
        // gradientMid: 'whitesmoke',
        // gradientEnd: 'white',
        locationFontColor: 'black',
        todayTempFontColor: 'black',
        todayDateFontColor: 'black',
        todayRangeFontColor: 'black',
        todayDescFontColor: 'black',
        todayInfoFontColor: 'black',
        todayIconColor: 'grey',
        forecastBackgroundColor: '#FFF',
        forecastSeparatorColor: '#DDD',
        forecastDateColor: '#777',
        forecastDescColor: '#777',
        forecastRangeColor: '#777',
        forecastIconColor: 'grey',
        outerHeight: "1000px",
    };


    const ref = React.createRef()
    document.title = "Opsentrix dashboard";
    const cards = [
        <MonthlyEarning name="Guests" key={1} icon={users_icon} value={guest_result.total_guest_curr_week} percentChange={guest_result.current_week_guests_percentage_change} pin={pins} setpins={setpins} toolText={"Number of guests"} />,
        <LabourTrends name="Labour Trends" icon={idcard_icon} key={2} value={labour_trends} pin={pins} setpins={setpins} toolText={"Number of staff "} />,
        <PopularSpendingRange name="Popular Spending Range" key={3} value={spending_range} pin={pins} setpins={setpins} toolText={"Trend of the two popular spending ranges"} />,
        // <MonthlyEarning name="Average Repeat Customer Visits" icon={"bx bx-repeat"} key={4} value={guest_result.curr_week_avg_repeat_customer} percentChange={guest_result.avg_repeat_customer_percentage_change} pin={pins} setpins={setpins} />,
        <MonthlyEarning name="Gross Sales" key={5} icon={dollar_icon} value={`€ ${net_sales_result.gross}`} percentChange={net_sales_result.gross_profit_or_loss} pin={pins} setpins={setpins} toolText={"Total Gross Sales"} />,
        // <MonthlyEarning name="Guests Return Rate" key={6} icon={"mdi mdi-account-clock-outline"} value={`${guest_result.return_guest_percentage}%`} pin={pins} setpins={setpins} />,
        <MonthlyEarning name="New Guests" key={7} icon={useradd_icon} value={guest_result.new_guest_curr_week} percentChange={guest_result.new_guest_percentage_change} pin={pins} setpins={setpins} toolText={"New guests"} />,
        <Graph1 key={8} name="Spend Segment" result={spending_segments} pin={pins} setpins={setpins} toolText={"Gross Sales by spend segments"} />,
        // <SegmentOverview name="Spending Segments (Total Order)" key={9} />,
        // <MonthlyEarning name="Revenue breakdown" key={9} icon={"dripicons-wallet font-thin"} value={`€ ${revenue_break_down.total_sum_all_current_week}`} percentChange={revenue_break_down.percentage_change_all} pin={pins} setpins={setpins} />,
        <TrendingComp name="Peak Activity" key={10} pin={pins} setpins={setpins} sales={transactionTimesData.sales} avgSales={transactionTimesData.average_sales} transactions={transactionTimesData.transactions} time={transactionTimesData.busiest_time_overall_time_category} day={transactionTimesData.busiest_time_overall_datetime} toolText={"Day and time window of peak sales activity"} />,
        <ProductWiseSpend name="Breakfast" key={11} icon={breakfast_icon} value={revenue_break_down.break_Breakfast} percentChange={revenue_break_down.percentage_change_breakfast_current_week} pin={pins} setpins={setpins} />,
        <ProductWiseSpend name="Lunch" key={12} icon={lunch_icon} value={revenue_break_down.break_Lunch} percentChange={revenue_break_down.percentage_change_lunch_current_week} pin={pins} setpins={setpins} />,
        <ProductWiseSpend name="Dinner" key={13} icon={dinner_icon} value={revenue_break_down.break_Dinner} percentChange={revenue_break_down.percentage_change_dinner_current_week} pin={pins} setpins={setpins} />,
        <PeakActivity name="Peak Activity transaction" key={15} pin={pins} setpins={setpins} sales={transactionTimesData.sales} avgSales={transactionTimesData.average_sales} transactions={transactionTimesData.transactions} time={transactionTimesData.busiest_time_overall_time_category} day={transactionTimesData.busiest_time_overall_datetime} toolText={"Day and time window of peak transaction activity"} />,
        // <ProductWiseSpend name="Happy Hour" key={14} icon={BiDish} value={revenue_break_down.percentage_change_happy_hour_current_week}/>,
    ];
    const cards_upcoming = [
        <EventsDetails name="Events" key={0} events={EventsData} pin={pins} setpins={setpins} setcardheight={setEventsTableHeight} />,
        <MyWeather name="Weather" key={10} pin={pins} setpins={setpins} toolText={"Weather"} />,
        <LabourSchedule name="Labour Schedule" key={14} labour={labour_data} pin={pins} setpins={setpins} setcardheight={setLaborTableHeight} />,


    ];
    const card_layouts = ["card1", 'card2', "card3", "card5", "card7", "graph1", "card9", "card10", "card11", "card12", "card16"];
    const card_layouts_upcoming = ["events", "card13", "card15"];
    const class_layouts = ["red", 'white', "white", "white", "white", "white", "white", "white", "white", "white", "white"];
    const class_layouts_upcoming = ["white", "white", "white"];

    const layouts = {
        lg: [
            {
                "w": 3,
                "h": 1,
                "x": 3,
                "y": 1,
                "i": "card1",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 1,
                "x": 0,
                "y": 4,
                "i": "card2",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 1,
                "x": 3,
                "y": 0,
                "i": "card3",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 1,
                "x": 0,
                "y": 0,
                "i": "card5",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 1,
                "x": 0,
                "y": 1,
                "i": "card7",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 2,
                "x": 0,
                "y": 2,
                "i": "graph1",
                "moved": false,
                "static": false
            },
            {
                "w": 6,
                "h": 1,
                "x": 0,
                "y": 5,
                "i": "card9",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 1,
                "x": 3,
                "y": 2,
                "i": "card10",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 1,
                "x": 3,
                "y": 3,
                "i": "card11",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 1,
                "x": 3,
                "y": 4,
                "i": "card12",
                "moved": false,
                "static": false
            },
            {
                "w": 1,
                "h": EventsData.filtered_events ? EventsData.filtered_events.length * 0.2 + 0.6 : 2,
                "x": 0,
                "y": 1.5,
                "i": "events",
                "moved": false,
                "static": false
            },
            {
                "w": 1,
                "h": 1.5,
                "x": 0,
                "y": 0,
                "i": "card13",
                "moved": false,
                "static": false
            },
            {
                "w": 1,
                "h": labour_data.length * 0.2 + 0.6,
                "x": 0,
                "y": 3.5,
                "i": "card15",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 1,
                "x": 0,
                "y": 6,
                "i": "card16",
                "moved": false,
                "static": false
            },


        ],
        md: [
            {
                "w": 1,
                "h": EventsData.filtered_events ? EventsData.filtered_events.length * 0.2 + 0.6 : 2,
                "x": 0,
                "y": 2,
                "i": "events",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 0,
                "i": "card1",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 2,
                "y": 0,
                "i": "card2",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 1,
                "x": 0,
                "y": 3,
                "i": "card3",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 4,
                "y": 0,
                "i": "card5",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 4,
                "y": 1,
                "i": "card7",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 2,
                "x": 0,
                "y": 1,
                "i": "graph1",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 1,
                "x": 0,
                "y": 4,
                "i": "card9",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 4,
                "y": 2,
                "i": "card10",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 4,
                "y": 3,
                "i": "card11",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 4,
                "y": 4,
                "i": "card12",
                "moved": false,
                "static": false
            }
            ,
            {
                "w": 1,
                "h": 1.5,
                "x": 0,
                "y": 4,
                "i": "card13",
                "moved": false,
                "static": false
            },
            {
                "w": 1,
                "h": labour_data.length * 0.2 + 0.6,
                "x": 0,
                "y": 0,
                "i": "card15",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 4,
                "i": "card16",
                "moved": false,
                "static": false
            },
        ],
        sm: [
            {
                "w": 1,
                "h": EventsData.filtered_events ? EventsData.filtered_events.length * 0.2 + 0.6 : 2,
                "x": 0,
                "y": 2,
                "i": "events",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 0,
                "i": "card1",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 2,
                "y": 0,
                "i": "card2",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 1,
                "x": 0,
                "y": 3,
                "i": "card3",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 4,
                "y": 0,
                "i": "card5",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 4,
                "y": 1,
                "i": "card7",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 2,
                "x": 0,
                "y": 1,
                "i": "graph1",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 1,
                "x": 0,
                "y": 4,
                "i": "card9",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 4,
                "y": 2,
                "i": "card10",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 4,
                "y": 3,
                "i": "card11",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 4,
                "y": 4,
                "i": "card12",
                "moved": false,
                "static": false
            }
            ,
            {
                "w": 1,
                "h": 1.5,
                "x": 0,
                "y": 4,
                "i": "card13",
                "moved": false,
                "static": false
            },
            {
                "w": 1,
                "h": labour_data.length * 0.2 + 0.6,
                "x": 0,
                "y": 0,
                "i": "card15",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 4,
                "i": "card16",
                "moved": false,
                "static": false
            },

        ],
        xs: [
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 0,
                "i": "card1",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 2,
                "y": 0,
                "i": "card2",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 1,
                "x": 0,
                "y": 1,
                "i": "card3",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 2,
                "i": "card5",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 2,
                "y": 2,
                "i": "card7",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 2,
                "x": 0,
                "y": 3,
                "i": "graph1",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 1,
                "x": 0,
                "y": 7,
                "i": "card9",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 5,
                "i": "card10",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 2,
                "y": 5,
                "i": "card11",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 6,
                "i": "card12",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 2,
                "y": 6,
                "i": "card16",
                "moved": false,
                "static": false
            }
        ]
    };
    const layouts_upcoming = {
        lg: [
            {
                "w": 1,
                "h": EventsData.filtered_events ? EventsTableHeight + 0.6 : 2,
                "x": 0,
                "y": 1.5,
                "i": "events",
                "moved": false,
                "static": false
            },
            {
                "w": 1,
                "h": 1.5,
                "x": 0,
                "y": 0,
                "i": "card13",
                "moved": false,
                "static": false
            },
            {
                "w": 1,
                "h": LaborTableHeight + 0.4,
                "x": 0,
                "y": 3.5,
                "i": "card15",
                "moved": false,
                "static": false
            }

        ],
        md: [
            {
                "w": 1,
                "h": EventsData.filtered_events ? EventsTableHeight + 0.6 : 2,
                "x": 0,
                "y": 2,
                "i": "events",
                "moved": false,
                "static": false
            },
            {
                "w": 1,
                "h": 1.5,
                "x": 0,
                "y": 4,
                "i": "card13",
                "moved": false,
                "static": false
            },
            {
                "w": 1,
                "h": LaborTableHeight + 0.4,
                "x": 0,
                "y": 0,
                "i": "card15",
                "moved": false,
                "static": false
            }
        ],
        sm: [
            {
                "w": 1,
                "h": EventsData.filtered_events ? EventsTableHeight + 0.6 : 2,
                "x": 0,
                "y": 2,
                "i": "events",
                "moved": false,
                "static": false
            },
            {
                "w": 1,
                "h": 1.5,
                "x": 0,
                "y": 4,
                "i": "card13",
                "moved": false,
                "static": false
            },
            {
                "w": 1,
                "h": LaborTableHeight + 0.4,
                "x": 0,
                "y": 0,
                "i": "card15",
                "moved": false,
                "static": false
            }
        ],
        xs: [
            {
                "w": 4,
                "h": EventsData.filtered_events ? EventsTableHeight + 0.6 : 2,
                "x": 0,
                "y": 10,
                "i": "events",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 1.5,
                "x": 0,
                "y": 9,
                "i": "card13",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": LaborTableHeight + 0.4,
                "x": 0,
                "y": 0,
                "i": "card15",
                "moved": false,
                "static": false
            }
        ]
    };
    const [breakpoint, setBreakPoint] = useState();
    const handleBreakPointChange = breakpoint => {
        setBreakPoint(breakpoint);
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    {/* <Breadcrumbs title={props.t("Dashboards")} breadcrumbItem={props.t("Dashboard")} /> */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h5 style={{ fontFamily: " 'Poppins', sans-serif", fontSize: "26px", fontWeight: "500", lineHeight: "normal", letterSpacing: "0%", textAlign: "left", color: "black" }}>Hub</h5>
                        <CalendarComponent date={date} set_newdate={setdate} />
                    </div>
                    <Row xs={1} sm={1} lg={2} md={2}>
                        <Col style={{ flexGrow: 1.5 }}>
                            <ButtonGroup style={{ marginLeft: '10px', marginBottom: '10px', }}>
                                <Button
                                    className={rSelected === 1 ? "shadow-none" : "shadow-none"}
                                    outline
                                    onClick={() => setRSelected(prev => prev === 1 ? null : 1)}
                                    active={rSelected === 1}
                                    style={rSelected === 1 ? { color: "var(--Black-shade-500, #3D505C)", border: " 1px solid var(--Black-shade-200, #D8DCDE)", backgroundColor: "var(--Base-White, #FFF)" } : { color: "var(--Black-shade-500, #3D505C)", border: "1px solid var(--Black-shade-200, #D8DCDE)" }}
                                >
                                    12 months
                                </Button>
                                <Button
                                    className={rSelected === 2 ? "shadow-none" : "shadow-none on-hover"}
                                    outline
                                    onClick={() => setRSelected(prev => prev === 2 ? null : 2)}
                                    active={rSelected === 2}
                                    style={rSelected === 2 ? { color: "var(--Black-shade-500, #3D505C)", border: " 1px solid var(--Black-shade-200, #D8DCDE)", backgroundColor: "var(--Base-White, #FFF)" } : { color: "var(--Black-shade-500, #3D505C)", border: "1px solid var(--Black-shade-200, #D8DCDE)" }}
                                >
                                    30 days
                                </Button>
                                <Button
                                    className={rSelected === 3 ? "shadow-none" : "shadow-none on-hover"}
                                    outline
                                    onClick={() => setRSelected(prev => prev === 3 ? null : 3)}
                                    active={rSelected === 3}
                                    style={rSelected === 3 ? { color: "var(--Black-shade-500, #3D505C)", border: " 1px solid var(--Black-shade-200, #D8DCDE)", backgroundColor: "var(--Base-White, #FFF)" } : { color: "var(--Black-shade-500, #3D505C)", border: "1px solid var(--Black-shade-200, #D8DCDE)" }}
                                >
                                    7 days
                                </Button>
                                <Button
                                    className={rSelected === 4 ? "shadow-none" : "shadow-none on-hover"}
                                    outline
                                    onClick={() => setRSelected(prev => prev === 4 ? null : 4)}
                                    active={rSelected === 4}
                                    style={rSelected === 4 ? { color: "var(--Black-shade-500, #3D505C)", border: " 1px solid var(--Black-shade-200, #D8DCDE)", backgroundColor: "var(--Base-White, #FFF)" } : { color: "var(--Black-shade-500, #3D505C)", border: "1px solid var(--Black-shade-200, #D8DCDE)" }}
                                >
                                    24 hours
                                </Button>
                            </ButtonGroup>
                            <ResponsiveGridLayout
                                className="layout"
                                layouts={layouts}
                                onBreakpointChange={handleBreakPointChange}
                                onLayoutChange={(e) => console.log(e)}
                                isDraggable
                                isRearrangeable
                                isResizable
                                draggableHandle=".bx-dots-horizontal"
                                breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
                                cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
                            >
                                {cards.map((item, index) => <GridItemContainer ref={ref} key={card_layouts[index]} item={item} className={class_layouts[index]} />)}
                            </ResponsiveGridLayout>
                        </Col>
                        <Col>
                            <h5 style={{ marginLeft: '25px', marginBottom: '10px', height: '36.53px', display: 'flex', alignItems: 'center', fontSize: '13px' }}>Upcoming</h5>
                            <ResponsiveGridLayout
                                className="layout"
                                layouts={layouts_upcoming}
                                onBreakpointChange={handleBreakPointChange}
                                onLayoutChange={(e) => console.log(e)}
                                isDraggable
                                isRearrangeable
                                isResizable
                                draggableHandle=".bx-dots-horizontal"
                                breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
                                cols={{ lg: 1, md: 1, sm: 1, xs: 1, xxs: 1 }}
                            >
                                {cards_upcoming.map((item, index) => <TableContainer ref={ref} key={card_layouts_upcoming[index]} item={item} className={class_layouts_upcoming[index]} />)}
                            </ResponsiveGridLayout>
                        </Col>
                    </Row>
                </Container>
            </div>

        </React.Fragment>
    );
};

Dashboard.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    // onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);