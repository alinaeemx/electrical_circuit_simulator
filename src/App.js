
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/routes/privateRoute";
import { LoadingSpin } from './components/UI/LoadingSpin';
const ErrorPage = lazy(() => import('./pages/errorPage'));
const HomePage = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const Workspace2 = lazy(() => import("./components/ExpNo2/workspace2"));
const TestPage2 = lazy(() => import("./components/ExpNo2/testPage2"));
const ResultPage2 = lazy(() => import("./components/ExpNo2/resultPage2"));
const Workspace4 = lazy(() => import("./components/ExpNo4/workspace4"));
const TestPage4 = lazy(() => import("./components/ExpNo4/testPage4"));
const ResultPage4 = lazy(() => import("./components/ExpNo4/resultPage4"));
function App() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <Suspense fallback={<LoadingSpin />}>
            <AboutPage />
          </Suspense>
        }
      />
      <Route
        path="exp2"
        element={
          <Suspense fallback={<LoadingSpin />}>
            <Workspace2 />
          </Suspense>
        }
      />
      <Route
        path="exp4"
        element={
          <Suspense fallback={<LoadingSpin />}>
            <Workspace4 />
          </Suspense>
        }
      />
      <Route element={<PrivateRoute />}>
        <Route
          path="home"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="test2"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <TestPage2 />
            </Suspense>
          }
        />

        <Route
          path="result2"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <ResultPage2 />
            </Suspense>
          }
        />

        <Route
          path="test4"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <TestPage4 />
            </Suspense>
          }
        />

        <Route
          path="result4"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <ResultPage4 />
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

