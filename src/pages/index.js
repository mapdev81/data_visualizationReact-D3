import React, { Component, PropTypes, cloneElement } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import LoginPage from './login_page';
import { login } from '../actions/auth';
import { fetchOverview, initApp } from './../actions/overview';
import Header from '../components/layouts/header';
import Navigation from '../components/layouts/navigation';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

const propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

class PageContainer extends Component {
  constructor() {
    super();
    this.state = { fixHeader: true };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    this.props.fetchOverview();
    this.props.initApp();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = event => {
    let scrollTop: Object = event.srcElement.body.scrollTop,
        transform: number = Math.min(0, scrollTop/3 - 60);

    if (scrollTop <= 110) {
      this.setState({ fixHeader: true });
    }
    else {
      this.setState({ fixHeader: false });
    }

    this.setState({ transform });
  };

  renderChildren() {
    const { fixHeader } = this.state;
    const user = {
      name: 'Tim',
      company: 'Company Name',
      isLoggedIn: true
    };

    if (this.props.isLoggedIn) {
      return (
        <div>
          { fixHeader && <Header user={user} /> }
          <div className={fixHeader ? 'main' : 'main fixed-header'}>
            <Navigation />
            <div id="content-wrapper">
              <Container fluid={true} className="view-container">
                { this.props.children }
              </Container>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Header user={user} />
        <Container fluid={true} className="main">
          <LoginPage onSubmit={login} />
        </Container>
      </div>
    );
  }

  render() {
    return (
      <DocumentTitle title="Prelude">
        {this.renderChildren()}
      </DocumentTitle>
    );
  }
}

PageContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
}

export default connect(
  mapStateToProps,
  { login, fetchOverview, initApp }
)(PageContainer);
