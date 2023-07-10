import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AddressLink from "../AddressLink";

export default function ReportPage() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/reports/${id}`).then(response => {
            setReport(response.data);
        });
    }, [id]);

    if (!report) return '';

    const handleDelete = async (id) => {
        const data = await axios.delete('/reports/' + id)

        if (data.data.success) {
            alert(data.data.message)
        }
    }


    return (
        <div className="mt-4 rounded-3xl bg-gray-100 mx-8 px-8 pt-8">
            <h1 className="text-3xl">{report.title}</h1>
            <AddressLink>{report.address}</AddressLink>
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {report.description}
                    </div>
                    <button className="" onClick={() => handleDelete(data.id)}>DELETE</button>

                </div>
            </div>
        </div>
    )
}