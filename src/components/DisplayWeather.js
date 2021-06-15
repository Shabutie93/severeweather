import React from 'react';
import { Jumbotron } from 'reactstrap';
import LoadingComponent from './LoadingComponent';

function DisplayWeather({ data }) {
    
    if (!data) return null
    
    const {
        title = '',
        features = [],
        status,
    } = data;
    
    debugger
    if (status === 400) return <h2>Invalid parameters!</h2>
    if  (features.length === 0) return <Jumbotron className="noalertjumbo">No severe weather alerts</Jumbotron>

    const { properties = {} } = features[0] || {};
    const capTitle = title.charAt(0).toUpperCase() + title.slice(1);

    return (
            <div>
                <Jumbotron className="jumboweather">
                    <h2 className="weatherheader">{capTitle} at {new Date().toLocaleTimeString()}</h2>
                    <span>
                        <h1>{properties.event}</h1>
                        <p>Severity: {properties.severity}</p>
                        <p>Certainty: {properties.certainty}</p>
                        <p>Urgency: {properties.urgency}</p>
                    </span>
                </Jumbotron>
            </div>
        );
    }

export default DisplayWeather;