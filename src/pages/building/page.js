import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Link, IndexLink } from 'react-router';

class BuildingPage extends Component {
  renderTitle() {
    const { routeParams } = this.props;
    if (routeParams.bId) {
      if (routeParams.fId) {
        return (
          <h1>
            <Link to={`/building/${routeParams.bId}`} style={{ marginRight: '20px' }}>&lt;</Link>
            floor { routeParams.fId }
            <small>(building { routeParams.bId })</small>
          </h1>
        )
      }
      return <h1>Building { routeParams.bId }</h1>
    }
    return <h1>Building Page Overview</h1>;
  }

  renderFloors() {
    const { routeParams, buildings } = this.props;
    if (buildings && routeParams.bId && !routeParams.fId) {
      let building = null;
      for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].id == Number(routeParams.bId)) {
          building = buildings[i];
        }
      }
      return (
        <ul className="mui-list--unstyled">
          { building && building.floors.map((f, i) => <li key={i}><section><Link to={`/building/${routeParams.bId}/floor/${f.id}`}>Floor {f.id}</Link></section></li>) }
        </ul>
      )
    }
    else if (buildings && routeParams.fId) {
      return <section>FLOOR SECTION</section>
    }
    return null;
  }


  render() {
    return (
      <DocumentTitle title="Company">
        <div>
          <div className="block-header">
            { this.renderTitle() }
          </div>
          { this.renderFloors() }
        </div>
      </DocumentTitle>
    );
  }
}

export default BuildingPage;
