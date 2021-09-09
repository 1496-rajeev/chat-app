import { auth, db } from '../config/firebase';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useHistory } from "react-router-dom"

interface Message {
    createdAt: string
    text: string
    photoURL: string
    uid: string
}


const Home = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [sendmsg, setSendmsg] = useState<string>('')

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(25).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()) as Message[])
        })
    }, [])

    async function sendMessage(e: React.FormEvent) {
        e.preventDefault()
        const user = auth && auth.currentUser;
        const uid = user && user.uid
        const photoURL = user && user.photoURL

        await db.collection('messages').add({
            text: sendmsg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setSendmsg('')
    }

    const history = useHistory()
    function logOut() {
        auth.signOut()
        history.push('/login')
    }


    return (
        <div className="bg-gray-50 rounded px-8 pt-6 pb-8 mb-4 mx-6">
            <div className="flex items-center justify-between bg-green-200 rounded px-4 py-4">
                <div className="text-gray-700 font-bold text-2xl">Chat app</div>
                <button className="bg-white shadow hover:bg-green-50 text-green-500  py-2 px-4 rounded" onClick={logOut}>Log out</button>
            </div>

            <div className="px-4 my-2 py-2 mt-4">
                {messages.map(({ createdAt, text, photoURL, uid }) => (
                    <div className={`flex px-4 my-2 py-2 rounded w-max ${uid === auth.currentUser?.uid ? 'bg-green-100 items-end' : 'bg-blue-100'}`}>
                        <div className="self-end" key={createdAt}>
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <div className="flex items-center justify-between mt-2">
                    <input className="shadow appearance-none border focus:outline-none focus:border-green-400 rounded w-10/12 py-2 px-3  text-gray-600" onChange={(e) => setSendmsg(e.target.value)} placeholder="message..." value={sendmsg} />
                    <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" type="submit">Send</button>
                </div>
            </form>
        </div>
    );
}

export default Home;