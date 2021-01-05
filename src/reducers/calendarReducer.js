import { types } from '../types/types';

/* {
    id: moment().valueOf(),
    title: 'Cumpleaños del jefe',
    start: moment().toDate(), 
    end: moment().add(2, 'hours').toDate(), 
    bgcolor: '#fafafa', 
    notes: 'comprar pastel', 
    user: {
        _id: 123,
        name: 'manuel'
    }
} */

const initialState = {
    events: [],
    active: null

}

export const calendarReducer = ( state = initialState, action ) => {
    switch (action.type) {

        case types.eventSetActive:
            return {...state, active : action.payload} 

        case types.eventAddNew: 
            return {...state, events : [action.payload, ...state.events]}

        case types.eventClearActive: 
            return {...state, active : null}
        case types.eventUpdate: 
            return { ...state, events : state.events.map(event => event._id === action.payload._id ? action.payload : event)}

        case types.eventDelete: 
            return {...state, events : state.events.filter(event=> event._id !== action.payload._id), active: null}

        case types.eventLoaded:
            return {...state, events: [...action.payload]}

        case types.eventLogOut: 
            return {...initialState}
        default:
            return state;
    }
}