import { useContext } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";

const useWorkoutContext = () => {
     const context = useContext(WorkoutContext);

     if (!context) {
        throw Error("UseWorkoutContext must be used inside WorkoutContextProvider");
     }

     return context;
}
 
export default useWorkoutContext;