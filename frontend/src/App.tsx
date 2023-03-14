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
import {NewExporter} from "./components/Exporter/NewExporter";
import {Exporter} from "./components/Exporter/Exporter";
import MainRoutes from "./routes/MainRoutes";

// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/",
//     element: <ParentPage children={null} />,
//   }
// ]);

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <MainRoutes/>
        {/*<RouterProvider router={router} />*/}
      </UserContextProvider>
    </div>
  );
}

export default App;
