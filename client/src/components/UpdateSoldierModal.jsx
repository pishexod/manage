import React, {useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import {updateSoldier, deleteSoldier} from '../utils/APIRoutes';

const UpdateSoldierModal = ({isOpen, onRequestClose, soldier, onUpdateSoldier}) => {
    const [name, setName] = useState(soldier.name);
    const [surname, setSurname] = useState(soldier.surname);
    const [soldierRank, setSoldierRank] = useState(soldier.soldierRank);
    const [soldier_id, setSoldier_id] = useState(soldier.soldier_id);
    const [platoon, setPlatoon] = useState(soldier.platoon);
    const [company, setCompany] = useState(soldier.company);
    console.log(soldier)

    const fetchUpdateSoldier = async () => {
        const response = await axios.post(updateSoldier, {
            soldier_id: soldier_id,
            name: name,
            surname: surname,
            soldier_rank: soldierRank
        })
    }

    const fetchDeleteSoldier = async () => {
        const response = await axios.delete(deleteSoldier, {
            data: {
                soldier_id: soldier_id
            }
        })
    }

    const handleDeleteSoldier = async () => {
        await fetchDeleteSoldier();
        onRequestClose();
        await onUpdateSoldier();
    }
    const handleUpdateSoldier = async () => {
        await fetchUpdateSoldier();
        onRequestClose();
        await onUpdateSoldier();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Оновити в/с"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h3>Оновити в/с</h3>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ім'я"/>
            <br/>
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Прізвище"/>
            <br/>
            <input
                type="text"
                value={soldierRank}
                onChange={(e) => setSoldierRank(e.target.value)}
                placeholder="Звання в/с"
            />
            <br/>
            <button className="btn" onClick={handleUpdateSoldier}>
                Оновити в/с
            </button>
            <button className="btn" onClick={handleDeleteSoldier}>
                Видалити в/с
            </button>
            <button className="btn" onClick={onRequestClose}>
                Закрити
            </button>
        </Modal>
    );
};

export default UpdateSoldierModal;
