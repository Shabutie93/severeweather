import React from 'react';
import WeatherData from './WeatherDataComponent';


function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <WeatherData />
                </div>
            </div>
        </div>
        
    );
}



export default Home;