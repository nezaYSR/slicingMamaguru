import React, { useState, useEffect, Fragment, useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Login from "../login";

import welcomePic from '../../../assets/images/6.png'
import welcomePic2 from '../../../assets/images/59.png'

const Home = () => {
    const [authenticated, setAuthenticated] = useState(false)
    const [user_name, setUser_name] = useState('')
    const [isFetchFinished, setIsFetchFinished] = useState(false)


    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authenticated')
        const username = localStorage.getItem('user_name')

        if (isAuthenticated == 'true') {
            setUser_name(username)
        }
        setIsFetchFinished(true);
    }, [])
    if (!isFetchFinished) return <p>Now loading..</p>;
    const loggedIn = () => {
        return (
            <>
                <div className="welcome">
                    <h1>Welcome, {user_name}</h1>
                    <p>Mamaguru Co-Teaching Network</p>
                    <div className="images">
                        <img src={welcomePic} alt="" />
                        <img src={welcomePic2} alt="" />
                    </div>
                </div>
            </>
        )
    }

    return (
        localStorage.getItem('authenticated') == 'true' ?
            loggedIn() :
            <Login />
    )
}

export default withRouter(Home);