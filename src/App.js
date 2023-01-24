
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/routes/privateRoute";

import { LoadingSpin } from './components/UI/LoadingSpin';
const QuizPage = lazy(() => import('./pages/QuizPage'));
const ErrorPage = lazy(() => import('./pages/errorPage'));
const HomePage = lazy(() => import("./pages/Home"));
const Workspace1 = lazy(() => import("./components/ExpNo1/workspace1"));

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

      <Route
        path="/ex1"
        element={
          <Suspense fallback={<LoadingSpin />}>
            <Workspace1 />
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
          path="/quiz"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <QuizPage />
            </Suspense>
          }
        />

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

