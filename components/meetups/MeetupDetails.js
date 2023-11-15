import React, { Fragment } from 'react'
import meetupDetailsCSS from  './MeetupDetails.module.css'
function MeetupDetails(props) {
  return (
    <section className={meetupDetailsCSS.meetupDetailsSection}>
        <img src={props.src} alt ={ props.title}></img>
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
    </section>
  )
}

export default MeetupDetails
