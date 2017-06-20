import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';

const propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

class PageContainer extends Component {
  render() {
    return (
      <DocumentTitle title="building-container">
        {this.props.children}
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
  null
)(PageContainer);
