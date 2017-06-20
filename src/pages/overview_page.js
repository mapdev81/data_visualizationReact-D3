require('react-datepicker/dist/react-datepicker.css');

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-fontawesome';
import { fetchOverview } from '../actions/overview';
import DocumentTitle from 'react-document-title';
import Logger from '../utils/logger';
import { percent } from '../utils/formatting';
import AppContainer from '../components/layouts/container';
import Modal from '../components/layouts/modal';
import moment from 'moment';

import DatePicker from 'react-datepicker'

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

const propTypes = {
  overview: PropTypes.object,
  fetchOverview: PropTypes.func.isRequired,
};

const Module = () => {
  return (
    <div className="module-block">
      Module
    </div>
  );
};

const S: Object = {
  START: 'START',
  END: 'END',
  PLACEHOLDER: 'SELECTED_DATE',
} ;

const dates: Object = {
  start: moment('2017-02-05'),
  end: moment('2017-02-12'),
};

class OverviewPage extends Component {
  constructor(props) {
    super(props);
    this.logger = new Logger('OverviewPage');
    this.refresh = this.refresh.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateDates = this.updateDates.bind(this);
    this.state = {
      showModal: false,
      selector: null,
      dates,
      exclude: false
    };
  }

  componentWillMount() {
    this.refresh();
  }

  toggleModal = () => {
    const showModal: boolean = this.state.showModal =! this.state.showModal;
    this.setState({ showModal });
  };

  updateDates = e => {
    let { selector, dates } = this.state;
    if (selector) {
      if (selector === S.END) {
        dates.end = e;
      }
      else {
        dates.start = e;
      }
    }

    selector = null;
    this.setState({ dates, selector });
  };

  renderModal() {
    const { dates: { start, end }, exclude } = this.state;
    const startDate: string = start ? start.format('MMMM D, YYYY') : PLACEHOLDER;
    const endDate: string = end ? end.format('MMMM D, YYYY') : PLACEHOLDER;

    if (this.state.showModal) {
      const content = (
        <div className="modal-content modal-datepicker">
          <h1>Date Picker <Icon className="mui--pull-right" name="times" onClick={this.toggleModal} /></h1>
          <Row>
            <Col xs="6">
              <legend>START DATE</legend>
              <Input hint={startDate} onClick={() => this.setState({ selector: S.START})}/>

              <legend>END DATE</legend>
              <Input hint={endDate} onClick={() => this.setState({ selector: S.END})} />

              <div className="datepicker-exclude">
                <div className="mui-checkbox">
                  <label>
                    <input type="checkbox" value="true" onChange={e => this.setState({ exclude: e.currentTarget.checked})} />
                      EXCLUDE ANY DAYS
                  </label>
                </div>

                {
                  exclude &&
                  <div className="datepicker-exclude-extra">
                    <p>
                      Please use the calendar on the right to select which days you would like to exclude.
                      To select a date, simply click on the number and it will become highlighted.
                      To unselect a date, click the date a second time.
                    </p>

                    <label>Days Excluded</label>
                    <p>No days have been selected.</p>
                  </div>
                }
              </div>

            </Col>
            <Col xs="6" className="calendar-block">
              <DatePicker
                inline
                selected={start}
                startDate={start}
                endDate={end}
                onChange={this.updateDates} />
            </Col>
            <div className="modal-footer mui--text-center">
              <Button
                color="primary"
                onClick={this.toggleModal}>Okay</Button>
            </div>
          </Row>
        </div>
      );
      return <Modal toggleAction={this.toggleModal} content={content} />;
    }

    return null;
  }


  refresh() {
    this.props.fetchOverview().catch((reason) => {
      const error = {
        status: reason.action.payload.status,
        statusText: reason.action.payload.statusText,
        serverError: reason.action.payload.data.error,
      };
      this.logger.error(error);
    });
  }

  render() {
    const { dates: { start, end } } = this.state;
    return (
      <DocumentTitle title="Overview">
        <div className="sticky-header-container">
          <div className="block-header sticky-header">
            <ul className="list-unstyled block-header-right">
              <li>
                <button type="button" onClick={this.toggleModal}><Icon name="calendar" /> {start.format('D/M/YY')} | {end.format('D/M/YY')} <Icon name="caret-down" /></button>
              </li>
              <li>
                <button type="button" onClick={this.toggleModal}><Icon name="clock-o" /> 9:00am—5:00pm</button>
              </li>
            </ul>

            <h1 className="page-header">
              Overview
              <small>342 TOTAL SPACES</small>
            </h1>
          </div>
          <AppContainer>
            <Module />
            <Module />
            <Module />
            <Module />
            <Module />
            { this.renderModal() }
          </AppContainer>
        </div>
      </DocumentTitle>
    );
  }
}

OverviewPage.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    overview: state.overview,
  };
}

export default connect(
  mapStateToProps,
  { fetchOverview }
)(OverviewPage);
