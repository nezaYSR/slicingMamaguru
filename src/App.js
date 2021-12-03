import React, { useState, Fragment, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";

/// CSS | SCSS
import './App.scss';

// LAYOUTS
import Header from './components/layouts/header'

// PAGES
import Offers from "./components/pages/offers";
import Home from "./components/pages/home"
import Reports from './components/pages/reports'
import Payments from './components/pages/payments'
import Settings from './components/pages/settings'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Router>
      <Header />
      <Redirect to='/' component={Home} />
      <Route exact path="/" component={Home} />
      <Route path="/reports" component={Reports} />
      <Route path="/offers" component={Offers} />
      <Route path="/payments" component={Payments} />
      <Route path="/settings" component={Settings} />
    </Router>
  );
}

export default App;
