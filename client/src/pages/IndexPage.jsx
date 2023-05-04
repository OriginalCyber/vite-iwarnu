// import axios from "axios";
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowPaage from './ShowPaage';

export default function IndexPage() {

    return (
        <div>
            <div className="pt-12">
                <Link to="/ReportsFormPage">ReportPage</Link>
            </div>
            <ShowPaage />

        </div>
    );
}