import { useEffect, useRef, useState } from "react";
import {Calendar} from 'react-date-range';
import format from 'date-fns/format';

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const CalendarComp = () => {

    // Date State
    const [calendar, setCalendar] = useState('')

    // open close
    const [open, setOpen] = useState(true)

    // get the target element to toggle
    const refOne = useRef(null)

    useEffect(() => {
    // define data presente no componente carregado
        setCalendar(format(new Date(), 'dd/MM/yyyy'))
        document.addEventListener('keydown', hideOnEscape, true)
        document.addEventListener('click', hideOnClickOutside, true)
    }, [])

    // esconder dropdown no ESC
    const hideOnEscape = (e) => {
        console.log(e.key)
        if(e.key === "Escape") {
            setOpen(false)
        }
    }

    // esconder dropdown se clicar fora
    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }

    const handleSelect = (date) => {
        setCalendar(format(date, 'dd/MM/yyyy'))
    }

    return (
        <div className="calendarWrap">

            <input
                value={calendar}
                readOnly
                className='inputBox'
                onClick={() => setOpen(open => !open )}
            />

            <div ref={refOne}>    
                {open &&
                    <Calendar
                        date={new Date()}
                        onChange={handleSelect}
                        className='calendarElement'
                    />
                }
            </div>
        </div>
    )
};

export default CalendarComp