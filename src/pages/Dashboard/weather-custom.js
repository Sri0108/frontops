import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Spinner, Tooltip, Table } from "reactstrap";
import potato from "assets/images/weather.svg"
import { WiCloud } from "react-icons/wi";
import infoIcon from "../../assets/images/hub/Info Icon.svg"
import cloudy from "../../assets/images/weather/cloudy.png"
import heavyRain from "../../assets/images/weather/heavy_rain.png"
import rain from "../../assets/images/weather/rain.png"
import sunCloudy from "../../assets/images/weather/sun_cloudy.png"
import windy from "../../assets/images/weather/windy.png"
import sunny from "../../assets/images/weather/Wednesday weather icon.png"

const MyWeather = (props) => {
    let user_id = JSON.parse(localStorage.getItem("authUser")).uid;
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipSOpen, setTooltipSOpen] = useState(false);
    const stoggle = () => setTooltipSOpen(!tooltipSOpen);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const weeklyForecast = [
        { day: "Today", img: cloudy, text: "Cloudy", temp: [24, 13] },
        { day: "Mon", img: windy, text: "Sunny", temp: [24, 13] },
        { day: "Tue", img: sunCloudy, text: "Cloudy", temp: [24, 13] },
        { day: "Wed", img: sunny, text: "Sunny", temp: [24, 13] },
        { day: "Thu", img: rain, text: "Rain ", temp: [24, 13] },
        { day: "Fri", img: heavyRain, text: "Heavy Rain", temp: [24, 13] },
        { day: "Sat", img: sunCloudy, text: "Cloudy", temp: [24, 13] },
    ];

    return (
        <React.Fragment>
            <div className="custom-card">

                <div style={{ textAlign: "center" }}>
                    <div style={{ display: 'flex', marginBottom: "1rem" }}>
                        <span>{props.name}</span>
                        {/* <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }} className="dripicons-information"></i> */}
                        <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }} ><img src={infoIcon} /></i>
                        <Tooltip
                            isOpen={tooltipOpen}
                            target={props.name.replaceAll(' ', '-')}
                            toggle={toggle}
                        >
                            {props.toolText}
                        </Tooltip>
                    </div>
                </div>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between"}}>
                        <div >
                            <Row style={{ textAlign: "center", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                                <Col><h4>Rotterdam</h4></Col>
                                <Col><h6 className="muted-text">Cloudy</h6></Col>
                            </Row>
                        </div>
                        <div>
                            <Row>
                                <Col><h4>24°</h4></Col>
                                <Col><img src={sunCloudy} style={{ height: "30px", width: "30px"}} alt="weather icon" /></Col>
                            </Row>
                        </div>
                    </div>
                    <div style={{ maxHeight: "110px", overflowY: "auto", marginTop:"0.5rem" }}>
                        <Table className="table table-sm table-borderless mb-0" >
                            <thead>
                                <tr>
                                    {weeklyForecast.map((item, index) => (
                                        <th key={index} style={{ textAlign: "center", padding: "0.3rem", fontSize: "0.8rem" }}>
                                            <strong>{item.day} </strong>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {weeklyForecast.map((item, index) => (
                                        <td key={index} style={{ textAlign: "center", padding: "0.3rem" }}>
                                            <img src={item.img} style={{ height: "25px", width: "20px"}} />
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    {weeklyForecast.map((item, index) => (
                                        <td key={index} style={{ textAlign: "center", padding: "0.2rem", fontSize: "0.6rem" }}>
                                            <strong>{item.text}</strong>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    {weeklyForecast.map((item, index) => (
                                        <td key={index} style={{ textAlign: "center", padding: "0.2rem", fontSize: "0.7rem" }}>
                                            <strong>{item.temp[0]}°</strong> <span style={{color: "#6c757d" }}>{item.temp[1]}°</span>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </Table>
                    </div>


                </div>
            </div>
        </React.Fragment >
    )
}
export default MyWeather;