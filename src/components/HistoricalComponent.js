import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderReportItem({report}) {
    return (
        <Card>
            <Link to={`/historical/${report.id}`}>
                <CardImg width="100%" src={baseUrl + report.image} alt={report.name} />
                <CardImgOverlay>
                    <CardTitle>{report.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function Historical(props) {
    
    const historical = props.reports.reports.map(report => {
        return (
            <div key={report.id} className="col-md-5 m-1">
                <RenderReportItem report={report} />
            </div>
        );
    });

    if (props.reports.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    if (props.reports.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>{props.reports.errMess}</h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Reports</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Historical Reports</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                {historical}
            </div>
        </div>
    );
}

export default Historical;