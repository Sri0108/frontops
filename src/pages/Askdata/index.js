import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Askdata =()=>{
    document.title = "Opsentrix Ask Bizzy";
    const [chat,setchat]=useState(false)
    const [ask,setask]=useState("")
    return(
        <div className="page-content">
      <Container fluid>
      <Breadcrumbs title={"Askdata"} breadcrumbItem={"Ask data"} />
      <h4>sadkjslakdjlksajdlksajldjsalkjdskajdklsajkldjsalkdjj kjsakjdlksajdlksajdlsajdsalkdjsakljdl asdjsajdlsajldksa</h4>
        <Button className="mt-5" onClick={()=>{setchat(true)}}>Chat with Bizzy</Button>
        {
           chat && (<div><Input onChange={(e)=>{setask(e.target.value)}}/></div>)
        }
        {
            ask && ask.length>10?(<div><Button>Ask Bizzy</Button></div>):null
        }
      </Container>
      

    </div>
    )

}
export default Askdata;