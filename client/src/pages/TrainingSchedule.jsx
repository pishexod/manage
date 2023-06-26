import React, { useState } from 'react';
import { Button, Modal, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '../components/Box'
import { styled } from '@mui/system';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import App from '../components/App';

const TrainingSchedule = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gridData, setGridData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [formValues, setFormValues] = useState({
        number: '',
        norm: '',
        date: null,
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'number', headerName: '№ взводу', width: 150 },
        { field: 'norm', headerName: 'Норматив', width: 150 },
        {
            field: 'date',
            headerName: 'Дата',
            width: 150,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
        },
    ];

    const handleRowClick = (row) => {
        setSelectedRow(row.id);
        setFormValues({
            number: row.number,
            norm: row.norm,
            date: new Date(row.date),
        });
        setIsModalOpen(true);
    };

    const handleAddRow = () => {
        const newRow = {
            id: gridData.length + 1,
            number: formValues.number,
            norm: formValues.norm,
            date: formValues.date,
        };
        setGridData((prevData) => [...prevData, newRow]);
        resetFormValues();
        closeModal();
    };

    const handleUpdateRow = () => {
        const updatedRow = {
            id: selectedRow,
            number: formValues.number,
            norm: formValues.norm,
            date: formValues.date,
        };
        const updatedData = gridData.map((row) => (row.id === selectedRow ? updatedRow : row));
        setGridData(updatedData);
        resetFormValues();
        closeModal();
    };
    const handleDeleteRow = () => {
        const updatedData = gridData.filter((row) => row.id !== selectedRow);
        setGridData(updatedData);
        resetFormValues();
        closeModal();
    };

    const resetFormValues = () => {
        setSelectedRow(null);
        setFormValues({
            number: '',
            norm: '',
            date: null,
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleModalOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    const handleFormInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            date: date,
        }));
    };

    return (
        <>
            <App />
            <Box sx={{ px: 12, mt: '0.1vh', '@media (max-width: 600px)': { px: 10 } }}>
                <Container>
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
                                    <Select value={formValues.number} onChange={handleFormInputChange} name="number">
                                        <MenuItem value={1}>1-ий взвод</MenuItem>
                                        <MenuItem value={2}>2-ий взвод</MenuItem>
                                        <MenuItem value={3}>3-ий взвод</MenuItem>
                                    </Select>
                                </StyledFormControl>
                                <StyledFormControl>
                                    <InputLabel>Вибрати норматив</InputLabel>
                                    <Select value={formValues.norm} onChange={handleFormInputChange} name="norm">
                                        <MenuItem value="біг">Біг</MenuItem>
                                        <MenuItem value="підтягування">Підтягування</MenuItem>
                                        <MenuItem value="інше">Інше</MenuItem>
                                    </Select>
                                </StyledFormControl>
                                <StyledFormControl>
                                    <DatePicker
                                        selected={formValues.date}
                                        onChange={handleDateChange}
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
                        rows={gridData}
                        columns={columns}
                        autoHeight
                        disableColumnMenu
                        disableSelectionOnClick
                        onRowClick={(params) => handleRowClick(params.row)}
                    />
                </Container>
            </Box>
        </>
    );
};

const Container = styled('div')({
    maxWidth: '50vw',
    margin: '0 auto',
    padding: '20px',
});

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

export default TrainingSchedule;
