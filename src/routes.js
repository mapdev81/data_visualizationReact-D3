import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PageContainer from './pages';
import OverviewPage from './pages/overview_page';
import KnowledgeCenter from './pages/knowledge_center_page';
import PageNotFound from './pages/not_found_page';

import BuildingContainer from './pages/building/container';
import BuildingPage from './pages/building/page';

export default (
  <Route path="/" component={PageContainer}>
    <IndexRoute component={OverviewPage} />
    <Route path="/building" component={BuildingContainer}>
      <IndexRoute component={BuildingPage} />
      <Route path="/building/:bId" component={BuildingPage} />
      <Route path="/building/:bId/floor/:fId" component={BuildingPage} />
    </Route>
    <Route path="/knowledge-center" component={KnowledgeCenter} />
    <Route path="*" component={PageNotFound} />
  </Route>
);
