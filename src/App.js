
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingSpin } from './components/UI/LoadingSpin';
import { PrivateRoute } from "./components/routes/privateRoute";
const HomePage = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const ErrorPage = lazy(() => import('./pages/errorPage'));
const TestPage1 = lazy(() => import("./components/ExpNo1/testPage1"));
const TestPage2 = lazy(() => import("./components/ExpNo2/testPage2"));
const TestPage3 = lazy(() => import("./components/ExpNo3/testPage3"));
const TestPage4 = lazy(() => import("./components/ExpNo4/testPage4"));
const Workspace1 = lazy(() => import("./components/ExpNo1/workspace1"));
const Workspace2 = lazy(() => import("./components/ExpNo2/workspace2"));
const Workspace3 = lazy(() => import("./components/ExpNo3/workspace3"));
const Workspace4 = lazy(() => import("./components/ExpNo4/workspace4"));
const ResultPage1 = lazy(() => import("./components/ExpNo1/resultPage1"));
const ResultPage2 = lazy(() => import("./components/ExpNo2/resultPage2"));
const ResultPage3 = lazy(() => import("./components/ExpNo3/resultPage3"));
const ResultPage4 = lazy(() => import("./components/ExpNo4/resultPage4"));

function App() {
  return (
    <Routes>
      
      {/* ABOUT */}
      <Route
        path=""
        element={
          <Suspense fallback={<LoadingSpin />}>
            <AboutPage />
          </Suspense>
        }
      />

      {/* WORKSPACES */}
      <Route
        path="exp1"
        element={
          <Suspense fallback={<LoadingSpin />}>
            <Workspace1 />
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
        path="exp3"
        element={
          <Suspense fallback={<LoadingSpin />}>
            <Workspace3 />
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

      {/* HOME */}
      <Route element={<PrivateRoute />}>
        <Route
          path="home"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <HomePage />
            </Suspense>
          }
        />

        {/* TEST PAGES */}
        <Route
          path="test1"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <TestPage1 />
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
          path="test3"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <TestPage3 />
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

        {/* Result Pages */}
        <Route
          path="result1"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <ResultPage1 />
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
          path="result3"
          element={
            <Suspense fallback={<LoadingSpin />}>
              <ResultPage3 />
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

      {/* ERROR PAGE */}
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

