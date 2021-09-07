import React from 'react';

function Login() {
    return (
        <div>
            <input type="text" name="name" placeholder="username"/>
            <input type="password" name="password" placeholder="password"/>
            <input type="submit" value="Submit" />
        </div>
    );
}

export default Login;