import React, { useState, useEffect, Fragment, useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const Reports = () => {
    const [reports, setReports] = useState([])
    const [images, setImages] = useState([])
    const [isFetchFinished, setIsFetchFinished] = useState(false)
    const kids_id = localStorage.getItem('kids_id')

    useEffect(() => {

        axios.get(`http://falcon-dev.ap-southeast-1.elasticbeanstalk.com/api/reports/fetch_reports?kids_id=${kids_id}`)
            .then(res => {
                for (var i = 0; i < res.data.reports.length; i++) {
                    reports.push(res.data.reports[i])
                }
                setIsFetchFinished(true);
            })


    }, [])

    if (!isFetchFinished) return <p>Now loading..</p>;

    return (
        <>
            < ul className="reports" >
                {
                    reports.map((report) => (
                        <li>
                            <p className="session">Session {report._session_no} -- {report.session_date}</p>
                            <div className="image-border">
                                <img className="image" src={"http://falcon-dev.ap-southeast-1.elasticbeanstalk.com/api/images/image?image_id=" + report.image_id} alt="" />
                                <p className="activity">{report.activity_id}</p>
                                <p className="summary">{report.summary}</p>
                                <p className="teacher">Co-Teaching partner <i>{report.teaching_partner}</i></p>
                                <Button variant="primary" className="btn-form">
                                    Download Report
                                </Button>
                            </div>
                            <p className="next">Next Activity/Improvement Plan: {report.next_activity}</p>
                        </li>
                    ))
                }
            </ul >
        </>
    )
}

export default withRouter(Reports);