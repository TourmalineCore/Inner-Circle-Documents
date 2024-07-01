import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { useMemo } from 'react';
import { withPrivateRoute } from './common/withPrivateRoute';
import Template from './template/Template';
import AccessBasedOnPemissionsState from './routes/state/AccessBasedOnPemissionsState';
import AccessBasedOnPemissionsStateContext from './routes/state/AccessBasedOnPemissionsStateContext';
import { DocumentsState } from './features/documents/sections/state/DocumentsState';
import { DocumentsStateContext } from './features/documents/sections/state/DocumentsStateContext';

const WithPrivateRoute = withPrivateRoute(Template);

export default function App() {
  const routesState = useMemo(
    () => new AccessBasedOnPemissionsState(),
    [],
  );

  const documentsState = useMemo(
    () => new DocumentsState(),
    [],
  );

  return (
    <AccessBasedOnPemissionsStateContext.Provider value={routesState}>
      <DocumentsStateContext.Provider value={documentsState}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/documents/*"
              element={<WithPrivateRoute />}
            />
          </Routes>
        </BrowserRouter>
      </DocumentsStateContext.Provider>
    </AccessBasedOnPemissionsStateContext.Provider>
  );
}
