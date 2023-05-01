import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import ReportsPage from './ReportsPage';

export default function AccountPage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/')
        setUser(null);
    }

    if (!ready) {
        return 'loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    function linkClasses(type = null) {
        let classes = 'py-2 px-6';
        if (type === subpage) {
            classes += 'bg-primary text-white rounded-full';
        }
        return classes
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <nav className='w-full flex justify-center mt-8 gap-2 md-8'>
                <Link className={linkClasses('profile')} to={'/account/profile'} >My Profile</Link>
                <Link className={linkClasses('reports')} to={'/reports'} >ReportsPage</Link>
            </nav>
            {subpage === 'profile' && (
                <div className='page-account'>
                    <div className="flex justify-center">
                        <div className="text-center max-w-lg mx-auto">
                            ข้อมูลผู้ใช้
                            <div className="show-email">
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
    )
}