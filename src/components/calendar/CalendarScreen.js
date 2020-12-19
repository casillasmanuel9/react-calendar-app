import React, { useState } from 'react'
import { Navbar } from './Navbar'

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { messages } from '../../helpers/CalendarMessagesEs';

import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/addNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab';
moment.locale('es');

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const events = [
    {
        title: 'Cumpleaños del jefe', start: moment().toDate(), end: moment().add(2, 'hours').toDate(), bgcolor: '#fafafa', notes: 'comprar pastel', user: {
            _id: 123,
            name: 'Manuel'
        }
    }
]

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const { events, active } = useSelector(state => state.calendar);

    console.log('events', events);
    const dispatch = useDispatch();

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
        console.log(e);
    }

    const onSelectEvent = (e) => {
        console.log(e);
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = () => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
            />

            <AddNewFab  />
            { 
                (active) && <DeleteEventFab />
            }  
            <CalendarModal />
        </div>
    )
}
