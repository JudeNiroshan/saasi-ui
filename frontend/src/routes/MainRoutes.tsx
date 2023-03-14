import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Exporter } from "../components/Exporter/Exporter";
import {ParentPage} from "../components/ParentPage";
import {NewExporter} from "../components/Exporter/NewExporter";
import {Login} from "../components/LoginPage/Login";
import {Deployer} from "../components/Deployer/Deployer";
import {Home} from "../components/Home/Home";

const ROUTELIST = createBrowserRouter(
    [
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "",
            element: <ParentPage/>,
            children: [
                {
                    path: "/",
                    element: <Home/>,
                },{
                    path: "/exporter",
                    element: <Exporter/>,
                },{
                    path: "/create-exporter",
                    element: <NewExporter/>,
                },{
                    path: "/deployer",
                    element: <Deployer/>,
                },
            ]
        }
    ]
)

const MainRoutes = () => {
    return (
        <RouterProvider router={ROUTELIST} />
    )
}

export default MainRoutes;