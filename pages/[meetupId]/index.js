import React from 'react'
import { useRouter } from 'next/router'
import MeetupDetails from '../../components/meetups/MeetupDetails'
import { MongoClient, ObjectId} from 'mongodb'

function index(props) {
    const route = useRouter()
    console.log(route.query)
    return (
        <MeetupDetails src={props.src} address={props.address} title={props.title} description={props.description}></MeetupDetails>
    )
}

export async function getStaticProps(ctx) {
    let meetupId = ctx.params.meetupId

    const client = await MongoClient.connect('mongodb+srv://wakeupby8:aXSx5R1HXb7mVhqE@cluster0.uf6zo5v.mongodb.net/reactMeetup?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection('meetups')
    const meetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId) });
    client.close()
    return {
        props: {
            src: meetup.image,
            address: meetup.address,
            title: meetup.title,
            description: meetup.description,

        }
    }
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://wakeupby8:aXSx5R1HXb7mVhqE@cluster0.uf6zo5v.mongodb.net/reactMeetup?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection('meetups')
    // Find all documents and project only the _id field
    const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();





    client.close()



    const paths = meetups.map(meetup => ({

        params: {
            meetupId: meetup._id.toString(),
        }
        ,
    }));

    return { paths, fallback: true }; // or { paths, fallback: true } for incremental static regeneration



}

export default index
