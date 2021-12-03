import React, { useState, useEffect, Fragment, useCallback, BrowserRouter as Router } from "react";

import { withRouter, useHistory, Link } from "react-router-dom";

// IMAGES
import logo from '../../../assets/images/logo_full.png'


const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('user_id')
        localStorage.removeItem('user_name')
        localStorage.removeItem('display_name')
        localStorage.removeItem('userType')
        localStorage.removeItem('authenticated')
        localStorage.removeItem('kids_id')
    }
    const renderIfLoggedIn = () => {
        return (
            <>
                <ul>
                    <li>
                        <Link to="/reports">Reports</Link>
                    </li>
                    <li>
                        <Link to="/offers">Offers</Link>
                    </li>
                    <li>
                        <Link to="/payments">Payments</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={() => { logout() }}>Logout</Link>
                    </li>
                </ul>
            </>
        )
    }

    return (
        <Fragment>
            <section className="header">
                <a href="/"><img src={logo} alt="Mamaguru Logo" /></a>

                {
                    localStorage.getItem('authenticated') == 'true' ? renderIfLoggedIn() : <Link to="/">Login</Link>
                }
            </section>
        </Fragment>
    )
}

export default withRouter(Header);
// export default Header;