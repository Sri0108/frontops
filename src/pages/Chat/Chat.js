import React, { createRef, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Card, CardTitle, CardText,
  Row,
  Spinner,
  UncontrolledAlert,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import classnames from "classnames";
import EmojiPicker from 'emoji-picker-react';
import Breadcrumbs from "components/Common/Breadcrumb";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import Lightbox from "yet-another-react-lightbox";
import axios from "axios";
import { createThread, startChat, streamingChat, imgDownload } from "api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./styles.css"
import Ask from '../../assets/images/Icon_Ask.svg'
import Receipt from '../../assets/images/Transaction Icon.svg'
import Review from '../../assets/images/Reviews Icon.svg'
import Weather from '../../assets/images/Frame.svg'
import Events from '../../assets/images/Event Icon.svg'
import Send from '../../assets/images/send.svg'
import ImageWithLoading from "./s3_image";



const Chat = () => {
  document.title = "Opsentrix Chat";
  const LoadingDots =
    <div className="spinner-container">
      <Spinner
        color="dark"
        type="grow"
        size="sm"
        className="spinner-1"
      >
        Loading...
      </Spinner>
      <Spinner
        color="dark"
        type="grow"
        size="sm"
        className="spinner-2"
      >
        Loading...
      </Spinner>
      <Spinner
        color="dark"
        type="grow"
        size="sm"
        className="spinner-3"
      >
        Loading...
      </Spinner>
    </div>
  const [messagesData, setMessagesData] = useState([]);
  const [emoji, setEmoji] = useState(false);
  const [curMessage, setCurMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isdisable, setDisable] = useState(true);
  const [iskeydisable, setkeyDisable] = useState(false);
  const [chat, setchat] = useState(false);
  const [thread, setThread] = useState('');
  const inputRef = useRef(null);
  const lastMsg = useRef(null);
  const [msgState, setMsgstate] = useState(false);
  const ass = JSON.parse(localStorage.getItem("authUser"))
  console.log(ass.uid)
  let username = ass.username

  const getAvailableWidth = () => {
    const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
    return isFirefox ? "-moz-available" : "-webkit-fill-available";
  };

  const body = {
    assistant_name: "operator"
  }
  const chatBody = {
    question: `${curMessage}. Along with the response, give 3 most relevant follow-up questions to the previous analysis in hyperlinks. Questions have to be answerable based only on the four data sets -—events, weather, reviews, and (implicitly) sales. Use same font size for all responses, bold the label for Suggested follow-up questions and make sure the spacing is even between all the lines`,
    assistant_name: "operator",
    thread_id: thread
  }
  useEffect(() => {
    const Create_Thread = () => {
      setkeyDisable(true)
      axios.post(createThread, {}, { params: body }).then(
        (response) => {
          console.log(response.data)
          localStorage.setItem("Thread", response.data.thread_id)
          localStorage.setItem("lastFetchTime", Date.now().toString());
          setThread(response.data["thread_id"])
          setkeyDisable(false)
        }

      ).catch(e =>
        console.log(e)
      );
    }
    Create_Thread()
    // const lastFetchTime = localStorage.getItem('lastFetchTime');
    // const oneHourInMillis = 60 * 60 * 1000;
    // if (!lastFetchTime || (parseInt(Date.now().toString(), 10) - parseInt(lastFetchTime, 10)) > oneHourInMillis) {
    //   localStorage.removeItem("Thread")

    // }
    // else {
    //   setThread(localStorage.getItem('Thread'))
    // }

  }, [])


  //   function getImg (baseString) {
  //     // console.log(`s3_path=${baseString}`)
  //     axios.get(imgDownload + `?s3_path=${baseString}`).then(response => {
  //       console.log(response.data)
  //       let data = response.data
  //     setBaseImg(response.ata)
  //   }).catch(e => console.log(e))
  // }

  //meta title
  // useEffect(() => {
  //   const a = (messages || []).find(i => i.id);
  //   const a1 = a?.usermessages[a?.usermessages.length - 2]
  //   const a2 = a?.usermessages[a?.usermessages.length - 1]
  //   if (a2?.isSameTime) {
  //     setMessagesData((messages || []).map((item) => {
  //       const updateMessage = item.usermessages.filter((data) => a2.time === a1.time ?
  //         { ...data, id: a1.id, to_id: data.to_id, msg: data.msg, isSameTime: a1.time === a2.time, images: data.images, time: a1.time = 0 }
  //         : { ...item });
  //       return { ...item, usermessages: updateMessage }
  //     }))
  //   } else {
  //     setMessagesData(messages)
  //   }
  // }, [messages])

  const getfollowup = (e) => {
    e.preventDefault();  // Prevents the default hyperlink behavior
    const linkContent = e.target.innerText;  // Gets the link content
    if (!inputRef.current.disabled) {
      setCurMessage((prev) => {
        console.log(linkContent);
        addMessage(linkContent);

        return prev
      });
      inputRef.current.focus();
    }
    else {
      console.log("sorry sorry")
    }
  };

  // useEffect(() => {
  //   addMessage();
  // }, [curMessage])
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const time = `${hours}: ${minutes}`


  async function fetchStream() {
    const response = await fetch(`${streamingChat}?` + new URLSearchParams(chatBody).toString(), { method: 'POST' });

    if (!response.ok) {
      console.error('Failed to fetch stream:', response.statusText);
      return;
    }

    const reader = response.body.getReader();
    return reader;

  }

  const [modal, setModal] = useState(false);
  // const [selectedImage, setselectedImage] = useState();
  const toggle = () => setModal(!modal);

  const handleModel = (img) => {
    setSelectedImage(img);
    setModal(true)
  }
  const addMessage = (content) => {
    if (content || (!isdisable && (curMessage !== "" || selectedImage !== null))) {
      // Update state for the initial message
      setMessagesData(prev => [
        ...prev,
        { sender: "Bizzy", usermessages: [{ to_id: 0, msg: content ?? curMessage, time: 0 }] }
      ]);
      setCurMessage("");
      setDisable(true);
      setEmoji(false);
      // setSelectedImage(null);

      setMessagesData(prev => [
        ...prev,
        { sender: "Bizzy", usermessages: [{ to_id: 1, msg: LoadingDots, time: 0 }] }
      ]);
      setkeyDisable(true);

      if (content) {
        axios.post(startChat, {}, {
          params: {
            question: `${content}. Along with the response, give 3 most relevant follow-up questions to the previous analysis in hyperlinks. Questions have to be answerable based only on the four data sets -—events, weather, reviews, and (implicitly) sales. Use same font size for all responses, bold the label for Suggested follow-up questions and make sure the spacing is even between all the lines`,
            assistant_name: "operator",
            thread_id: thread
          }
        })
          .then(response => {
            // Update state with the response
            setMessagesData(prev => {
              return prev.map((e, index) => {
                if (index === prev.length - 1) {
                  e.usermessages[0].msg = <>
                    <ReactMarkdown remarkPlugins={remarkGfm}>{response.data.response.replace(/\| \|/g, "| \n |")}</ReactMarkdown>
                    {
                      response.data.files.length !== 0 &&
                      response.data.files.map((e, index) => {
                        if (e.type !== "csv")
                          return <img key={index} style={{ height: "15rem", margin: "3vh" }} src={`data:image/jpeg;base64,${e.base64_data}`} alt="image" />; //`data:image/jpeg;base64,${baseImg}`
                      })
                    }
                  </>
                }
                return e
              })
            });

            setkeyDisable(false);

          })
          .catch(e => {
            console.log(e);
            setMessagesData(prev => {
              return prev.map((e, index) => {
                if (index === prev.length - 1) {
                  e.usermessages[0].msg = <>
                    <ReactMarkdown remarkPlugins={remarkGfm}>Apologies, I am unable to process your request at this time. Please try a different question or try later</ReactMarkdown>
                  </>
                }
                return e
              })
            });
            setkeyDisable(false);

          });
        setMsgstate(false)
      }
      else {


        axios.post(startChat, {}, {
          params: {
            question: `${curMessage}. Along with the response, give 3 most relevant follow-up questions to the previous analysis in hyperlinks. Questions have to be answerable based only on the four data sets -—events, weather, reviews, and (implicitly) sales. Use same font size for all responses, bold the label for Suggested follow-up questions and make sure the spacing is even between all the lines`,
            assistant_name: "operator",
            thread_id: thread
          }
        })
          .then(response => {
            // Update state with the response
            setMessagesData(prev => {
              return prev.map((e, index) => {
                if (index === prev.length - 1) {
                  e.usermessages[0].msg = <>
                    <ReactMarkdown remarkPlugins={remarkGfm}>{response.data.response.replace(/\| \|/g, "| \n |")}</ReactMarkdown>
                    {
                      response.data.files.length !== 0 &&
                      response.data.files.map((e, index) => {
                        if (e.type !== "csv")
                          return <img key={index} onClick={() => handleModel(`data:image/jpeg;base64,${e.base64_data}`)} style={{ height: "15rem", margin: "3vh" }} src={`data:image/jpeg;base64,${e.base64_data}`} alt="image" />; //`data:image/jpeg;base64,${baseImg}`
                      })
                    }
                  </>
                }
                return e
              })
            });

            setkeyDisable(false);

          })
          .catch(e => {
            console.log(e);
            setMessagesData(prev => {
              return prev.map((e, index) => {
                if (index === prev.length - 1) {
                  e.usermessages[0].msg = <>
                    <ReactMarkdown remarkPlugins={remarkGfm}>Apologies, I am unable to process your request at this time. Please try a different question or try later</ReactMarkdown>
                  </>
                }
                return e
              })
            });
            setkeyDisable(false);

          });
      }
    }
  };

  const onKeyPress = e => {
    const { key, value } = e;
    if (key === "Enter") {
      setCurMessage(value);
      setDisable(true)
      addMessage();
    }
  };
  //search recent user
  const [deleteMsg, setDeleteMsg] = useState("");
  const toggle_deleMsg = (id) => {
    setMessagesData(messagesData.filter((e, index) => index != id))
  };

  const [copyMsgAlert, setCopyMsgAlert] = useState(false);
  const copyMsg = (message) => {
    // var copyText = ele.closest(".conversation-list").querySelector("p").innerHTML;
    navigator.clipboard.writeText(message);
    setCopyMsgAlert(true)
    if (message) {
      setTimeout(() => {
        setCopyMsgAlert(false)
      }, 1000)
    }
  };

  // scroll simple bar
  const scrollRef = useRef(null);
  useEffect(() => {
    // if (scrollRef.current) {
    //   console.log("scroll scrollTop",scrollRef.current.scrollTop )
    //   scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    //   scrollRef.current?.lastElementChild?.scrollIntoView()
    //   console.log("scroll height",scrollRef.current.scrollHeight )
    // }
    requestAnimationFrame(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    });



    if (lastMsg.current) {
      console.log("Add onclick events to a tag")
      const links = lastMsg.current.querySelectorAll("a");

      lastMsg.current.querySelectorAll("ol")?.forEach(ol => {
        if ([...ol.children].every(li =>
          li.tagName === "LI" && li.children.length === 1 && li.children[0].tagName === "A"
        )) {
          ol.classList.add("list-style");
        }
      })
      lastMsg.current.querySelectorAll("ul")?.forEach(ol => {
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

      lastMsg.current?.querySelectorAll("ol > li > p").forEach(p => {
        // Ensure <p> has only one direct child, which is an <a> tag
        if (p.children.length === 1 && p.children[0].tagName === "A") {
          p.classList.add("styled-paragraph");
        }
      });

      // lastMsg.current.querySelectorAll("p")?.forEach(p => {
      //   if (p.children.length === 1 && p.children[0].tagName === "LI") {
      //     if (p.children.length === 1 && p.children[0].tagName === "A") {
      //       p.classList.add("styled-paragraph");
      //     }
      //   }
      // })
      // lastMsg.current?.querySelectorAll("p").forEach(p => {
      //   // Ensure <p> has only one direct child, which must be <li>
      //   if (p.children.length === 1 && p.children[0].tagName === "LI") {
      //     let li = p.children[0]; // Get the <li> element

      //     // Ensure <li> has only one child, which must be <a>
      //     if (li.children.length === 1 && li.children[0].tagName === "A") {
      //       p.classList.add("styled-paragraph");
      //     }
      //   }
      // });
      links.forEach((link) => {
        link.addEventListener("click", getfollowup);
        // link.onClick(() => getfollowup);
      });
    }

  }, [messagesData])

  useEffect(() => {
    if (!iskeydisable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [iskeydisable])

  // emoji
  const [emojiArray, setEmojiArray] = useState("");
  const onEmojiClick = (event, emojiObject) => {
    setEmojiArray([...emojiArray, emojiObject.emoji]);
    setCurMessage(curMessage + event.emoji);
    setDisable(true)
  };

  //  img upload
  const handleImageChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setDisable(true)
    };
    reader.readAsDataURL(file);
  };


  const oneHourInMillis = 60 * 60 * 1000
  const handleClick = () => {
    setchat((butt) => !butt)
    localStorage.setItem("butt", chat)

  }
  let b = JSON.parse(localStorage.getItem("butt"));
  if (oneHourInMillis < parseInt(localStorage.getItem("lastFetchTime"), 10)) {
    localStorage.setItem("butt", false)
  }

  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);

  const handleSendMessage = () => {
    addMessage();
    if (!isFirstMessageSent) {
      setIsFirstMessageSent(true);
    }
  };



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* <h5 style={{fontFamily:" 'Poppins', sans-serif",fontSize:"26px",fontWeight:"500",lineHeight:"normal",letterSpacing:"0%",textAlign:"left",color:"black"}}>Ask Bizzy</h5> */}
          <div className="initial-screen">
            <div className="content1">
              <h1 className="title">Hi, {username}</h1>
              <h2>This is Bizzy. Your AI assistant.</h2>
              <span>Bizzy is your virtual data wizard and can help analyze business data like POS transactions, Weather, Events and Guest Reviews. It can also find appropriate correlations between the data sets.</span>
              {/* <img src={Ask} width="160" style={{ marginBottom: "10px" }} /> */}
            </div>
            <div >  {/*className="cardcontent" */}
              <Row className="d-flex flex-wrap">
                <Col md="3" className="d-flex">
                  <Card body className="my-3" style={{ width: '20rem' }}>
                    <div className="card-title-wrapper">
                      {/* <i className="fas fa-receipt card-icon" /> */}
                      <div>
                        <CardTitle className="fs-6 mb-3 " > Transaction Data</CardTitle>
                        <CardText >
                          Includes details of transactions such as item names, categories, prices, quantities, and transaction dates.
                        </CardText>
                      </div>
                      <i className="icons"><img src={Receipt} /></i>
                    </div>
                  </Card>
                </Col>
                <Col md="3" className="d-flex" >
                  <Card body className="my-3" style={{ width: '20rem' }}>
                    <div className="card-title-wrapper">
                      {/* <i className="fas fa-receipt card-icon" /> */}
                      <div>
                        <CardTitle className="fs-6 mb-3 " >Customer Reviews</CardTitle>
                        <CardText>
                          Contains customer reviews with sentiment scores and review dates.
                        </CardText>
                      </div>
                      <i className="icons" style={{ marginLeft: "1rem" }}><img src={Review} /></i>
                    </div>
                  </Card>
                </Col>
                <Col md="3" className="d-flex">
                  <Card body className="my-3" style={{ width: '20rem' }}>
                    <div className="card-title-wrapper">
                      {/* <i className="fas fa-cloud-rain card-icon" /> */}
                      <div>
                        <CardTitle className="fs-6 mb-3 ">Weather</CardTitle>
                        <CardText>
                          Provides various weather parameters like temperature, humidity, precipitation, and conditions along with dates.
                        </CardText>
                      </div>
                      <i className="icons" style={{ marginLeft: "1rem" }}><img src={Weather} /></i>
                    </div>
                  </Card>
                </Col>
                <Col md="3" className="d-flex">
                  <Card body className="my-3" style={{ width: '20rem' }}>
                    <div className="card-title-wrapper">
                      {/* <i className="fas fa-calendar-day card-icon" /> */}
                      <div>
                        <CardTitle className="fs-6 mb-3 ">Event Data</CardTitle>
                        <CardText>
                          Lists events with their names, categories, start and end times, and dates.
                        </CardText>
                      </div>
                      <i className="icons" style={{ marginLeft: "1rem" }}><img src={Events} /></i>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="w-100 user-chat">
                  <Card className="chat-box">
                    <div>
                      <div className="chat-conversation p-3">
                        <SimpleBar  >     {/* style={{ height: "calc(100vh - 585px)" }} */}
                          <ul className="list-unstyled mb-0" id="users-conversation">
                            {
                              messagesData && (messagesData || []).map((message, m_index) => {
                                return message.usermessages.map((userMsg, index) => {
                                  return (
                                    <li
                                      key={index}
                                      className={
                                        userMsg.to_id === 1 ? "" : "right"
                                      }
                                    >
                                      <div className="conversation-list">

                                        <div className="ctext-wrap">
                                          <div className="conversation-name">
                                            {userMsg.to_id === 1 ? message.sender : "You"}
                                          </div>
                                          <div className="chat-response" style={{ overflowX: 'auto' }} ref={m_index === messagesData.length - 1 ? lastMsg : null}>{userMsg.msg}</div>
                                          {userMsg.images && <img src={userMsg.images} alt="" width="150px" />}
                                          {userMsg.time !== 0 && <h5 className="chat-time mb-0"><i className="bx bx-time-five align-middle me-1"></i>{userMsg.time}</h5>}
                                        </div>
                                      </div>
                                    </li>
                                  )
                                })
                              })
                            }
                          </ul>
                        </SimpleBar>
                      </div>
                      {/* {
                        selectedImage &&
                        <div className="replymessage-block mb-0 d-flex align-items-start">
                          <div className="flex-grow-1">
                            <img src={selectedImage} alt="select img" style={{ width: "150px", height: "auto" }} />
                          </div>
                          <div className="flex-shrink-0">
                            <button type="button" id="close_toggle" className="btn btn-sm btn-link mt-n2 me-n3 fs-18" onClick={() => setSelectedImage(null)}>
                              <i className="bx bx-x align-middle"></i>
                            </button>
                          </div>
                        </div>
                      } */}

                      {/* {copyMsgAlert && <UncontrolledAlert color='warning' role="alert">  Message copied</UncontrolledAlert>} */}
                      {/* {emoji && <EmojiPicker onEmojiClick={onEmojiClick} width={250} height={382} />} */}


                    </div>
                  </Card>

                </div>

              </div>
            </Col>

          </Row >
          <div className="p-3 chat-input-section" style={{ position: "fixed", bottom: 0, width: getAvailableWidth(), zIndex: "1", backgroundColor: "white", marginRight: "1.5rem", borderRadius: "0.3rem" }}>
            <Row>
              <Col>
                <div className="position-relative">
                  <input
                    type="text"
                    autoFocus
                    ref={inputRef}
                    value={curMessage}
                    disabled={iskeydisable}
                    onKeyPress={onKeyPress}
                    onChange={e => { setCurMessage(e.target.value); setDisable(e.target.value.length < 11) }}
                    className="form-control "
                    placeholder='Ask Anything'
                  />
                  {/* <div className="chat-input-links">
                                    <ul className="list-inline mb-0">
                                      <li className="list-inline-item" onClick={() => setEmoji(!emoji)}>
                                        <Link to="#">
                                          <i className="mdi mdi-emoticon-happy-outline me-1" id="Emojitooltip" />
                                          <UncontrolledTooltip
                                            placement="top"
                                            target="Emojitooltip"
                                          >
                                            Emojis
                                          </UncontrolledTooltip>
                                        </Link>
                                      </li>
                                      <li className="list-inline-item">
                                        <label htmlFor="imageInput" style={{ color: "#556ee6", fontSize: 16 }}>
                                          <i className="mdi mdi-file-image-outline me-1" id="Imagetooltip" />
                                          <UncontrolledTooltip placement="top" target="Imagetooltip">
                                            Images
                                          </UncontrolledTooltip>
                                        </label>
                                        <input type="file" id="imageInput" className="d-none" onChange={handleImageChange} />
                                      </li>
                                      <li className="list-inline-item">
                                        <Link to="#">
                                          <i className="mdi mdi-file-document-outline" id="Filetooltip" />
                                          <UncontrolledTooltip placement="top" target="Filetooltip">
                                            Add Files
                                          </UncontrolledTooltip>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div> */}
                </div>
              </Col>
              <Col className="col-auto d-flex align-items-center justify-content-center">
                <Button
                  type="button"
                  disabled={isdisable}
                  onClick={() => addMessage()}
                  className="btn btn-primary colorless"
                  style={{ padding: "5px" }}
                >
                  <img src={Send} />
                </Button>
              </Col>
            </Row>
          </div>
          <Modal isOpen={modal} toggle={toggle} size="xl" centered>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
              <center>
                <img src={selectedImage} style={{ alignItems: "center", placeItems: "center", height: "35rem", width: "40rem" }} />
              </center>
            </ModalBody>
          </Modal>
        </Container >
        <div ref={scrollRef} />
      </div >
    </React.Fragment >
  );
};



export default Chat;