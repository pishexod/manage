import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import '../css/style.css';
import App from "../components/App";
import {styled} from "@mui/system";
import {Box} from '../components/Box';
import {
    getPlatoons,
    getExercise,
    createExercise,
    allSoldiersRoute, updateSoldier

} from '../utils/APIRoutes';
import axios from "axios";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {DataGrid} from "@mui/x-data-grid";

Modal.setAppElement('#root');

const PhysicalPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlatoon, setSelectedPlatoon] = useState('');
    const [selectedSoldier, setSelectedSoldier] = useState('');
    const [selectedExercise, setSelectedExercise] = useState('');
    const [selectedResult, setSelectedResult] = useState('');
    const [platoons, setPlatoons] = useState([]);
    const [soldiers, setSoldiers] = useState([]);
    const [exercise, setExercise] = useState([]);


    const training = {
        run3km: 'Біг на 3км.',
        run100m: 'Біг на 100м.',
        run6x100: 'Біг 6х100',
        pullup: 'Підтягування'
    }
    const getUser = () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                return JSON.parse(storedUser);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedPlatoon('');
        setSelectedSoldier('');
        setSelectedResult('');
    };

    useEffect(() => {
        fetchPlatoons();
        fetchSoldiers();
        fetchExercise();
    }, [])

    const fetchPlatoons = async () => {
        try {
            const parsedUser = await getUser();
            const response = await axios.get(getPlatoons, {
                params: {
                    company: parsedUser.company,
                },
            });
            setPlatoons(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchSoldiers = async () => {
        try {
            const parsedUser = await getUser();
            const response = await axios.get(allSoldiersRoute, {
                params: {
                    company: parsedUser.company,
                },
            });
            setSoldiers(response.data.data);
        } catch (error) {
            console.log(error);
        }

    }
    const fetchExercise = async () => {
        try {
            const parsedUser = await getUser();
            const response = await axios.get(getExercise, {
                params: {
                    company: parsedUser.company,
                },
            });
            response.data.data.map((exerc) => {
                if (exerc.rating_run3km !== 0 && exerc.rating_run100m !== 0 && exerc.rating_run6x100 && exerc.rating_pullup) {
                    const rating = (parseInt(exerc.rating_run3km) + parseInt(exerc.rating_run100m) + parseInt(exerc.rating_run6x100) + exerc.rating_pullup) / 4;
                   axios.post(updateSoldier, {
                        soldier_id: exerc.soldier.soldier_id,
                        level_physical_fitness: rating
                    })
                }
            })
            setExercise(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const calculateRating = (exercise, result) => {
            console.log(exercise)
            if (exercise === 'Підтягування') {
                if (result >= 15) {
                    return 5;
                } else if (result >= 12) {
                    return 4;
                } else if (result >= 8) {
                    return 3;
                } else {
                    return 2;
                }
            } else if (exercise === 'Біг на 3км.') {
                const [minutes, seconds] = result.split(':');
                const totalTimeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);

                if (totalTimeInSeconds <= 780) {
                    return 5;
                } else if (totalTimeInSeconds <= 820) {
                    return 4;
                } else if (totalTimeInSeconds <= 850) {
                    return 3;
                } else {
                    return 2;
                }
            } else if (exercise === 'Біг 6х100') {
                const [minutes, seconds] = result.split(':');
                const totalTimeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);

                if (totalTimeInSeconds <= 110) {
                    return 5;
                } else if (totalTimeInSeconds <= 120) {
                    return 4;
                } else if (totalTimeInSeconds <= 135) {
                    return 3;
                } else {
                    return 2;
                }
            } else if (exercise === 'Біг на 100м.') {
                console.log('ok')
                const [seconds, miliseconds] = result.split('.');
                const totalTimeInSeconds = parseInt(seconds) * 100 + parseInt(miliseconds);
                console.log(totalTimeInSeconds)
                if (totalTimeInSeconds <= 1100) {
                    return 5;
                } else if (totalTimeInSeconds <= 1200) {
                    return 4;
                } else if (totalTimeInSeconds <= 1400) {
                    return 3;
                } else {
                    return 2;
                }
            }
            return 0;
        }
    ;

    const handlePlatoonChange = (event) => {
        setSelectedPlatoon(event.target.value);
    };

    const handleSoldierChange = (event) => {
        setSelectedSoldier(event.target.value);
    };

    const handleExerciseChange = (event) => {
        setSelectedExercise(event.target.value);
        console.log(event.target)
    };

    const handleResultChange = (event) => {
        let value = event.target.value;
        if (selectedExercise === 'Біг на 3км.' || selectedExercise === 'Біг 6х100') {
            if (value.length === 2) {
                value += ':'
            }
        } else if (selectedExercise === 'Біг на 100м.')
            if (value.length === 2) {
                value += '.'
            }
        setSelectedResult(value);
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const parsedUser = await getUser();
            const rating = calculateRating(selectedExercise, selectedResult);
            console.log(rating + ' ok')
            let exerciseData = {
                company: parsedUser.company,
                platoon_number: selectedPlatoon,
                soldier_id: selectedSoldier,
                run3km: selectedExercise === 'Біг на 3км.' ? selectedResult : 'Не здавав',
                run100m: selectedExercise === 'Біг на 100м.' ? selectedResult : 'Не здавав',
                run6x100: selectedExercise === 'Біг 6х100' ? selectedResult : 'Не здавав',
                pullup: selectedExercise === 'Підтягування' ? selectedResult : 'Не здавав',
                rating_run3km: selectedExercise === 'Біг на 3км.' ? rating : 0,
                rating_run100m: selectedExercise === 'Біг на 100м.' ? rating : 0,
                rating_run6x100: selectedExercise === 'Біг 6х100' ? rating : 0,
                rating_pullup: selectedExercise === 'Підтягування' ? rating : 0,
            };
            console.log(exerciseData)
            await axios.post(createExercise, exerciseData);
            await fetchExercise();

            handleModalClose();
        } catch (e) {
            console.log(e)
        }
    };

    function getLevelPhysicalFitnessCellClassName(params) {
        const levelPhysicalFitness = params.value;

        if (levelPhysicalFitness >= 5) {
            return 'green-cell';
        } else if (levelPhysicalFitness >= 4) {
            return 'blue-cell';
        } else if (levelPhysicalFitness >= 3) {
            return 'yellow-cell';
        } else {
            return 'red-cell';
        }
    }

    const columns = [
        {field: 'id', headerName: '№', width: 50},
        {field: 'name', headerName: "Ім'я", width: 100},
        {field: 'surname', headerName: 'Прізвище', width: 100},
        {field: 'soldierRank', headerName: 'Звання', width: 100},
        {field: 'run3km', headerName: 'Біг на 3км.', width: 100},
        {field: 'rating_run3km', headerName: 'Оцінка', width: 70, cellClassName: getLevelPhysicalFitnessCellClassName,},
        {field: 'run100m', headerName: 'Біг на 100м.', width: 100},
        {
            field: 'rating_run100m',
            headerName: 'Оцінка',
            width: 70,
            cellClassName: getLevelPhysicalFitnessCellClassName,
        },
        {field: 'run6x100', headerName: 'Біг 6х100', width: 100},
        {
            field: 'rating_run6x100',
            headerName: 'Оцінка',
            width: 70,
            cellClassName: getLevelPhysicalFitnessCellClassName,
        },
        {field: 'pullup', headerName: 'Підтягування', width: 100},
        {field: 'rating_pullup', headerName: 'Оцінка', width: 70, cellClassName: getLevelPhysicalFitnessCellClassName,},
    ];


    return (
        <>
            <App/>
            <Box css={{px: '$12', mt: '0.1vh', '@xsMax': {px: '$10'}}}>
                <Container>
                    <div className="container">
                        <div className="button-row">
                            <button className='btn' onClick={handleModalOpen}>Додати в/с</button>
                        </div>
                    </div>
                    <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}
                           contentLabel="Додати результати нормативу"
                           className="modal">
                        <h2>Додати результати нормативу</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="select-container">
                                <label>
                                    Виберіть взвод:
                                    <select value={selectedPlatoon} onChange={handlePlatoonChange}>
                                        <option value="">Виберіть взвод</option>
                                        {platoons.map((platoon) => (
                                            <option key={platoon.platoon_id} value={platoon.platoon_number}>
                                                {platoon.platoon_number}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="select-container">
                                <label>
                                    Виберіть в/с:
                                    <select value={selectedSoldier} onChange={handleSoldierChange}>
                                        <option value="">Виберіть в/с</option>
                                        {soldiers.map((soldier) =>
                                            soldier.platoon === parseInt(selectedPlatoon) ? (
                                                <option key={soldier.soldier_id} value={soldier.soldier_id}>
                                                    {soldier.soldier_rank + ' ' + soldier.surname + ' ' + soldier.name}
                                                </option>
                                            ) : null
                                        )}
                                    </select>
                                </label>
                            </div>
                            <div className="select-container">
                                <label>
                                    Виберіть вправу:
                                    <select value={selectedExercise} onChange={handleExerciseChange}>
                                        <option value="">Виберіть вправу</option>
                                        {Object.keys(training).map((key) => {
                                            return (
                                                <option key={key} value={training[key]}>
                                                    {training[key]}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </label>
                            </div>
                            <div className="select-container">
                                <label>
                                    Введіть результат результат:
                                    <input value={selectedResult} onChange={handleResultChange}>
                                    </input>
                                </label>
                            </div>
                            <button type="submit">Підтвердити</button>
                        </form>
                    </Modal>
                    {platoons.length > 0 ? (
                        <ul>
                            {platoons.map((platoon) => (
                                <Accordion style={{
                                    marginBottom: "20px",
                                    backgroundColor: "#D3D3D3",
                                    color: "#000000",
                                    border: "none",
                                    borderRadius: "4px"
                                }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="platoon-content"
                                                      id="platoon-header">
                                        <Typography variant="subtitle1">Взвод №{platoon.platoon_number}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails style={{background: "#ffffff"}}>
                                        <>
                                            <div style={{height: 400, width: "100%"}}>
                                                <DataGrid rows={exercise
                                                    .filter((training) => training.platoon_number === platoon.platoon_number)
                                                    .map((training, index) => ({
                                                        id: index + 1,
                                                        name: training.soldier.name,
                                                        surname: training.soldier.surname,
                                                        soldierRank: training.soldier.soldier_rank,
                                                        run3km: training.run3km,
                                                        rating_run3km: training.rating_run3km,
                                                        run100m: training.run100m,
                                                        rating_run100m: training.rating_run100m,
                                                        run6x100: training.run6x100,
                                                        rating_run6x100: training.rating_run6x100,
                                                        pullup: training.pullup,
                                                        rating_pullup: training.rating_pullup
                                                    }))
                                                } columns={columns}/>
                                            </div>
                                        </>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </ul>
                    ) : (
                        <Typography>Немає даних про взводи</Typography>
                    )}
                </Container>
            </Box>
        </>

    )
        ;
};
const Container = styled('div')({
    maxWidth: '50vw',
    margin: '0 auto',
    padding: '20px',
    fontSize: '18px'
});
export default PhysicalPage;
