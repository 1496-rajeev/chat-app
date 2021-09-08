import React, {useState} from 'react';
import {auth} from '../config/firebase'
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface IFormInput{
    email:string
    password:string
}

const Login =()=> {
    const {register, handleSubmit} = useForm<IFormInput>()

    const onSubmit = handleSubmit<IFormInput>(({email, password})=>{
        console.log(email,password)
        try{
            const result = auth.signInWithEmailAndPassword(email,password)
            console.log(result)
            // history.push('/home')
        }catch(err){
            console.log(err)
        }
    })
 
    return (
        <div>
            <h1>Login</h1>
            <form  onSubmit={onSubmit}> 
                <input {...register("email")} type="email" name="email" placeholder="email" required/>
                <input {...register("password")} type="password" name="password" placeholder="password" required/>
                <input type="submit" />
            </form>
            <div>
          <p>New user? Register here</p>
       </div>
        </div>
    );
}

export default Login;