import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import JobsList from "./pages/jobslist"
import Job from "./pages/job"
import ApplyPage from "./pages/jobapply"


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
        <Route path="/jobslist" element={<JobsList />} />
        <Route path="/jobs/:jobId" element={<Job />} />
        <Route path="/jobs/:jobId/apply" element={<ApplyPage />} />
      </Routes>
    </Router>
  )
}

export default App
