import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-fontawesome';
import { logout } from '../../actions/auth';
import { Link, IndexLink } from 'react-router';

const propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  renderHierarchy(buildings) {
    if (buildings) {
      return (
        <ul className="mui-list--unstyled side-nav">
          {
            buildings.map((b, i) => {
              return (
                <li key={i}>
                  <div>
                    <Link to={`/building/${b.id}`} activeClassName="current-item">BUILDING { b.id }</Link>
                    <ul className="mui-list--unstyled side-nav sub-nav">
                      { b.floors.map((f, ii) => <li key={ii}><Link to={`/building/${b.id}/floor/${f.id}`} activeClassName="current-item">Floor { f.id }</Link></li>) }
                    </ul>
                  </div>
                </li>
              );
            })
          }
        </ul>
      );
    }

    return null;
  }

  render() {
    const { buildings } = this.props;
    const progress = 90;
    const progressBar = {
      width: `${progress}%`
    };

    return (
      <nav id="sidedrawer" className="left-nav mui--no-user-select">
        <div className="inner-nav">
          <div className="study-progress">
            <p>Study Progress - { progress }%</p>
            <div className="study-progress-bar">
              <div style={progressBar}></div>
              <div></div>
            </div>
          </div>
          <ul className="mui-list--unstyled side-nav">
            <li>
              <IndexLink to="/" activeClassName="current-item">OVERVIEW</IndexLink>
            </li>
            <li>
              <Link to="metrics" activeClassName="current-item">METRICS</Link>
            </li>
            <li>
              <Link to="insights" activeClassName="current-item">INSIGHTS</Link>
            </li>
          </ul>

          <div className="map-list">
            <hr />
            <p>Location</p>
            { buildings && this.renderHierarchy(buildings) }
          </div>

          <div className="nav-bottom">
            <ul className="mui-list--unstyled side-nav bottom-nav">
              <li>
                <Link to="/knowledge-center" activeClassName="current-item">KNOWLEDGE CENTER</Link>
              </li>
              <li>
                <Link to="feedback" activeClassName="current-item">FEEDBACK</Link>
              </li>
            </ul>
            <p>Last Updated: 3.1.17</p>
          </div>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    user: state.auth.info,
    buildings: state.overview.buildings
  };
}

export default connect(mapStateToProps, { logout })(Navigation);
