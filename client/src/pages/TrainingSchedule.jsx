import React, {useEffect, useState} from 'react';
import {Button, Modal, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {styled} from '@mui/system';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/style.css';
import App from '../components/App';
import axios from 'axios';
import {createTraining, getPlatoons, getTraining} from '../utils/APIRoutes';
import moment from 'moment';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils";
import {saveAs} from "file-saver";
import Template from "../assets/test.docx";

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

const TrainingSchedule = () => {
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [training, setTraining] = useState([]);
    const [selectedPlatoon, setSelectedPlatoon] = useState('');
    const [selectedRow, setSelectedRow] = useState('')
    const [selectedExercise, setSelectedExercise] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [platoons, setPlatoons] = useState([]);

    useEffect(() => {
        fetchTraining();
        fetchPlatoons();
    }, []);

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

    const fetchTraining = async () => {
        try {
            const response = await axios.get(getTraining);
            setTraining(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'platoon', headerName: '№ взводу', width: 150},
        {field: 'exercise', headerName: 'Норматив', width: 150},
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

    const exportToWord = () => {
        loadFile(Template, function (error, content) {
            if (error) {
                throw error;
            }
            var zip = new PizZip(content);
            var doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true
            });
            let data = rows.filter((row) => row.id === selectedRow);
            if (data[0].exercise === 'Біг на 3км.') {
                data[0].exercise = 'бігу на відстань 3 кілометри'
            } else if (data[0].exercise === 'Біг на 100м.') {
                console.log('ok')
                data[0].exercise = 'бігу на відстань 100 метрів'
            } else if (data[0].exercise === 'Біг 6х100') {
                console.log('ok')
                data[0].exercise = 'бігу на відстань 600 метрів'
                console.log(data[0].exercise)
            } else if (data[0].exercise === 'Підтягування') {
                data[0].exercise = 'підтягувань'
            }
            const user = getUser();
            console.log(data)
            doc.setData({
                company: user.company,
                surname: user.surname,
                rank: user.rank,
                username: user.username[0] + '.',
                platoon: data[0].platoon,
                date: data[0].date,
                exercise: data[0].exercise

            });
            try {
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render();
            } catch (error) {
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                function replaceErrors(key, value) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function (
                                error,
                                key
                            ) {
                                error[key] = value[key];
                                return error;
                            },
                            {});
                    }
                    return value;
                }

                console.log(JSON.stringify({error: error}, replaceErrors));

                if (error.properties && error.properties.errors instanceof Array) {
                    const errorMessages = error.properties.errors
                        .map(function (error) {
                            return error.properties.explanation;
                        })
                        .join("\n");
                    console.log("errorMessages", errorMessages);
                    // errorMessages is a humanly readable message looking like this :
                    // 'The tag beginning with "foobar" is unopened'
                }
                throw error;
            }
            var out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }); //Output the document using Data-URI
            saveAs(out, "Наказ.docx");
        });
    };


    return (
        <>
            <App/>
            <Container sx={{px: 12, mt: '0.1vh', '@media (max-width: 600px)': {px: 10}}}>
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
                                <Select value={selectedPlatoon} onChange={(e) => setSelectedPlatoon(e.target.value)}
                                        name="number">
                                    <MenuItem value="">Виберіть взвод</MenuItem>
                                    {platoons.map((platoon) => (
                                        <MenuItem key={platoon.platoon_id} value={platoon.platoon_number}>
                                            {platoon.platoon_number}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </StyledFormControl>
                            <StyledFormControl>
                                <InputLabel>Вибрати норматив</InputLabel>
                                <Select value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)}
                                        name="norm">
                                    <MenuItem value="Біг на 3км.">Біг на 3км.</MenuItem>
                                    <MenuItem value="Біг на 100м.">Біг на 100м.</MenuItem>
                                    <MenuItem value="Біг 6х100">Біг 6х100</MenuItem>
                                    <MenuItem value="Підтягування">Підтягування</MenuItem>
                                </Select>
                            </StyledFormControl>
                            <StyledFormControl>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="dd.MM.yyyy"
                                    required
                                    placeholderText="Вибрати дату"
                                    style={{width: '100%'}}
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
                <Modal open={showModal} onClose={closeModal} onClick={handleModalOutsideClick}>
                    <StyledModalContent>
                        <h2>Додати військовослужбовця</h2>
                        <Form onSubmit={handleAddRow}>
                            <StyledFormControl>
                                <InputLabel>Вибрати подію</InputLabel>
                                <Select value={selectedRow} onChange={(e) => setSelectedRow(e.target.value)}
                                        name="number">
                                    <MenuItem value="">Виберіть id події</MenuItem>
                                    {rows.map((row) => (
                                        <MenuItem key={row.id} value={row.id}>
                                            Подія №{row.id} взвод {row.platoon} {row.exercise}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </StyledFormControl>
                            <StyledButtonGroup>
                                <Button onClick={exportToWord}>Зберегти</Button>
                                <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
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
                <Button variant="contained" onClick={() => setShowModal(true)}>
                    Експортувати в Word
                </Button>
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
