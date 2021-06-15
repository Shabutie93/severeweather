import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent'
import Home from './HomeComponent';
import Historical from './HistoricalComponent';
import ReportInfo from './ReportInfoComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postFeedback, fetchReports } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
    return {
        reports: state.reports
    };
};

const mapDispatchToProps = {
    postFeedback: feedback => (postFeedback(feedback)),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchReports: () => (fetchReports())
};



class Main extends Component {

    componentDidMount() {
        this.props.fetchReports();
    }

    render() {
        const HomePage = () => {
            return (
                <Home />
            );
        };
        
        const ReportWithId = ({match}) => {
            return (
                <ReportInfo
                    report={this.props.reports.reports.filter(report => report.id === +match.params.reportId)[0]}
                    isLoading={this.props.reports.isLoading}
                    errMess={this.props.reports.errMess}
                />
            );
        };

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/historical' render={() => <Historical reports={this.props.reports} />} />
                            <Route path='/historical/:reportId' component={ReportWithId} />
                            <Route exact path='/about' render={() => <About />} />
                            <Route exact path='/contact' render={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} /> } />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));