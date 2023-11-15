import { MongoClient} from 'mongodb'
async function handler(req , res) {
  if(req.method === 'POST'){

    const body = req.body
    const client =  await MongoClient.connect('mongodb+srv://wakeupby8:aXSx5R1HXb7mVhqE@cluster0.uf6zo5v.mongodb.net/reactMeetup?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection('meetups')
   const result =  await meetupCollection.insertOne(body)
   console.log("result" , result);
   client.close()
   res.status(201).json({
    message : 'meetup inserted successfully'
   })
  }

}

export default handler