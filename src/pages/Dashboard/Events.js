import React, { useRef, useState, useEffect } from "react";
import { Spinner, Table, Tooltip } from "reactstrap";
import { date } from "yup";
import infoIcon from "../../assets/images/hub/Info Icon.svg"

const EventsDetails = (props) => {
    let user_id = JSON.parse(localStorage.getItem("authUser")).uid;
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipSOpen, setTooltipSOpen] = useState(false);
    const stoggle = () => setTooltipSOpen(!tooltipSOpen);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const myref = useRef()

    useEffect(() => {
        const updateHeight = () => {
          if (myref.current) {
            console.warn(myref.current.clientHeight);
            props.setcardheight(myref.current.clientHeight / 150)
          }
        };
    
        const resizeObserver = new ResizeObserver(updateHeight);
        if (myref.current) {
          resizeObserver.observe(myref.current);
        }
    
        return () => resizeObserver.disconnect(); // Cleanup
      }, []);

    return (
        <React.Fragment>
            <div className="custom-card">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                        <p>{props.name}</p>
                        {/* <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }} className="dripicons-information"></i> */}
                        <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }} ><img src={infoIcon} /></i>
                        <Tooltip
                            isOpen={tooltipOpen}
                            target={props.name.replaceAll(' ', '-')}
                            toggle={toggle}
                        >
                            {props.name}
                        </Tooltip>
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
                    <Tooltip
                        isOpen={tooltipSOpen}
                        target={props.name.replaceAll(' ', '-') + "-pin"}
                        toggle={stoggle}
                    >
                        {props.pin[user_id].includes(props.name) ? 'Unpin from Watchlist' : 'Pin to Watchlist'}
                    </Tooltip>
                </div>
                <div ref={myref}>
                    {
                        JSON.stringify(props.events) !== "{}" ?
                            <Table className="table table-sm mb-0">
                                {/* <thead>
                                    <tr>
                                        <th></th>
                                        <th>Event</th>
                                        <th>Category</th>
                                        <th>Date</th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    {
                                        props.events.filtered_events.map((e, index) => {
                                            let dateStr = new Date(e.EventDate).toLocaleString('en-US', {
                                                month: 'short',
                                                day: '2-digit',
                                                year: 'numeric',
                                            });
                                            return (
                                                <tr key={index}>
                                                    {/* <th scope="row">{index + 1}</th> */}
                                                    <td>{dateStr}</td>
                                                    <td>{e.EventName}</td>
                                                    <td>{e.EventCategory}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {/* <tr className="table-light">
                                        <th scope="row">1</th>
                                        <td>Column content</td>
                                        <td>Column content</td>
                                        <td>Column content</td>
                                    </tr>

                                    <tr className="table-success">
                                        <th scope="row">2</th>
                                        <td>Column content</td>
                                        <td>Column content</td>
                                        <td>Column content</td>
                                    </tr>

                                    <tr className="table-info">
                                        <th scope="row">3</th>
                                        <td>Column content</td>
                                        <td>Column content</td>
                                        <td>Column content</td>
                                    </tr>

                                    <tr className="table-warning">
                                        <th scope="row">4</th>
                                        <td>Column content</td>
                                        <td>Column content</td>
                                        <td>Column content</td>
                                    </tr> */}
                                </tbody>
                            </Table>

                            :
                            <center>
                                <Spinner color="primary" />
                            </center>
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default EventsDetails;