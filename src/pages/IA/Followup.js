import React, { useEffect, useImperativeHandle, useState } from "react";
import { startChat } from "api";
import "./followupcss.css"
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRef } from "react";

export default function Followup({ index, getfollowup}) {
    const [Followups, SetFollowups] = useState()
    const lastMsg = useRef()
    // const inputRef = useRef(null);
    function waitForThread() {
        return new Promise((resolve) => {
            const checkInterval = 100; // Check every 100ms
            const checkThread = () => {
                const thread = localStorage.getItem("Thread");
                if (thread) {
                    resolve(thread);
                } else {
                    setTimeout(checkThread, checkInterval);
                }
            };
            checkThread();
        });
    }
   

    useEffect(() => {
        if (lastMsg.current) {
            console.log("ADDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
            console.log(lastMsg.current)
            // lastMsg.current.querySelector("ol")?.classList.add("list-style")
            // lastMsg.current.querySelector("ul")?.classList.add("list-style")
            lastMsg.current?.querySelectorAll("ol")?.forEach(ol => {
                if ([...ol.children].every(li =>
                  li.tagName === "LI" && li.children.length === 1 && li.children[0].tagName === "A"
                )) {
                  ol.classList.add("list-style");
                }
              })
              lastMsg.current?.querySelectorAll("ul")?.forEach(ol => {
                if ([...ol.children].every(li =>
                  li.tagName === "LI" && li.children.length === 1 && li.children[0].tagName === "A"
                )) {
                  ol.classList.add("list-style");
                }
              })
        
              lastMsg.current?.querySelectorAll("p").forEach(p => {
                if (p.children.length === 1 && p.children[0].tagName === "A") {
                    p.classList.add("styled-paragraph");
                }
            });

            lastMsg.current?.querySelectorAll("ol").forEach(ol => {
                ol.classList.add("list-style"); // Apply style to <ol>
            
                ol.querySelectorAll("li").forEach(li => {
                    li.classList.add("list-item-style"); // Apply style to <li>
            
                    li.querySelectorAll("p").forEach(p => {
                        if (p.children.length === 1 && p.children[0].tagName === "A") {
                            p.classList.add("styled-paragraph"); // Apply style to <p> containing only <a>
                        }
                    });
                });
            });
            lastMsg.current?.querySelectorAll("ul").forEach(ul => {
                ul.classList.add("list-style"); // Apply style to <ul>
            
                ul.querySelectorAll("li").forEach(li => {
                    li.classList.add("list-item-style"); // Apply style to <li>
            
                    li.querySelectorAll("p").forEach(p => {
                        if (p.children.length === 1 && p.children[0].tagName === "A") {
                            p.classList.add("styled-paragraph"); // Apply style to <p> containing only <a>
                        }
                    });
                });
            });
            
            // lastMsg.current.querySelectorAll("a")?.forEach(a => {
            //     a.classList.add("style")
            // })
            // lastMsg.current.querySelector("ol").style.setMargin = "none";
            // lastMsg.current.querySelectorAll("a").forEach(a => {a.classList.add(a)})style.marginBottom = "0";
            const links = lastMsg.current?.querySelectorAll("a");
            links.forEach((link) => {
                link.addEventListener("click", getfollowup);
                // link.onClick(() => getfollowup);
            });
        }
    }, [Followups])

    useEffect(() => {
        waitForThread().then((thread) => {
            axios.post(startChat, {}, {
                params: index === "Projected sales for upcoming September Equinox event on September 21st. Projection based on historic trends."
                 ? {
                    question: `I previously analyzed upcoming events within the next 14 days from September 13, 2024, and matched them with past events to calculate sales per day before, during, and after the events. The analysis focused on the September Equinox, where sales decreased by 24.35% on the event day and increased by 140.03% the day after. I would like to continue this analysis and explore further insights. Along with your answer give me 3 most relevant follow-up questions to the previous analysis in hyperlinks. Questions have to be answerable based only on the four data sets -—events, weather, reviews, and (implicitly) sales. DON'T GIVE ANY ADDITIONAL INFORMATION. ONLY GIVE FOLLOW-UP QUESTIONS AND DON'T MENTION INDEX FOR QUESTIONS and dont forget to give in hyperlinks. bold the label for Suggested follow-up questions`,
                    assistant_name: "operator",
                    thread_id: thread
                } : {
                    question: `I previously analyzed Projected sales and top 10 item categories for the next 7 days as of September 13, 2024. Projection was based on historic sales. I would like to continue this analysis and explore further insights. Along with your answer give me 3 most relevant follow-up questions to the previous analysis in hyperlinks. Questions have to be answerable based only on the four data sets -—events, weather, reviews, and (implicitly) sales. DON'T GIVE ANY ADDITIONAL INFORMATION. ONLY GIVE FOLLOW-UP QUESTIONS AND DON'T MENTION INDEX FOR QUESTIONS and dont forget to give in hyperlinks. bold the label for Suggested follow-up questions`,
                    assistant_name: "operator",
                    thread_id: thread
                }
            }).then(e => {
                SetFollowups(
                    <div ref={lastMsg}>
                        <ReactMarkdown remarkPlugins={remarkGfm}>{e.data.response.replace(/\| \|/g, "| \n |")}</ReactMarkdown>
                    </div>
                )
            })
        })
            .catch((err) => {
                console.error(err)
            })

    }, [])

    return (
        <React.Fragment>
            {
                Followups ?
                    <>
                        {/* <p><b>Suggested Followup Questions</b></p> */}
                        {Followups}
                    </>
                    :
                    <div className="cuss-shimmer">
                        <div className="cuss-wrapper">
                            <div className="cuss-stroke cuss-animate cuss-title"></div>
                            <div className="cuss-stroke cuss-animate cuss-link"></div>
                            <div className="cuss-stroke cuss-animate cuss-description"></div>
                        </div>
                    </div>
            }

        </React.Fragment>
    )
}