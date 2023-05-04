import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";

export default function ReportsPage() {
    const [reports, setReports] = useState([]);
    useEffect(() => {
        axios.get('/server/reports').then(({ data }) => {
            setReports(data);
        })
    }, []);
    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/reports/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                    เพิ่มข้อมูล
                </Link>
            </div>
            <div className="mt-4">
                {reports.length > 0 && reports.map(report => (
                    <Link to={'/reports/' + report._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{report.title}</h2>
                            <p className="text-sm mt-2">{report.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}