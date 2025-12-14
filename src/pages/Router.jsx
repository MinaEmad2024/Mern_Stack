import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Home"
import AddNewBlog from "./AddNewBlog";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Root/>,
        children:[
            {
                index:true,
                element:<Home />
            },
            {
                path:'/addBlog',
                element: <AddNewBlog />
            }
        ]
    }
]);

export default router 


