// no app.js colocar: 
//     import DateRangeComp from './components/DateRangeComp.jsx'

import { useEffect, useRef, useState } from "react";
import {DateRange} from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from "date-fns";

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangeComp = () => {

    // Date State
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7), //o numero indica quantos dias ficam selecionados automaticamente
            key: 'selection'
        }
    ])

    // open close
    const [open, setOpen] = useState(true)

    // get the target element to toggle
    const refOne = useRef(null)

    useEffect(() => {
    // define data presente no componente carregado
        // setCalendar(format(new Date(), 'dd/MM/yyyy'))
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


    return (
        <div className="calendarWrap">

            <input
                value={`${format(range[0].startDate, 'dd/MM/yyyy')} to ${format(range[0].endDate, 'dd/MM/yyyy')}`}
                readOnly
                className='inputBox'
                onClick={() => setOpen(open => !open )}
            />

            <div ref={refOne}>    
                {open &&
                    <DateRange
                        onChange={item => setRange([item.selection])}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={1}
                        direction="vertical"
                        className='calendarElement'
                    />
                }
            </div>
        </div>
    )
};

export default DateRangeComp