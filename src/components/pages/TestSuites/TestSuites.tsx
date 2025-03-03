import {FC} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from '@pages';

import DashboardRewrite from '@src/DashboardRewrite';

import TestSuiteDetails from './TestSuiteDetails';
import TestSuitesList from './TestSuitesList';

const TestSuites: FC = () => (
  <>
    <Routes>
      {/* Backwards compatibility */}
      <Route path="executions/:id" element={<DashboardRewrite pattern="/tests/:id" keepQuery />} />
      <Route
        path="executions/:id/execution/:execId"
        element={<DashboardRewrite pattern="/tests/:id/executions/:execId" keepQuery />}
      />

      <Route index element={<TestSuitesList />} />
      <Route path=":id">
        <Route index element={<TestSuiteDetails tab="executions" />} />
        <Route path="commands" element={<TestSuiteDetails tab="commands" />} />
        <Route path="executions" element={<TestSuiteDetails tab="executions" />}>
          <Route index element={null} />
          <Route path=":execId" element={null} />
        </Route>
        <Route path="settings" element={<TestSuiteDetails tab="settings" />}>
          <Route index element={null} />
          <Route path=":settingsTab" element={null} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Outlet />
  </>
);

export default TestSuites;
