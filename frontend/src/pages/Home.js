import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import useWorkoutContext from '../hooks/useWorkoutContext';
import useAuthContext from '../hooks/useAuth';

const Home = () => {
    const { user } = useAuthContext();
    const { workouts, dispatch } = useWorkoutContext();

     
    useEffect(() => {
        const fetchData =  async ()=>{
            const response = await fetch('http://localhost:5000/api/workout', {
                headers:{"authorization": `Bearer ${user.token}`}
            });
            const data = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: data });
            }
        } 

       if(user) {
        fetchData();
       }
    },[dispatch, user]);

    return ( 
        <div className="home">
           <div className='workouts-div'>
           <h3>{ workouts && workouts.map((workout) => (
                 <WorkoutDetails key={workout._id} workout={workout}/>
            ))}</h3>
           </div>
           <WorkoutForm />
        </div>
     );
}
 
export default Home;