import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { UserContext } from "../UserContext.jsx";
import ReportsPage from './ReportsPage';

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <AccountNav />

            {subpage === 'profile' && (
                <div className="page-profile">
                    <div className="flex justify-center">
                        <div className="text-center max-w-lg mx-auto">ข้อมูลผู้ใช้
                            <div className="show-user">
                                ชื่อผู้ใช้: {user.name} <br />
                                EMail: ({user.email}) <br />
                                รหัสประจำตัว: {user.number} <br />
                                เบอร์โทรศัพท์: {user.phone} <br />
                                ชื่อหน่วยงาน: {user.agency} <br />
                            </div>

                            <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                        </div>
                    </div>
                </div>
            )}

            {subpage === 'reports' && (
                <ReportsPage />
            )}
        </div>
    );
}