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
    allSoldiersRoute

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
    const [showDataGrid, setShowDataGrid] = useState(false);

    const training = ['Біг на 3км.', 'Біг на 100м.', 'Біг 6х100', 'Підтягування']
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
        fetchExercise();
        fetchSoldiers();
    }, [])

    const handleDataGridShow = () => {
        setShowDataGrid(true)
    }
    const handleDataGridClose = () => {
        setShowDataGrid(false);
    }
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
            console.log(response.data.data)
            setExercise(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePlatoonChange = (event) => {
        setSelectedPlatoon(event.target.value);
    };

    const handleSoldierChange = (event) => {
        setSelectedSoldier(event.target.value);
    };

    const handleExerciseChange = (event) => {
        setSelectedExercise(event.target.value);
        console.log(event.target.value)
    };

    const handleResultChange = (event) => {
        setSelectedResult(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(selectedPlatoon, selectedSoldier, selectedExercise, selectedResult);
        try {
            const parsedUser = await getUser();
            const response = await axios.post(createExercise, {
                company: parsedUser.company,
                platoon_number: selectedPlatoon,
                soldier_id: selectedSoldier,
                exercise: selectedExercise,
                result: selectedResult
            })
            await fetchExercise();
            console.log(response)
            handleModalClose();
        } catch (e) {
            console.log(e)
        }
    };

    const columns = [
        {field: 'id', headerName: '№', width: 50},
        {field: 'name', headerName: "Ім'я", width: 150},
        {field: 'surname', headerName: 'Прізвище', width: 150},
        {field: 'soldierRank', headerName: 'Звання', width: 150},
        {field: 'exercise', headerName: 'Вправа', width: 140},
        {field: 'result', headerName: 'Результат', width: 140},
        {field: 'rating', headerName: 'Оцінка', width: 100},
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
                                        {training.map((train) =>
                                            <option key={train} value={train}>
                                                {train}
                                            </option>
                                        )}
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
                                        {showDataGrid ? (
                                            <>
                                                <div style={{height: 400, width: "100%"}}>
                                                    {exercise
                                                        .filter((training) => training.exercise === selectedExercise)
                                                        ? (
                                                            <DataGrid rows={exercise
                                                                .filter((training) => training.platoon_number === platoon.platoon_number && training.exercise === selectedExercise)
                                                                .map((training, index) => ({
                                                                    id: index + 1,
                                                                    name: training.soldier.name,
                                                                    surname: training.soldier.surname,
                                                                    soldierRank: training.soldier.soldier_rank,
                                                                    exercise: training.exercise,
                                                                    result: training.result,
                                                                    rating: ''
                                                                }))
                                                            } columns={columns}/>
                                                        ) : (
                                                            <Typography>Немає даних про солдатів у цьому
                                                                взводі</Typography>
                                                        )}
                                                </div>
                                                <div className="container">
                                                    <div className="button-row">
                                                        <button className="btn" onClick={handleDataGridClose}>
                                                            Повернутися
                                                        </button>
                                                    </div>
                                                </div>
                                            </>

                                        ) : (
                                            <div className="container">
                                                <div className="button-row">
                                                    Виберіть вправи:
                                                    {training.map((exercise) => (

                                                        <label key={exercise}>
                                                            <input
                                                                type="checkbox"
                                                                value={exercise}
                                                                checked={selectedExercise.includes(exercise)}
                                                                onChange={handleExerciseChange}
                                                                name={"checkbox-" + platoon.platoon_number}
                                                            />
                                                            {exercise}
                                                        </label>
                                                    ))}
                                                    <button className="btn" onClick={handleDataGridShow}>
                                                        Підтвердити
                                                    </button>
                                                </div>
                                            </div>
                                        )}

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
