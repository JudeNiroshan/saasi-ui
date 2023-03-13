import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '@patternfly/patternfly/patternfly.css'
import '@patternfly/patternfly/patternfly-addons.css'
import {Login} from './components/LoginPage/Login';
import {ParentPage} from './components/ParentPage';
import { UserContextProvider } from './hooks/useUser';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ParentPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </div>
  );
}

export default App;
