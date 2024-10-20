import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import JobsList from "./pages/jobslist"
import Job from "./pages/job"
import ApplyPage from "./pages/jobapply"
import RegisterPage from "./pages/createaccount"


const job = {
  id: 1,
  title: 'Senior Frontend Developer',
  company: 'TechCorp Inc.',
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/jobs/:jobId" element={<Job />} />
        <Route path="/jobs/:jobId/apply" element={<ApplyPage />} />
        <Route path="/signin" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
