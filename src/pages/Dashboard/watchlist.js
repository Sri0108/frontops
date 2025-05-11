import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Card, CardBody, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout"
import { getGuestInfo, netSalesInfo, spendingRange, labourTrends, spendingSegments, revenueBreakDown, transactionTimes, events } from "api";
import axios from 'axios';
import classNames from "classnames";
import CgCoffee from "../../assets/images/img2.svg";
import IoFastFoodOutline from "../../assets/images/img4.svg";
import PiClockUser from "../../assets/images/img5.svg";
import BiDish from "../../assets/images/img6.svg";
//import Charts
import ReactApexChart from "react-apexcharts"

import PopularSpendingRange from "./PopularSpendingRange";
//import action
// import { getChartsData as onGetChartsData } from "../../store/actions";

// Image
import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import MonthlyEarning from "./MonthlyEarning";

import ProductWiseSpend from './ProductWiseSpend';

import TrendingComp from "./TrendingComp";

import LabourTrends from "./LabourTrends";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { createSelector } from "reselect";
import SegmentOverview from "./SegmentOverview";
import GridItemContainer from "./GridItemContainer";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Graph1 from "./Graph";
import "./calendarStyles.css"
import "./style.css"
import CalendarComponent from "./calender"
import EventsDetails from "./Events";
import dollar_icon from '../../assets/images/hub/GrossSales.svg'
import useradd_icon from '../../assets/images/hub/NewGuests.svg'
import users_icon from '../../assets/images/hub/Guests.svg'
import breakfast_icon from '../../assets/images/hub/breakfast.svg'
import lunch_icon from '../../assets/images/hub/lunch.svg'
import idcard_icon from '../../assets/images/hub/labourTrends.svg'
import dinner_icon from '../../assets/images/hub/dinner.svg'
import LabourSchedule from "./labour_schedule";
import PeakActivity from "./PeakActivity";

const ResponsiveGridLayout = WidthProvider(Responsive);

function removeElementsByIndices(arr, indices) {
    // Sort indices in descending order to avoid index shift issues
    indices.sort((a, b) => b - a);

    // Remove elements at the specified indices
    for (let index of indices) {
        if (index >= 0 && index < arr.length) {
            arr.splice(index, 1);
        }
    }

    return arr;
}


