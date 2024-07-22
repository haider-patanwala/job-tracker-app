import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Registration"
import Jobs from "./pages/Jobs"
import Dashboard from "./pages/Dashboard"
import AddJob from "./pages/AddJob"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="jobs"
            element={<Jobs />}
          />
          <Route
            path="add-job"
            element={<AddJob />}
          />
          <Route
            path="dashboard"
            element={<Dashboard />}
          />
          <Route
            path="register"
            element={<Register />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
