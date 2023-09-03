import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuthContext = () => {
     const context = useContext(AuthContext);

     if (!context) {
        throw Error("UseWorkoutContext must be used inside WorkoutContextProvider");
     }

     return context;
}
 
export default useAuthContext;