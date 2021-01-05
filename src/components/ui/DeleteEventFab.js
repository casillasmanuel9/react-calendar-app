import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startEventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.calendar)

    const handleDelete = () => {
        dispatch(startEventDeleted(active))
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
            <span> Borrar Evento </span>
        </button>
    )
}
