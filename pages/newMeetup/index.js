import React from 'react'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import {useRouter}  from 'next/router'
function index() {
    const router = useRouter()
    const onAddMeetup = async(meetupdetails) => {
     const response =   await fetch('/api/newMeetup' ,{
        method: 'POST',
        body: JSON.stringify(meetupdetails),
        headers : {
            'content-type': 'application/json'
        }
     } )
     const data = await response.json()
     router.push('/')
     console.log("data" ,data);
    }
    return (
        <NewMeetupForm onAddMeetup={onAddMeetup}></NewMeetupForm>
    )
}

export default index
