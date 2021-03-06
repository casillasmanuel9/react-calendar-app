import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import DateTimePicker from 'react-datetime-picker';

import moment from 'moment';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActive, eventStartAddNew, eventStartUpdated } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initialStateForm  = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui)

    const dispatch = useDispatch();

    const [titleValid, setTitleValid] = useState(true);
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());

    const [formValues, setFormValues] = useState(initialStateForm);

    const { active } = useSelector(state => state.calendar);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if(active) {
            setFormValues( active )
        } else {
            setFormValues( initialStateForm )
        }
    }, [active, setFormValues])

    const handleInputChange = ({ target }) => {
        setFormValues({ ...formValues, [target.name]: target.value })
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }


    const closeModal = () => {
        dispatch(uiCloseModal());
        setFormValues(initialStateForm);
        dispatch(eventClearActive());
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)) {
            console.log('fecha dos debe ser mayor');
            Swal.fire('Error', 'La fecha fin debe de ser mayor que la fecha de inicio', 'error')
            return;
        }
        if(title.trim().length < 2) {
            setTitleValid(false);
            return;
        } 
        
        //TODO: realizar grabacion
        setTitleValid(true);

        if(active) {
            dispatch(eventStartUpdated(formValues));
        } else {
            dispatch(eventStartAddNew({...formValues}));
        }

        closeModal();
        


    }

    return (
        <Modal
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
            isOpen={modalOpen}/* 
          onAfterOpen={afterOpenModal}*/
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        className="form-control"
                        minDate={dateStart}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${ !titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
