import useAuthContext from "./useAuth";
import useWorkoutContext from "./useWorkoutContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutsDispatch } = useWorkoutContext();
   const logout = () => {
     //removing token from local storage
     localStorage.removeItem('user');
     //updating the context 
     dispatch({ type: "LOGOUT" });
     workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
   }
 return { logout }
}