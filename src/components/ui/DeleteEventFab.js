import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventDelete } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.calendar)

    const handleDelete = () => {
        dispatch(eventDelete(active))
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
            <span> Borrar Evento </span>
        </button>
    )
}
