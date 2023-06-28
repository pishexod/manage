import React, { useEffect, useState } from 'react';
import { Button, Modal, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/style.css';
import App from '../components/App';
import axios from 'axios';
import { createTraining, getTraining } from '../utils/APIRoutes';
import moment from 'moment';

const TrainingSchedule = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [training, setTraining] = useState([]);
    const [selectedPlatoon, setSelectedPlatoon] = useState('');
    const [selectedExercise, setSelectedExercise] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchTraining();
    }, []);

    const fetchTraining = async () => {
        try {
            const response = await axios.get(getTraining);
            setTraining(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'platoon', headerName: '№ взводу', width: 150 },
        { field: 'exercise', headerName: 'Норматив', width: 150 },
        {
            field: 'date',
            headerName: 'Дата',
            width: 150,
        },
    ];

    const handleAddRow = async (event) => {
        event.preventDefault();

        try {
            const newRow = {
                platoon: selectedPlatoon,
                exercise: selectedExercise,
                date: moment(selectedDate).format('MM-DD-YYYY'),
            };

            closeModal();
            await axios.post(createTraining, newRow);
            await fetchTraining();
        } catch (error) {
            console.error(error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPlatoon('');
        setSelectedExercise('');
        setSelectedDate(null)
        setIsModalOpen(false);
    };

    const handleModalOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    const rows = training.map((train, index) => ({
        id: index + 1,
        platoon: train.platoon,
        exercise: train.exercise,
        date: train.date,
    }));

    return (
        <>
            <App />
            <Container sx={{ px: 12, mt: '0.1vh', '@media (max-width: 600px)': { px: 10 } }}>
                <h1>Розклад здачі нормативів</h1>
                <Button onClick={openModal} variant="contained" color="primary">
                    Додати
                </Button>
                <Modal open={isModalOpen} onClose={closeModal} onClick={handleModalOutsideClick}>
                    <StyledModalContent>
                        <h2>Додати військовослужбовця</h2>
                        <Form onSubmit={handleAddRow}>
                            <StyledFormControl>
                                <InputLabel>Вибрати взвод</InputLabel>
                                <Select value={selectedPlatoon} onChange={(e) => setSelectedPlatoon(e.target.value)} name="number">
                                    <MenuItem value={1}>1-ий взвод</MenuItem>
                                    <MenuItem value={2}>2-ий взвод</MenuItem>
                                    <MenuItem value={3}>3-ий взвод</MenuItem>
                                </Select>
                            </StyledFormControl>
                            <StyledFormControl>
                                <InputLabel>Вибрати норматив</InputLabel>
                                <Select value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)} name="norm">
                                    <MenuItem value="біг">Біг</MenuItem>
                                    <MenuItem value="підтягування">Підтягування</MenuItem>
                                    <MenuItem value="інше">Інше</MenuItem>
                                </Select>
                            </StyledFormControl>
                            <StyledFormControl>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="dd.MM.yyyy"
                                    required
                                    placeholderText="Вибрати дату"
                                    style={{ width: '100%' }}
                                />
                            </StyledFormControl>
                            <StyledButtonGroup>
                                <Button type="submit">Зберегти</Button>
                                <Button variant="outlined" color="secondary" onClick={closeModal}>
                                    Вийти
                                </Button>
                            </StyledButtonGroup>
                        </Form>
                    </StyledModalContent>
                </Modal>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    disableColumnMenu
                    disableSelectionOnClick
                />
            </Container>
        </>
    );
};

const StyledModalContent = styled('div')({
    backgroundColor: '#fff',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    marginTop: '100px',
});

const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
});

const StyledFormControl = styled(FormControl)({
    marginBottom: '20px',
});

const StyledButtonGroup = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
});
const Container = styled('div')({
    maxWidth: '50vw',
    margin: '0 auto',
    padding: '20px',
});
export default TrainingSchedule;
