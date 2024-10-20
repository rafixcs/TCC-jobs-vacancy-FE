import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import JobsList from "./pages/jobslist"
import Job from "./pages/job"
import ApplyPage from "./pages/jobapply"
import RegisterPage from "./pages/createaccount"
import CreateJobPage from "./pages/jobcreate"
import CompanyJobList from "./pages/companyjoblist"
import JobApplicationsPage from "./pages/companyjobapplications"
import CompaniesList from "./pages/companies"
import CompanyJobs from "./pages/companyjobs"


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
        {/*Account*/}
        <Route path="/signup" element={<Login />} />
        <Route path="/signin" element={<RegisterPage />} />
        {/*Jobs*/}
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/jobs/:jobId" element={<Job />} />
        <Route path="/jobs/:jobId/apply" element={<ApplyPage />} />
        {/*Company inside*/}
        <Route path="/company/jobs/create" element={<CreateJobPage />} />
        <Route path="/company/jobs/" element={<CompanyJobList />} />
        <Route path="/company/jobs/:jobId/applications" element={<JobApplicationsPage />} />
        {/*Common user search company*/}
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/:companyId" element={<CompanyJobs />} />
      </Routes>
    </Router>
  )
}

export default App
