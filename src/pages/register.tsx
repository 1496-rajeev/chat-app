import React, {useState} from 'react';
import {auth} from '../config/firebase'
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface IFormInput{
    email:string
    password:string
}

const Register =()=> {
    const {register, handleSubmit} = useForm<IFormInput>()

    const onSubmit = handleSubmit<IFormInput>(({email, password})=>{
        console.log(email,password)
        try{
            const result = auth.createUserWithEmailAndPassword(email,password)
            console.log(result)
        }catch(err){
            console.log(err)
        }
    })
 
    return (
        <div>
            <h1>Register</h1>
            <form  onSubmit={onSubmit}> 
                <input {...register("email")} type="email" name="email" placeholder="email" required/>
                <input {...register("password")} type="password" name="password" placeholder="password" required/>
                <input type="submit" />
            </form>
       <div>
          <p>Already have an account? Login</p> 
       </div>
        </div>
    );
}

export default Register;