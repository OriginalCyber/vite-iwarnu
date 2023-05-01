import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [agency, setAgency] = useState('');
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/server/register', {
                name,
                email,
                password,
                number,
                phone,
                agency,
            });
            alert('ยินดีด้วย คุณศมัครสมาชิกสำเร็จแล้ว. กรุณาเข้าสู่ระบบ');
        } catch (e) {
            alert('สมัครสมาชิกไม่สำเร็จ. โปรดรองใหม่อีกครั้ง');
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">สมัครสมาชิก</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text"
                        placeholder="ชื่อผู้ใช้"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <input type="text"
                        placeholder="รหัสประจำตัว: 2111"
                        value={number}
                        onChange={ev => setNumber(ev.target.value)} />
                    <input type="text"
                        placeholder="เบอร์โทรศัพท์"
                        value={phone}
                        onChange={ev => setPhone(ev.target.value)} />
                    <input type="text"
                        placeholder="ชื่อหน่วยงาน: สภ.เมืองศรีสะเกษ"
                        value={agency}
                        onChange={ev => setAgency(ev.target.value)} />



                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}