import React from 'react'
import useWorkoutContext from '../hooks/useWorkoutContext';
import { TfiTrash } from 'react-icons/tfi';
//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useAuthContext from '../hooks/useAuth';
const WorkoutDetails = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!user) {
      return
    }
    const response = await fetch("http://localhost:5000/api/workout/" + workout._id, {
       method: "DELETE",
       headers:{"authorization": `Bearer ${user.token}`}
      });
    const json = await response.json();

    if (response.ok) {
      console.log("workout deleted successfully")
      console.log(json)
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
    if (!response.ok) {
      console.log(json.error);
    }
  }

  return (
    <div className='workout-details'>
      <h3>{workout.title}</h3>
      <p><strong>load(kg):</strong> {workout.load}</p>
      <p><strong>reps(times):</strong> {workout.reps}</p>
      <p>{ formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true}) }</p>
      <span onClick={handleDelete}>
        <TfiTrash className='trashicon'/>
      </span>
    </div>
  )
}

export default WorkoutDetails