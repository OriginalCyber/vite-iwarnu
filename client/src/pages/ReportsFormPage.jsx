import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from "react-router-dom";

export default function ReportsFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/server/reports/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setPhone(data.phone);
            setDate(data.date);
            setTime(data.time);
            setAddress(data.address);
            setDescription(data.description);
        })
    }, [id]);
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    async function saveReport(ev) {
        ev.preventDefault();
        const reportData = {
            title, phone, date, time,
            location, address, description
        };
        if (id) {
            // update 
            await axios.put('/server/reports', {
                id, ...reportData
            });
            setRedirect(true);
        } else {
            // new report 
            await axios.post('/server/reports', reportData);
            setRedirect(true);
        }
    }
    if (redirect) {
        return <Navigate to={'/IndexPage'} />
    }

    return (
        <div className='pt-6'>
            {/* <AccountNav /> */}
            <form onSubmit={saveReport} >
                {preInput('title', 'เรื่องที่ร้องเรียน')}
                <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder="กรุณาระบุเรื่องที่ร้องเรียน" />
                {preInput('phone', 'เบอร์โทรศัพท์')}
                <input type='number' value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="กรุณาระบุเบอร์โทรศัพท์" />
                {preInput('date', 'เวลาที่เกิดเหตุ')}
                <input type='number' value={date} onChange={ev => setDate(ev.target.value)} placeholder="กรุณาระบุเวลาที่เกิดเหตุ" />
                {preInput('time', 'วันที่เกิดเหตุ')}
                <input type='number' value={time} onChange={ev => setTime(ev.target.value)} placeholder="กรุณาระบุวันที่เกิดเหตุ" />
                {preInput('location', 'สถานที่ที่เกิดเหตุ')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="กรุณาระบุสถานที่เกิดเหตุ" />
                {preInput('description', 'คำอธิบาย')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} className='p-4' placeholder="บรรยายพฤติกรรมการกระทำความผิด (เมื่อใด บุคคลใด ทำอะไร ที่ไหน อย่างไร ได้รับความเดือดร้อนอย่างไร พอสังเขป)" />
                <button className="primary my-4">Save</button>
            </form>
        </div>
    )
}