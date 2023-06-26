import React, {useEffect, useState} from 'react';
import {styled} from '@mui/system';
import {Button, Modal, Typography, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
import App from '../components/App';
import {Box} from '../components/Box';
import {
    allSoldiersRoute,
    checkauth,
    createSoldiers,
    getPlatoons,
    createPlatoon,
} from '../utils/APIRoutes';

const ManageSoldiersPage = () => {
    const [platoonModalOpen, setPlatoonModalOpen] = useState(false);
    const [platoonNumber, setPlatoonNumber] = useState('');
    const [platoonCommanderRank, setPlatoonCommanderRank] = useState('');
    const [platoonCommanderName, setPlatoonCommanderName] = useState('');
    const [platoonCommanderSurname, setPlatoonCommanderSurname] = useState('');
    const [platoons, setPlatoons] = useState([]);
    const [soldiers, setSoldiers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const authResponse = await axios.get(checkauth, {
                    headers: {
                        'access-token': token,
                    },
                });
                const userData = authResponse.data;

                const platoonsResponse = await axios.get(getPlatoons, {
                    params: {
                        company: userData.user.company,
                    },
                });
                setPlatoons(platoonsResponse.data.data);

                const soldiersResponse = await axios.get(allSoldiersRoute, {
                    params: {
                        company: userData.user.company,
                    },
                });
                setSoldiers(soldiersResponse.data.data);

                setUser(userData.user);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event, setValue) => {
        setValue(event.target.value);
    };

    const handlePlatoonModalOpen = () => {
        setPlatoonModalOpen(true);
    };

    const handlePlatoonModalClose = () => {
        setPlatoonModalOpen(false);
        setPlatoonNumber('');
        setPlatoonCommanderRank('');
        setPlatoonCommanderName('');
        setPlatoonCommanderSurname('');
    };

    const handleSubmitPlatoon = async (event) => {
        event.preventDefault();
        const newPlatoonCommander = {
            user_id: user.user_id,
            platoon: platoonNumber,
            company: user.company,
            name: platoonCommanderName,
            surname: platoonCommanderSurname,
            soldier_rank: platoonCommanderRank,
            level_physical_fitness: 'ok',
        };

        try {
            const responseNewCommander = await axios.post(createSoldiers, newPlatoonCommander);
            console.log(responseNewCommander.data);

            const newPlatoon = {
                platoon_number: parseInt(platoonNumber),
                company: responseNewCommander.data.soldier.company,
                commander_id: responseNewCommander.data.soldier.solider_id,
            };
            const responseNewPlatoon = await axios.post(createPlatoon, newPlatoon);

            console.log(responseNewPlatoon);
            const token = localStorage.getItem('token');
            const authResponse = await axios.get(checkauth, {
                headers: {
                    'access-token': token,
                },
            });
            const userData = authResponse.data;
            const platoonsResponse = await axios.get(getPlatoons, {
                params: {
                    company: userData.user.company,
                },
            });
            setPlatoons(platoonsResponse.data);
        } catch (error) {
            console.error(error);
        }

        handlePlatoonModalClose();
    };

    const columns = [
        {field: 'id', headerName: '№', width: 50},
        {field: 'platoon', headerName: '№ взводу', width: 100},
        {field: 'name', headerName: "Ім'я", width: 180},
        {field: 'surname', headerName: 'Прізвище', width: 200},
        {field: 'soldierRank', headerName: 'Звання', width: 180},
        {field: 'levelPhysicalFitness', headerName: 'Рівень фізичної підготовленості', width: 280},
    ];

    const rows = soldiers
        .filter((soldier) => soldier.platoon === platoon.platoon_number)
        .map((soldier, index) => ({
            id: soldier.soldier_id,
            platoon: soldier.platoon,
            name: soldier.name,
            surname: soldier.surname,
            soldierRank: soldier.soldier_rank,
            levelPhysicalFitness: soldier.level_physical_fitness,
        }));

    return (
        <>
            <App/>
            <Box css={{px: '$12', mt: '0.1vh', '@xsMax': {px: '$10'}}}>
                <Container>
                    <h1>Особовий склад {user?.company}-ої роти</h1>
                    <Button onClick={handlePlatoonModalOpen} variant="contained" color="primary">
                        Додати взвод
                    </Button>


                    <Modal open={platoonModalOpen} onClose={handlePlatoonModalClose} onClick={handlePlatoonModalOpen}>
                        <ModalContent>
                            <h2>Додати взвод</h2>
                            <Form onSubmit={handleSubmitPlatoon}>
                                <FormGroup>
                                    <Label>№ взводу:</Label>
                                    <Input type="number" value={platoonNumber}
                                           onChange={(event) => handleInputChange(event, setPlatoonNumber)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Звання командира:</Label>
                                    <Input type="text" value={platoonCommanderRank}
                                           onChange={(event) => handleInputChange(event, setPlatoonCommanderRank)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Ім'я командира:</Label>
                                    <Input type="text" value={platoonCommanderName}
                                           onChange={(event) => handleInputChange(event, setPlatoonCommanderName)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Прізвище командира:</Label>
                                    <Input type="text" value={platoonCommanderSurname}
                                           onChange={(event) => handleInputChange(event, setPlatoonCommanderSurname)}/>
                                </FormGroup>
                                <ButtonGroup>
                                    <Button type="submit">Зберегти</Button>
                                    <Button variant="outlined" color="secondary" onClick={handlePlatoonModalClose}>
                                        Вийти
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        </ModalContent>
                    </Modal>


                    {/* Display the platoons */}
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
                                            {/* Display the soldiers in the platoon */}
                                            {soldiers
                                                .filter((soldier) => soldier.platoon === platoon.platoon_number)
                                                .length > 0 ? (
                                                <DataGrid rows={rows} columns={columns} autoHeight/>
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


                </Container>
            </Box>
        </>
    );
};

const Container = styled('div')({
    maxWidth: '1000px',
    margin: '0 auto',
});

const ModalContent = styled('div')({
    position: 'absolute',
    width: '400px',
    backgroundColor: '#fff',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    padding: '24px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
});

const FormGroup = styled('div')({
    marginBottom: '16px',
});

const Label = styled('label')({
    marginBottom: '8px',
    fontWeight: 'bold',
});

const Input = styled('input')({
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
});

const ButtonGroup = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '16px',
});

export default ManageSoldiersPage;
