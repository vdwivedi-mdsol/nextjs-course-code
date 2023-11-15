import { MongoClient } from 'mongodb'
import React from 'react'
import MeetupList from '../components/meetups/MeetupList'


function index(props) {




    return (

        <MeetupList meetups={props.meetups}  ></MeetupList>

    )
}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://wakeupby8:aXSx5R1HXb7mVhqE@cluster0.uf6zo5v.mongodb.net/reactMeetup?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection('meetups')
    const result = await meetupCollection.find().toArray()
    console.log("result", result);
    client.close()
    return {
        props: {
            meetups: result.map(meetup => {
                return {
                    title: meetup.title,
                    image: meetup.image,
                    address: meetup.address,
                    description: meetup.description,
                    id: meetup._id.toString()
                }

            })
        },
        revalidate: 100
    }
}

export default index
