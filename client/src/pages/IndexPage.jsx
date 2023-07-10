import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTime from "./DataTime";

export default function IndexPage() {

    const [reports, setReports] = useState([]);
    useEffect(() => {
        axios.get('/reports').then(response => {
            setReports(response.data);
        });
    }, []);

    return (
        <div>

            <div className="mt-6">
                <DataTime />
            </div>

            <div className="mt-6">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/reports/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                    เพิ่มข้อมูล
                </Link>
            </div>

            <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {reports.length > 0 && reports.map(report => (
                    // <Link to={'/report/' + report._id}>
                    //     <h2 className="font-bold">สถานที่ที่เกิดเหตุ {report.address}</h2>
                    //     <h3 className="text-sm text-gray-500">เรื่องที่ร้องเรียน {report.title}</h3>
                    //     <h3 className="text-sm text-gray-500">เบอร์โทรศัพท์ {report.phone}</h3>
                    //     <h3 className="text-sm text-gray-500">เวลาที่เกิดเหตุ {report.date}</h3>
                    //     <h3 className="text-sm text-gray-500">วันที่เกิดเหตุ {report.time}</h3>
                    //     <h3 className="text-sm text-gray-500">คำอธิบาย {report.description}</h3>
                    // </Link>
                    <div>
                        <h2 className="font-bold">สถานที่ที่เกิดเหตุ {report.address}</h2>
                        <h3 className="text-sm text-gray-500">เรื่องที่ร้องเรียน {report.title}</h3>
                        <h3 className="text-sm text-gray-500">เบอร์โทรศัพท์ {report.phone}</h3>
                        <h3 className="text-sm text-gray-500">เวลาที่เกิดเหตุ {report.date}</h3>
                        <h3 className="text-sm text-gray-500">วันที่เกิดเหตุ {report.time}</h3>
                        <h3 className="text-sm text-gray-500">คำอธิบาย {report.description}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}