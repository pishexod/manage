import {useState} from "react";

const AccordionItem = ({exercise}) => {
    const [selectedExercise, setSelectedExercise] = useState(false);

    const handleExerciseChange = (event) => {
        setSelectedExercise(event.target.checked);
    };

    return (
        <div className="container">
            <div className="button-row">
                <label>
                    <input
                        type="checkbox"
                        value={exercise}
                        checked={selectedExercise}
                        onChange={handleExerciseChange}
                    />
                    {exercise}
                </label>
            </div>
        </div>
    );
};