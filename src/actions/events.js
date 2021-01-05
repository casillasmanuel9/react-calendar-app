import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const { id, name } = getState().auth;
        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
            console.log(body);

            if (body.ok) {
                event.id = body.evento._id;
                event.user = {
                    _id: id,
                    name
                }
                dispatch(eventAddNew(event));
            }
        } catch (error) {

        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActive = () => ({
    type: types.eventClearActive
});

export const eventStartUpdated = (event) => {
    return async (dispatch, getState) => {
        const { id, name } = getState().auth;
        try {
            const resp = await fetchConToken(`events/${event._id}`, event, 'PUT');
            const body = await resp.json();

            console.log(body);
            const eventActualizado = body.evento;
            if(body.ok) {
                console.log('distpach');
                eventActualizado.user = {
                    _id: id,
                    name
                }
                dispatch(eventUpdate(eventActualizado))
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error', error.msg, 'error');
        }
    }
}

const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event
})

export const startEventDeleted = (event) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`events/${event._id}`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok) {
                dispatch(eventDelete(event))
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error', error.msg, 'error');
        }
    }
}

const eventDelete = (event) => ({
    type: types.eventDelete,
    payload: event
})

export const eventStartLoadin = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('events')
            const body = await resp.json();
            const events = prepareEvents(body.eventos);
            console.log(events);
            dispatch(eventLoaded(events));
        } catch(e){
            console.log(e);
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogOut = ({
    type: types.eventLogOut,
})