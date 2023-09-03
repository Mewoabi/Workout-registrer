import { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/useAuth";

const WorkoutForm = () => {
    const { user } = useAuthContext();
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setError("You must be logged in")
            return 
        }
        const workout = { title, load, reps };
        const response = await fetch('http://localhost:5000/api/workout', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: { "Content-Type": "application/json", "authorization": `Bearer ${user.token}`}
        });

        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
            console.log("error", json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            console.log('new workout added');
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="workout-form">
            <h3>Add a New workout</h3>

            <label>Exercise title : </label>
            <input
                type="text"
                onChange={(e) => { setTitle(e.target.value) }}
                value={title}
                className={emptyFields.includes('title') ? "error" : ""} />

            <label>Load( in kgs ) : </label>
            <input
                type="number"
                onChange={(e) => { setLoad(e.target.value) }}
                value={load}
                className={emptyFields.includes('load') ? "error" : ""} />

            <label>Reps ( times ) : </label>
            <input
                type="number"
                onChange={(e) => { setReps(e.target.value) }}
                value={reps}
                className={emptyFields.includes('reps') ? "error" : ""} />

            <button>Add workout</button>

            {error && <div className="div-error">{error}</div>}
        </form>
    );
}

export default WorkoutForm
