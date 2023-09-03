import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const {signup, isLoading, error} = useSignup();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const  handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    }
    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h3>Signup</h3>

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

            <button disabled = { isLoading }>Sign up</button>
            { error && <div className="div-error"> { error } </div>}
        </form>
    );
}

export default Signup;