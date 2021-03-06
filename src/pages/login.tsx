import React, { useState } from 'react';
import { auth } from '../config/firebase'
import { Link, useHistory } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const history = useHistory()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        console.log(email, password)
        try {
            await auth.signInWithEmailAndPassword(email, password)
            history.push('/home')
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="bg-gray-50 shadow-lg rounded px-8 pt-6 pb-8 mt-10 mb-4 flex flex-col mt-20 mx-6">
            <h1 className="text-green-500 font-bold mb-8 text-2xl self-center">Login</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-500 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:border-green-400 text-gray-600" type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-500 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none border focus:outline-none focus:border-green-400 rounded w-full py-2 px-3 mb-3 text-gray-600" type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-14 rounded mb-4" type="submit">
                        Login
                    </button>
                    <Link to='/'>
                        <p className="font-bold text-sm text-blue-500 hover:text-blue-600">
                            New user? Sign in.
                        </p>
                    </Link>
                </div>
            </form>
        </div >
    );
}

export default Login;