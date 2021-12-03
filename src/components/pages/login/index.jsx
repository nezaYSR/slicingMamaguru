import React, { useState, Fragment, useCallback } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Login = () => {
    const [user_name, setUser_name] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();
    const MySwal = withReactContent(Swal)

    function handleSubmit(event) {
        event.preventDefault();

        const user = { user_name, password };

        axios.post(`http://falcon-dev.ap-southeast-1.elasticbeanstalk.com/api/auth/auth`, user)
            .then(res => {
                if (res.data.success == true) {
                    localStorage.setItem('user_id', res.data.user_id)
                    localStorage.setItem('user_name', user_name)
                    localStorage.setItem('display_name', res.data.display_name)
                    localStorage.setItem('userType', res.data.user_type)
                    localStorage.setItem('authenticated', true)
                    axios.get(`http://falcon-dev.ap-southeast-1.elasticbeanstalk.com/api/admin/get_user_details?user_id=${res.data.user_id}`)
                        .then(res => {
                            localStorage.setItem('kids_id', res.data.kids[0].kids_id)
                        })

                    MySwal.fire({
                        icon: 'success',
                        title: `welcome ${user_name}`,
                        showConfirmButton: false,
                        timer: 1500
                    })

                    history.push("/");
                } else {
                    setUser_name('')
                    setPassword('')
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message
                    })
                }
            })

    }

    return (
        <Form className="form" onSubmit={handleSubmit}>
            <h3 className="welcome-word" >Hello Welcome to Mamaguru <br /> Please login to use our briliant features</h3>
            <Form.Group className="mb-3 form-child" controlId="user_name">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="username"
                    placeholder="Enter username"
                    value={user_name}
                    onChange={(e) => setUser_name(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3 form-child" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="btn-form">
                Submit
            </Button>
        </Form>
    )
}

export default withRouter(Login);