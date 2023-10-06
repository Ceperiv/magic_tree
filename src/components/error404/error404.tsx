import React from 'react';
import { Link } from 'react-router-dom';

import './error404.scss';
import error404Image from '../../assets/error_404.jpg';

function Error404() {
    return (
        <div className={'err_404'}>
            <Link className={'nav_link'} to="/main"><i>Go to Main</i></Link>
            <img src={error404Image} alt="Error 404" />
        </div>
    );
}

export { Error404 };
