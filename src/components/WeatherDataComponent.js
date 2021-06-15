import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'reactstrap';
import { Control, Errors } from 'react-redux-form';
import DisplayWeather from './DisplayWeather';
import LoadingComponent from './LoadingComponent';


function WeatherData() {

  const [form, setForm] = useState({
    state: '',
    coordinates: '',
    touched: {
      state: false,
      coordinates: false
    }
  });

  const [passeddata, setData] = useState(null)
  const [error, setError] = useState(null)

  const urls = {
    'state':`https://api.weather.gov/alerts/active?status=actual&message_type=alert&area=${form.state}&urgency=expected,immediate&severity=severe,extreme&certainty=possible,likely,observed` ,
    'coordinates': `https://api.weather.gov/alerts/active?status=actual&message_type=alert&point=${form.coordinates}&urgency=expected,immediate&severity=severe,extreme&certainty=possible,likely,observed`
  }

  const maxLength = len => val => !val || (val.length <= len);
  const minLength = len => val => val && (val.length >= len);
  const isNumber = val => /[0-9]\,./i.test(val);
  const validAbbreviation = val => /^[A-Z]/i.test(val);


  const handleResponse = res => {
    if(res.ok) {
      return res.json()
    }
    setError(res.errorMessage)
  }

  function fetchData(e) {
      e.preventDefault();

      const url = form.state ? 'state' : 'coordinates'

      fetch(urls[url])
        .then(handleResponse)
        .then(json => setData(json))
        .catch(err => setError(err.errorMessage))
      
  }

  const goodData = passeddata === 'object' && passeddata.features && [].isArray(passeddata.features)
  
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "state") {
      setForm({ ...form, state: value });
    }
    if (name === "coordinates") {
      setForm({ ...form, coordinates: value });
    }
  };

  return (
    <div className="row text-center">
      <h2 style={{ marginTop: 50, marginBottom: 20 }}>Severe Weather Search</h2>
      <Form>
        <Container>
          <Row className="form-group">
            <Col sm={{ size: 6, offset: 3 }}>
              <Control.text model=".state" id="state" name="state"
                placeholder="State abbreviation e.g. WA"
                className="form-control"
                onChange={(e) => handleChange(e)}
                validators={{
                  validAbbreviation,
                  minLength: minLength(2),
                  maxLength: maxLength(2.5)
                }}
              />
              <Errors
                className="error-text"
                model=".state"
                show="touched"
                component="div"
                messages={{
                  validAbbreviation: 'Invalid state abbreviation! ',
                  minLength: 'Must be at least two characters!',
                  maxLength: 'Cannot exceed two characters!'
                }}
              />
            </Col>
            <p style={{ marginTop: 15, marginBottom: 10 }}>or</p>
            <Col sm={{ size: 8, offset: 2 }}>
              <Control.text model=".coordinates" id="coordinates"
                name="coordinates"
                placeholder="Latitude/longitude coordinates e.g. 47.8209,-122.3151 no spaces"
                className="form-control"
                onChange={(e) => handleChange(e)}
                validators={{
                  isNumber,
                  maxLength: maxLength(13)
                }}
              />
              <Errors
                className="error-text"
                model=".coordinates"
                show="touched"
                component="div"
                messages={{
                  isNumber: 'US latitude/longitude coordinates only!'
                }}
              />
            </Col>
          </Row>
        </Container>
        <Button type="submit" color="primary" size="lg" style={{ marginTop: 15, marginRight: 5, marginBottom: 50 }} onClick={(e) => fetchData(e)}>Search</Button>
        <Button type="submit" color="danger" size="lg" style={{ marginTop: 15, marginBottom: 50 }} href="/">Clear</Button>
        <div style={{ marginTop: 20 }}>
          {passeddata && (
            <div>
              <DisplayWeather data={passeddata} />
            </div>
          )}
        </div>
        <div>
          { error && <h1>{error}</h1>}
        </div>

      </Form>
    </div>
  );
}

export default WeatherData;