import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from './../components/layouts/container';
import DocumentTitle from 'react-document-title';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';

class KnowledgeCenter extends Component {
  renderPanels() {
    if (this.props.overview) {
      // TODO: to be replaced once API done
      if (this.props.overview.init && this.props.overview.init.knowledge) {
        const { knowledge }: Object = this.props.overview.init;
        return (
          <Collapse accordion={true}>
            {
              knowledge && knowledge.map((k, i) => {
                return (
                  <Panel key={i} header={k.question}>
                    {
                      k.title &&
                      <div className="rc-collapse-content-title">{ k.title }</div>
                    }
                    <div>
                      {
                        k.video &&
                        <iframe
                          className="mui--pull-right"
                          width="340" height="210" frameBorder="0"
                          src={`${k.video}?html5=1`}>
                        </iframe>
                      }
                      <p>{ k.answer }</p>
                    </div>
                  </Panel>
                )
              })
            }
          </Collapse>
        );
      }
    }
    return <div></div>;
  }

  render() {
    return (
      <DocumentTitle title="Knowledge Center">
        <div>
          <div className="block-header" style={{height: 'initial'}}>
            <h1>Knowledge Center</h1>
            <br />
            <p>
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              Maecenas sed diam eget risus varius blandit sit amet non magna.
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare
              vel eu leo. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
              vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <Container>
            { this.renderPanels() }
          </Container>
        </div>
      </DocumentTitle>
    );
  }
}

function mapStateToProps(state) {
  return {
    overview: state.overview,
  };
}

export default connect(
  mapStateToProps,
  null)(KnowledgeCenter);