const Watchlist = props => {
    const [guest_result, setguest_result] = useState({})
    const [net_sales_result, setnet_sales_result] = useState({})
    const [spending_range, setspending_range] = useState({})
    const [labour_trends, setlabour_trends] = useState({})
    const [spending_segments, setspending_segments] = useState({})
    const [revenue_break_down, setRevenue_break_down] = useState({})
    const [transactionTimesData, setTransactionTimes] = useState({})
    const [EventsData, setEventsData] = useState({})
    const [LaborTableHeight, setLaborTableHeight] = useState(1);
    const [EventsTableHeight, setEventsTableHeight] = useState(1);
    const [date, setdate] = useState("13-09-2024");
    const [pins, setpins] = useState(JSON.parse(localStorage.getItem('pins')))
    const [cards, setcards] = useState([])

    const labour_data =[
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
        }
        
    ]

    const master_card_layout = ["events", "card1", 'card2', "card3", "card4", "card5", "card6", "card7", "graph1", "card8", "card9", "card10", "card11", "card12", "card13","card15","card16"]
    const class_layouts = ["white", "white", 'white', "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white","my-scroll","white"];

    let user_id = JSON.parse(localStorage.getItem("authUser")).uid;

    const ref = React.createRef()
    document.title = "Opsentrix dashboard";
    const [layouts, setlayouts] = useState({
        lg: [
            {
                "w": 6,
                "h": 2,
                "x": 6,
                "y": 3,
                "i": "events",
                "moved": false,
                "static": false
            },
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
                "w": 6,
                "h": 1,
                "x": 6,
                "y": 0,
                "i": "card13",
                "moved": false,
                "static": false
            },
            {
                "w": 6,
                "h": 2,
                "x": 6,
                "y": 1,
                "i": "card15",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 1,
                "x": 0,
                "y": 4,
                "i": "card16",
                "moved": false,
                "static": false
            },
        ],
        md: [
            {
                "w": 4,
                "h": 2,
                "x": 6,
                "y": 3,
                "i": "events",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 1,
                "x": 0,
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
                "x": 3,
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
                "w": 4,
                "h": 1,
                "x": 6,
                "y": 0,
                "i": "card13",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 2,
                "x": 6,
                "y": 1,
                "i": "card15",
                "moved": false,
                "static": false
            }, {
                "w": 4,
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
                "w": 4,
                "h": 2,
                "x": 2,
                "y": 7,
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
                "x": 0,
                "y": 1,
                "i": "card2",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 2,
                "i": "card3",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 4,
                "y": 4,
                "i": "card5",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 2,
                "y": 4,
                "i": "card7",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 2,
                "x": 2,
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
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 3,
                "i": "card10",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 4,
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
                "w": 4,
                "h": 1,
                "x": 2,
                "y": 6,
                "i": "card13",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 2,
                "x": 2,
                "y": 0,
                "i": "card15",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
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
                "w": 4,
                "h": 2,
                "x": 0,
                "y": 10,
                "i": "events",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 2,
                "i": "card1",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 2,
                "y": 2,
                "i": "card2",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
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
                "x": 0,
                "y": 4,
                "i": "card5",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 2,
                "y": 3,
                "i": "card7",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 2,
                "x": 0,
                "y": 5,
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
                "x": 2,
                "y": 4,
                "i": "card10",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 0,
                "y": 8,
                "i": "card11",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 1,
                "x": 2,
                "y": 8,
                "i": "card12",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 1,
                "x": 0,
                "y": 9,
                "i": "card13",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 2,
                "x": 0,
                "y": 0,
                "i": "card15",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 1,
                "x": 0,
                "y": 4,
                "i": "card16",
                "moved": false,
                "static": false
            },
        ]
    })
    function arrange_cards(cards) {
        var final = [];
        var maxwidth = [12, 10, 6, 6]
        Object.values({ ...cards }).forEach((screen_type, screen_type_index) => {
            var hashmap = {}
            var final_temp = []
            screen_type.forEach(e => {
                if (e.h in hashmap) {
                    hashmap[e.h].push(e)
                    hashmap[e.h].sort((a, b) => a.w - b.w)
                }
                else {
                    hashmap[e.h] = [e]
                }
            })
            console.log(screen_type_index)
            var temp = 0, extra_height_buff = {};
            Object.values(hashmap).forEach(level => {
                level.forEach(e => {
                    // assume that the space is not enought due to the excess height of previous card. 
                    // check if this card will fit in the existing space else ignore the space as the excess height will occur later
                    // temp % maxwidth[screen_type_index] and temp+e.w % maxwidth[screen_type_index] will encounter excess height
                    console.log(temp, temp + e.w)

                    // if space is not enough to fit the upcoming card ignore the whole space
                    if (maxwidth[screen_type_index] - (temp % maxwidth[screen_type_index]) < e.w) {
                        temp += maxwidth[screen_type_index] - (temp % maxwidth[screen_type_index])
                        console.log("Not enough space", temp, e.w)
                    }
                    while ((temp % maxwidth[screen_type_index]) in extra_height_buff) {
                        var prev_card = temp % maxwidth[screen_type_index];
                        extra_height_buff[prev_card][0] -= 1
                        temp += extra_height_buff[temp % maxwidth[screen_type_index]][1]
                        if (extra_height_buff[prev_card][0] === 0) {
                            delete extra_height_buff[prev_card]
                        }
                        console.log("occupied by height card", temp)
                    }
                    // if space is not enough to fit the upcoming card ignore the whole space
                    if (maxwidth[screen_type_index] - (temp % maxwidth[screen_type_index]) < e.w) {
                        temp += maxwidth[screen_type_index] - (temp % maxwidth[screen_type_index])
                        console.log("Not enough space", temp, e.w)
                    }
                    var space_available = Object.keys(extra_height_buff).find(ex_card => {
                        if ((temp + e.w) % maxwidth[screen_type_index] === 0)
                            return temp % maxwidth[screen_type_index] < ex_card && ex_card < 12
                        else
                            return temp % maxwidth[screen_type_index] < ex_card && ex_card < (temp + e.w) % maxwidth[screen_type_index]
                    });
                    if (space_available) {
                        var pos = Number.parseInt(space_available)
                        console.log(temp + (pos - temp % maxwidth[screen_type_index] + extra_height_buff[pos][1]))
                        console.log("Will not fit skip the avaliable space")
                        temp += (pos - temp % maxwidth[screen_type_index] + extra_height_buff[pos][1])
                    }
                    while ((temp % maxwidth[screen_type_index]) in extra_height_buff) {
                        var prev_card = temp % maxwidth[screen_type_index];
                        extra_height_buff[prev_card][0] -= 1
                        temp += extra_height_buff[temp % maxwidth[screen_type_index]][1]
                        if (extra_height_buff[prev_card][0] === 0) {
                            delete extra_height_buff[prev_card]
                        }
                        console.log("occupied by height card", temp)
                    }
                    const final_x = temp % maxwidth[screen_type_index]
                    const final_y = Math.floor(temp / maxwidth[screen_type_index])
                    temp += e.w
                    if (e.h > 1) {
                        extra_height_buff[final_x] = [e.h - 1, e.w]
                    }
                    console.log({ ...extra_height_buff })

                    final_temp.push({ ...e, x: final_x, y: final_y })
                })
            })
            final.push(final_temp)
        })

        return {
            lg: final[0],
            md: final[1],
            sm: final[2],
            xs: final[3]
        }
    }


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
        setTransactionTimes({})
        setEventsData({})
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

    useEffect(() => {
        var remove_indexs = [];
        const master_cards = [
            <EventsDetails name="Events" key={0} events={EventsData} pin={pins} setpins={setpins} setcardheight={setEventsTableHeight} />,
            <MonthlyEarning name="Guests" key={1} icon={users_icon} value={guest_result.total_guest_curr_week} percentChange={guest_result.current_week_guests_percentage_change} pin={pins} setpins={setpins} toolText={"Number of guests"} />,
            <LabourTrends name="Labour Trends" icon={idcard_icon} key={2} value={labour_trends} pin={pins} setpins={setpins} toolText={"Number of staff "} percentChange={labour_trends.diff} />,
            <PopularSpendingRange name="Popular Spending Range" key={3} value={spending_range} pin={pins} setpins={setpins} toolText={"Trend of the two popular spending ranges"} percentChange={spending_range.high_percentage<0?spending_range.high_percentage:spending_range.low_percentage<0?spending_range.low_percentage:spending_range.high_percentage>0?spending_range.high_percentage:spending_range.low_percentage>0?spending_range.low_percentage:null} />,
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
            // <ProductWiseSpend name="Happy Hour" key={14} icon={BiDish} value={revenue_break_down.percentage_change_happy_hour_current_week}/>,
            <LabourSchedule name="Labour Schedule" key={15} labour={labour_data} pin={pins} setpins={setpins} setcardheight={setLaborTableHeight} />,
            <PeakActivity name="Peak Activity transaction" key={16} pin={pins} setpins={setpins} sales={transactionTimesData.sales} avgSales={transactionTimesData.average_sales} transactions={transactionTimesData.transactions} time={transactionTimesData.busiest_time_overall_time_category} day={transactionTimesData.busiest_time_overall_datetime} toolText={"Day and time window of peak transaction activity"} />,

        ]; 
        let user_id = JSON.parse(localStorage.getItem("authUser")).uid;
        var final_cards_layouts = []
        master_cards.forEach((e, index) => {
            if (!pins[user_id].includes(e.props.name)) {
                remove_indexs.push(index)
            }
            else {
                final_cards_layouts.push(master_card_layout[e.key])
            }
        })
        const final_cards = removeElementsByIndices(master_cards, remove_indexs);
        setcards(final_cards);
        setlayouts(arrange_cards({
            lg: layouts.lg.filter(e => final_cards_layouts.some((temp) => temp === e.i)),
            md: layouts.md.filter(e => final_cards_layouts.some((temp) => temp === e.i)),
            sm: layouts.sm.filter(e => final_cards_layouts.some((temp) => temp === e.i)),
            xs: layouts.xs.filter(e => final_cards_layouts.some((temp) => temp === e.i))
        }))

    }, [pins, guest_result, net_sales_result, spending_range, labour_trends, spending_segments, revenue_break_down, transactionTimesData, EventsData])


    document.title = "Opsentrix watchlist";

    const [breakpoint, setBreakPoint] = useState();
    const handleBreakPointChange = breakpoint => {
        setBreakPoint(breakpoint);
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    {/* <Breadcrumbs title={"WatchList"} breadcrumbItem={"WatchList"} /> */}
                    {/* <ComplexInterfaceGrid /> */}
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"1rem"}}>
                    <h5 style={{fontFamily:" 'Poppins', sans-serif",fontSize:"26px",fontWeight:"500",lineHeight:"normal",letterSpacing:"0%",textAlign:"left",color:"black"}}>Watch List</h5>
                    <CalendarComponent date={date} set_newdate={setdate} />
                    </div>
                    {pins[user_id].length === 0 ?
                        <h1 style={{ minHeight: '330px', textAlign: 'center' }}>Pinned cards from the Hub appear here</h1>
                        :
                        <ResponsiveGridLayout
                            style={{ minHeight: '330px' }}
                            className="layout"
                            layouts={layouts}
                            onBreakpointChange={handleBreakPointChange}
                            onLayoutChange={(e) => e}
                            isDraggable
                            isRearrangeable
                            isResizable
                            draggableHandle=".bx-dots-horizontal"
                            breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
                            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        >
                            {
                                cards.map((item, index) => {
                                    const percentChange = item.props.percentChange;
                                    return (
                                        <GridItemContainer ref={ref} key={master_card_layout[item.key]} item={item} className={class_layouts[index]} percentChange={percentChange} />
                                    );
                                }
                                )}
                        </ResponsiveGridLayout>}

                </Container>
            </div>

        </React.Fragment>
    );
};


export default Watchlist;