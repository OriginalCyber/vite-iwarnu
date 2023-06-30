import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ShowPaage() {

    const [reports, setReports] = useState([]);
    useEffect(() => {
        axios.get('/reports').then(response => {
            setReports(response.data);
        });
    }, []);

    return (
        <div>
            <div className="pt-12">
                <Link to="/ReportsFormPage">ReportPage</Link>
            </div>


            <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {reports.length > 0 && reports.map(report => (
                    <>
                        <Link to={'/report/' + report._id}>
                            <h2 className="font-bold">สถานที่ที่เกิดเหตุ {report.address}</h2>
                            <h3 className="text-sm text-gray-500">เรื่องที่ร้องเรียน {report.title}</h3>
                            <h3 className="text-sm text-gray-500">เบอร์โทรศัพท์ {report.phone}</h3>
                            <h3 className="text-sm text-gray-500">เวลาที่เกิดเหตุ {report.date}</h3>
                            <h3 className="text-sm text-gray-500">วันที่เกิดเหตุ {report.time}</h3>
                            <h3 className="text-sm text-gray-500">คำอธิบาย {report.description}</h3>
                        </Link>
                    </>
                ))}
            </div>



        </div>
    )
}
