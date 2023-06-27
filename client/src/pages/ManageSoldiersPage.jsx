import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import {DataGrid} from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box} from '../components/Box';
import '../css/manage_page.css';
import {
    allSoldiersRoute,
    createSoldiers,
    getPlatoons,
    createPlatoon,
} from '../utils/APIRoutes';
import {Typography, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import App from "../components/App";

const ManageSoldiersPage = () => {
    const [platoons, setPlatoons] = useState([]);
    const [selectedPlatoon, setSelectedPlatoon] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [soldierRank, setSoldierRank] = useState('');
    const [levelPhysicalFitness, setLevelPhysicalFitness] = useState('');
    const [platoonNumber, setPlatoonNumber] = useState('');
    const [commanderName, setCommanderName] = useState('');
    const [commanderSurname, setCommanderSurname] = useState('');
    const [commanderRank, setCommanderRank] = useState('');
    const [showAddSoldierModal, setShowAddSoldierModal] = useState(false);
    const [showCreatePlatoonModal, setShowCreatePlatoonModal] = useState(false);
    const [soldiers, setSoldiers] = useState([]);

    useEffect(() => {
        fetchPlatoons();
        fetchSoldiers();
    }, []);

    Modal.setAppElement('#root');
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
    };

    const handleAddSoldier = async () => {
        try {
            const parsedUser = await getUser();
            const response = await axios.post(createSoldiers, {
                user_id: parsedUser.user_id,
                platoon: selectedPlatoon,
                company: parsedUser.company,
                name,
                surname,
                soldier_rank: soldierRank,
                level_physical_fitness: levelPhysicalFitness,
            });
            console.log(response.data);
            await fetchSoldiers();
            setSelectedPlatoon('')
            setName('');
            setSurname('');
            setSoldierRank('');
            setLevelPhysicalFitness('');
            setShowAddSoldierModal(false); // Закриття модального вікна після додавання солдата
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreatePlatoon = async () => {
        try {
            const parsedUser = await getUser();
            const responseCommander = await axios.post(createSoldiers, {
                user_id: parsedUser.user_id,
                platoon: platoonNumber,
                company: parsedUser.company,
                name: commanderName,
                surname: commanderSurname,
                soldier_rank: commanderRank,
                level_physical_fitness: 'ok',
            });
            soldiers.push(responseCommander.data.soldier)
            console.log(responseCommander.data);
            const response = await axios.post(createPlatoon, {
                company: parsedUser.company,
                platoon_number: platoonNumber,
                commander_id: responseCommander.data.soldier.soldier_id,
            });
            console.log(response.data);
            platoons.push(response.data.platoon)
            setPlatoonNumber('');
            setCommanderName('');
            setCommanderSurname('');
            setCommanderRank('');
            setShowCreatePlatoonModal(false); // Закриття модального вікна після створення взводу
        } catch (error) {
            console.log(error);
        }
    };
    const columns = [
        {field: 'id', headerName: '№', width: 50},
        {field: 'platoon', headerName: '№ взводу', width: 100},
        {field: 'name', headerName: "Ім'я", width: 180},
        {field: 'surname', headerName: 'Прізвище', width: 200},
        {field: 'soldierRank', headerName: 'Звання', width: 180},
        {field: 'levelPhysicalFitness', headerName: 'Рівень фізичної підготовленості', width: 280},
    ];
    return (
        <>
            <App/>
            <Box css={{px: '$12', mt: '0.1vh', '@xsMax': {px: '$10'}}}>
                <div className="container">
                    <div className="button-row">
                        <button className="btn" onClick={() => setShowAddSoldierModal(true)}>
                            Додати в/с
                        </button>
                        <button className="btn" onClick={() => setShowCreatePlatoonModal(true)}>
                            Створити взвод
                        </button>
                        <Modal
                            isOpen={showAddSoldierModal}
                            onRequestClose={() => setShowAddSoldierModal(false)}
                            contentLabel="Додати в/с"
                            className="modal"
                            overlayClassName="modal-overlay"
                        >
                            <h3>Додати солдата</h3>
                            <select
                                value={selectedPlatoon}
                                onChange={(e) => setSelectedPlatoon(e.target.value)}
                            >
                                <option value="">Виберіть взвод</option>
                                {platoons.map((platoon) => (
                                    <option key={platoon.platoon_id} value={platoon.platoon_number}>
                                        {platoon.platoon_number}
                                    </option>
                                ))}
                            </select>
                            <br/>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ім'я"
                            />
                            <br/>
                            <input
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                placeholder="Прізвище"
                            />
                            <br/>
                            <input
                                type="text"
                                value={soldierRank}
                                onChange={(e) => setSoldierRank(e.target.value)}
                                placeholder="Ранг солдата"
                            />
                            <br/>
                            <input
                                type="text"
                                value={levelPhysicalFitness}
                                onChange={(e) => setLevelPhysicalFitness(e.target.value)}
                                placeholder="Рівень фізичної підготовки"
                            />
                            <br/>
                            <button className="btn" onClick={handleAddSoldier}>
                                Додати в/с
                            </button>
                            <button className="btn" onClick={() => setShowAddSoldierModal(false)}>
                                Закрити
                            </button>
                        </Modal>
                    </div>

                </div>

                <Modal
                    isOpen={showCreatePlatoonModal}
                    onRequestClose={() => setShowCreatePlatoonModal(false)}
                    contentLabel="Створити взвод"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h3>Створити взвод</h3>
                    <input
                        type="text"
                        value={platoonNumber}
                        onChange={(e) => setPlatoonNumber(e.target.value)}
                        placeholder="Номер взводу"
                    />
                    <br/>
                    <input
                        type="text"
                        value={commanderName}
                        onChange={(e) => setCommanderName(e.target.value)}
                        placeholder="Ім'я командира"
                    />
                    <br/>
                    <input
                        type="text"
                        value={commanderSurname}
                        onChange={(e) => setCommanderSurname(e.target.value)}
                        placeholder="Прізвище командира"
                    />
                    <br/>
                    <input
                        type="text"
                        value={commanderRank}
                        onChange={(e) => setCommanderRank(e.target.value)}
                        placeholder="Ранг командира"
                    />
                    <br/>
                    <button className="btn" onClick={handleCreatePlatoon}>
                        Створити взвод
                    </button>
                    <button className="btn" onClick={() => setShowCreatePlatoonModal(false)}>
                        Закрити
                    </button>
                </Modal>
                {platoons.length > 0 ? (
                    <ul>
                        {platoons.map((platoon) => (
                            <li key={platoon.platoon_id}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="platoon-content"
                                                      id="platoon-header">
                                        <Typography variant="subtitle1">Взвод №{platoon.platoon_number}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {soldiers
                                            .filter((soldier) => soldier.platoon === platoon.platoon_number)
                                            .length > 0 ? (
                                            <DataGrid rows={soldiers
                                                .filter((soldier) => soldier.platoon === platoon.platoon_number)
                                                .map((soldier, index) => ({
                                                    id: index + 1,
                                                    platoon: soldier.platoon,
                                                    name: soldier.name,
                                                    surname: soldier.surname,
                                                    soldierRank: soldier.soldier_rank,
                                                    levelPhysicalFitness: soldier.level_physical_fitness,
                                                }))
                                            } columns={columns} autoHeight/>
                                        ) : (
                                            <Typography>Немає даних про солдатів у цьому взводі</Typography>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Typography>Немає даних про взводи</Typography>
                )}
            </Box>
        </>
    );
};

export default ManageSoldiersPage;