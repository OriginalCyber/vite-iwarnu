import React, { useEffect, useState } from 'react';

export const DateTime = () => {

    var [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }

    });

    return (
        <div>
            <p> วันที่ : {date.toLocaleDateString()}</p>
            <p> เวลา : {date.toLocaleTimeString()}</p>
        </div>
    )
}

export default DateTime