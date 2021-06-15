import React from 'react';
import { Fade } from 'react-animation-components';

function About() {
    return (
        <div className="container">
            <div className="row-content align-items-center">
                <div className="col-6">
                    <h2>Mission</h2>
                    <p>Storm Breaker is a a real time severe weather tracker
                        built with React, React-Redux, Redux-Thunk, MongoDB,
                        and fetching the Weather.gov RESTful API.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;