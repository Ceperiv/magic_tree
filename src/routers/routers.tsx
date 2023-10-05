import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "../layouts";
import {Error404, Main} from "../components";

function Routers() {
    return (

        <div>
            <Routes>
                <Route index element={<Navigate to="/main" replace/>}/>
                <Route path={''} element={<MainLayout/>}>
                    <Route path={'/main'} element={<Main level={0} parentId={1}/>}/>
                </Route>
                <Route path={'*'} element={<Navigate to="/error404" replace/>}/>
                <Route path={'error404'} element={<Error404/>}/>
            </Routes>
        </div>
    );
}

export {Routers};
