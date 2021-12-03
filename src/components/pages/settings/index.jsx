import React, { useState, useEffect, Fragment, useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';
import Form from 'react-bootstrap/Form'

const Settings = () => {
    const [user_name, setUser_name] = useState()
    const [password, setPassword] = useState()
    const [first_name, setFirst_name] = useState()
    const [last_name, setLast_name] = useState()
    const [phone_number, setPhone_number] = useState()
    const [email, setEmail] = useState()
    const user_id = localStorage.getItem('user_id')

    useEffect(() => {
        axios.get(`http://falcon-dev.ap-southeast-1.elasticbeanstalk.com/api/admin/get_user_details?user_id=${user_id}`)
            .then(res => {
                if (res.status == 200) {
                    setUser_name(res.data.user_name)
                    setPassword(res.data.password)
                    setFirst_name(res.data.first_name)
                    setLast_name(res.data.last_name)
                    setPhone_number(res.data.phone_number)
                    setEmail(res.data.email)
                }
            })
    }, [])
    return (
        <>
            <div className="forms">
                <div className="form-group">
                    <p>Username</p>
                    <Form.Control size="lg" type="text" placeholder={user_name} disabled />
                </div>
                <div className="form-group">
                    <p>Password</p>
                    <Form.Control size="lg" type="password" placeholder={password} />
                </div>
                <div className="form-group">
                    <p>Firstname</p>
                    <Form.Control size="lg" type="text" placeholder={first_name} />
                </div>
                <div className="form-group">
                    <p>Lastname</p>
                    <Form.Control size="lg" type="text" placeholder={last_name} />
                </div>
                <div className="form-group">
                    <p>Phone Number</p>
                    <Form.Control size="lg" type="text" placeholder={phone_number} />
                </div>
                <div className="form-group">
                    <p>Email</p>
                    <Form.Control size="lg" type="text" placeholder={email} />
                </div>
            </div>
        </>
    )
}

export default withRouter(Settings);