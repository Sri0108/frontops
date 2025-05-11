import React, { useState } from "react";
import { Spinner } from "reactstrap";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Tooltip as L } from "reactstrap"
import infoIcon from "../../assets/images/hub/Info Icon.svg"


ChartJS.register(ArcElement, Tooltip, Legend);

const Graph1 = (props) => {
    let user_id = JSON.parse(localStorage.getItem("authUser")).uid;
    let l = []
    let g = []
    const cat_labels = ["Gross Sales", "Guest Count"];

    if (JSON.stringify(props.result) !== "{}") {
        l = props.result.gross_values;
        g = props.result.g_count;
    }
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipSOpen, setTooltipSOpen] = useState(false);
    const stoggle = () => setTooltipSOpen(!tooltipSOpen);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    <p style={{ marginBottom: "5px" }}>{props.name}</p>
                    {/* <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }} className="dripicons-information"></i> */}
                    <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }} ><img src={infoIcon}/></i>
                    <L
                        isOpen={tooltipOpen}
                        target={props.name.replaceAll(' ', '-')}
                        toggle={toggle}
                    >
                        {props.toolText}
                    </L>
                </div>
                <i id={props.name.replaceAll(' ', '-') + "-pin"} className={props.pin[user_id].includes(props.name) ? 'bx bxs-pin' : 'bx bx-pin'} style={{ transform: 'rotate(45deg)', fontSize: 'large', cursor: 'pointer', height: 'fit-content' }}
                    onClick={(e) => {
                        if (props.pin[user_id].includes(props.name)) {
                            var index = props.pin[user_id].indexOf(props.name);
                            if (index !== -1) {
                                props.pin[user_id].splice(index, 1);
                            }
                            localStorage.setItem("pins", JSON.stringify(props.pin))
                            props.setpins(JSON.parse(localStorage.getItem('pins')))
                        }
                        else {
                            props.pin[user_id].push(props.name)
                            localStorage.setItem("pins", JSON.stringify(props.pin))
                            props.setpins(JSON.parse(localStorage.getItem('pins')))
                        }
                    }}></i>
                <L
                    isOpen={tooltipSOpen}
                    target={props.name.replaceAll(' ', '-') + "-pin"}
                    toggle={stoggle}
                >
                    {props.pin[user_id].includes(props.name) ? 'Unpin from Watchlist' : 'Pin to Watchlist'}
                </L>
            </div>
            {
                JSON.stringify(props.result) === "{}" ?
                    <center>
                        <Spinner color="primary" />
                    </center>
                    :
                    <div style={{ height: '85%', width: '100%', display: "flex", justifyContent: "center" }}>
                        <Doughnut data={{
                            labels: ['Less than €15', '€15.01 to €35', '€35.01 to €75', '€75.01 to €125', 'Greater than €125'],
                            datasets: [
                                {
                                    label: 'Outer Ring',
                                    data: l,
                                    backgroundColor: ['#dbdeef', '#b7bedf', '#939dce', '#6f7dbe', '#4b5cae'],
                                    hoverOffset: 4,
                                    cutout:"60%",
                                    radius: '100%',
                                    borderWidth: 1,
                                },
                                {
                                    label: 'Inner Ring',
                                    data: g,
                                    backgroundColor: ['#dbdeef', '#b7bedf', '#939dce', '#6f7dbe', '#4b5cae'],
                                    hoverOffset: 4,
                                    cutout:"65%",
                                    radius: '90%',
                                    borderWidth: 1,
                                },
                            ],
                        }}
                            options={{
                                responsive: true, // Allows resizing but without zoom
                                maintainAspectRatio: false, // Prevent aspect ratio from forcing a specific size
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            boxWidth: 20,
                                            padding: 10,
                                            usePointStyle: true,  
                                            pointStyle: 'circle', 
                                            color:'black'
                                        }
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (tooltipItem) => {
                                                const value = tooltipItem.raw;
                                                if (tooltipItem.datasetIndex == 0)
                                                    return `${cat_labels[tooltipItem.datasetIndex]}: € ${value}`;
                                                return `${cat_labels[tooltipItem.datasetIndex]}: ${value}`;
                                            },
                                        },
                                    },
                                },
                                animation: {
                                    animateScale: false,  // Disable scale animation
                                    animateRotate: false, // Disable rotate animation
                                },
                            }} style={{ position: 'absolute' }} />
                    </div>
            }
        </>
    );
};

export default Graph1;
