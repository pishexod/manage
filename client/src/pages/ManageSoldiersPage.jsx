import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Button, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

import App from '../components/App';
import { Box } from '../components/Box';
import { allSoldiersRoute, checkauth, createSoldiers } from '../utils/APIRoutes';

const ManageSoldiersPage = () => {
    const [platoon, setPlatoon] = useState('');
    const [company, setCompany] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [soldierRank, setRank] = useState('');
    const [levelPhysicalFitness, setFitnessLevel] = useState('');
    const [soldiers, setSoldiers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchSoldiers = async () => {
            try {
                const token = localStorage.getItem('token');
                const authResponse = await axios.get(checkauth, {
                    headers: {
                        'access-token': token,
                    },
                });
                const userData = authResponse.data;
                setUser(userData.user);
                setCompany(userData.user.company);

                const soldiersResponse = await axios.get(allSoldiersRoute, {
                    params: {
                        company: userData.user.company,
                    },
                });
                setSoldiers(soldiersResponse.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSoldiers();
    }, []);

    const handleInputChange = (event, setValue) => {
        setValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newSoldier = {
            user_id: user.user_id,
            platoon,
            company: user.company,
            name,
            surname,
            soldier_rank: soldierRank,
            level_physical_fitness: levelPhysicalFitness,
        };

        try {
            const response = await axios.post(createSoldiers, newSoldier);
            const createdSoldier = response.data.soldier;
            setSoldiers([...soldiers, createdSoldier]);
            closeModal();
        } catch (error) {
            console.error(error);
        }
        closeModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setName('');
        setSurname('');
        setRank('');
        setFitnessLevel('');
    };

    const handleModalOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    const columns = [
        { field: 'id', headerName: '№', width: 50 },
        { field: 'platoon', headerName: '№ взводу', width: 100 },
        { field: 'name', headerName: "Ім'я", width: 180 },
        { field: 'surname', headerName: 'Прізвище', width: 200 },
        { field: 'soldierRank', headerName: 'Звання', width: 180 },
        { field: 'levelPhysicalFitness', headerName: 'Рівень фізичної підготовленості', width: 280 },
    ];

    const rows = soldiers.map((soldier, index) => ({
        id: index + 1,
        platoon: soldier.platoon,
        name: soldier.name,
        surname: soldier.surname,
        soldierRank: soldier.soldier_rank,
        levelPhysicalFitness: soldier.level_physical_fitness,
    }));

    return (
        <>
            <App />
            <Box css={{ px: '$12', mt: '0.1vh', '@xsMax': { px: '$10' } }}>
                <Container>
                    <h1>Особовий склад {company}-ої роти</h1>
                    <Button onClick={openModal} variant="contained" color="primary">
                        Додати
                    </Button>
                    <DataGrid rows={rows} columns={columns} autoHeight />
                    <Modal open={isModalOpen} onClose={closeModal} onClick={handleModalOutsideClick}>
                        <ModalContent>
                            <h2>Додати військовослужбовця</h2>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label>№ взводу:</Label>
                                    <Input type="number" value={platoon} onChange={(event) => handleInputChange(event, setPlatoon)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Ім'я:</Label>
                                    <Input type="text" value={name} onChange={(event) => handleInputChange(event, setName)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Прізвище:</Label>
                                    <Input type="text" value={surname} onChange={(event) => handleInputChange(event, setSurname)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Звання:</Label>
                                    <Input type="text" value={soldierRank} onChange={(event) => handleInputChange(event, setRank)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Рівень фізичної підготовленості:</Label>
                                    <Input type="text" value={levelPhysicalFitness} onChange={(event) => handleInputChange(event, setFitnessLevel)} />
                                </FormGroup>
                                <ButtonGroup>
                                    <Button type="submit">Зберегти</Button>
                                    <Button variant="outlined" color="secondary" onClick={closeModal}>
                                        Вийти
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        </ModalContent>
                    </Modal>
                </Container>
            </Box>
        </>
    );
};

const Container = styled('div')`
  max-width: 55.9vw;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Label = styled('label')`
  font-weight: bold;
`;

const Input = styled('input')`
  padding: 8px;
  border: 1px solid #ccc;
`;

const ModalContent = styled('div')`
  background-color: #fff;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 100px;
`;

const ButtonGroup = styled('div')`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export default ManageSoldiersPage;
