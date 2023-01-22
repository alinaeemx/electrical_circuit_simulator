
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/routes/privateRoute";

import { LoadingSpin } from './components/UI/LoadingSpin';
const ErrorPage = lazy(() => import('./pages/errorPage'));
const HomePage = lazy(() => import("./pages/Home"));
const Workspace  = lazy(() => import("./pages/Workspace"));
const Workspace1  = lazy(() => import("./components/ExpNo1/workspace1"));

function App() {
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <Suspense fallback={<LoadingSpin />}>
            {/* <AuthenticationPage /> */}
          </Suspense>
        }
      />

      <Route element={<PrivateRoute />}>
        <Route
          path=""
          element={
            <Suspense fallback={<LoadingSpin />}>
              <HomePage />
            </Suspense>
          }
        />

        <Route
          path="/ex1"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <Workspace1 />
            </Suspense>
          }
        />
        {/* <Route
          path="/ex2"
          element={
            <Suspense fallback={<LoadingSpin />}> 
              <Workspace SideBar={Sidebar2} />
            </Suspense>
          }
        /> */}

      </Route>

      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingSpin />}>
            <ErrorPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;

