import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, error} = useLogin();
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password)
    }
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email: </label>
            <input
                type="text"
                onChange={(e) => { setEmail(e.target.value) }}
                value={email} />

            <label>Password: </label>
            <input
                type="text"
                onChange={(e) => { setPassword(e.target.value) }}
                value={password} />

            <button disabled={isLoading}>Log in</button>
            { error && <div className="div-error">{error}</div>}
        </form>
    );
}

export default Login;