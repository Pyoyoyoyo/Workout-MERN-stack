import { useWorkoutsContext } from "../hooks/UseWorkoutsContext";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({
        type: "DELETE_WORKOUT",
        payload: json,
      });
    }
  };

  // Check and parse the createAt date
  const createdAt = new Date(workout.createdAt);
  const isValidDate = !isNaN(createdAt);

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {isValidDate
          ? formatDistanceToNow(createdAt, { addSuffix: true })
          : "Invalid date"}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
