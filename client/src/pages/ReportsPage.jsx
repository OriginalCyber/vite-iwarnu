import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";

export default function ReportsPage() {
    const [reports, setReports] = useState([]);
    useEffect(() => {
        axios.get('/reports').then(({ data }) => {
            setReports(data);
        })
    }, []);


    return (
        <div>
            <AccountNav />
            <div className="mt-4">
                {reports.length > 0 && reports.map(report => (
                    <Link to={'/Report/' + report._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mt-4">
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