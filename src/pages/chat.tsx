import { auth,db } from '../config/firebase';
import React,{useState, useEffect}from 'react';
import firebase from 'firebase';

interface Message {
    id:number
    text:string
    photoURL:string
}


const Home=()=> {
    const [messages, setMessages] = useState<Message[]>([])
    const [sendmsg,setSendmsg] = useState<string>('')
    
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(25).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()) as Message[])
        })
    }, [])

    async function sendMessage(e:React.FormEvent){
        e.preventDefault()
        const user = auth && auth.currentUser && auth.currentUser;
        const uid = user && user.uid
        const photoURL = user && user.photoURL

        await db.collection('messages').add({
            text: sendmsg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
  

    return (
        <div>
            <button onClick ={()=>auth.signOut()}>Log out</button>
          
          <div>   
            {messages.map(({ id, text, photoURL}) => (
                    <div>
                        <div key={id}>
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>

           <form onSubmit={sendMessage}>
           <input onChange={(e) => setSendmsg(e.target.value)} placeholder="message..." value={sendmsg}/>
           <button type="submit">Send</button>
           </form>
        </div>
    );
}

export default Home;