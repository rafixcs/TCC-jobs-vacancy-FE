import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import JobsList from "./pages/jobslist"
import JobDetails from "./pages/job"
import ApplyPage from "./pages/jobapply"
import RegisterPage from "./pages/createaccount"
import CreateJobPage from "./pages/jobcreate"
import CompanyJobListPage from "./pages/companyjoblist"
import JobApplicationsPage from "./pages/companyjobapplications"
import CompaniesList from "./pages/companies"
import CompanyJobs from "./pages/companyjobs"
import { ProtectedRoute } from "./routing/protectroute"
import UserDashboardPage from "./pages/userdashboard"
import AccountSettings from "./pages/accountsettings"
import AboutPage from "./pages/about"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        {/*Account*/}
        <Route path="/signup" element={<Login />} />
        <Route path="/signin" element={<RegisterPage />} />
        {/*Jobs*/}
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/jobs/:jobId/apply" element={<ApplyPage />} />
        {/*Common user search company*/}
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/:companyId" element={<CompanyJobs />} />
        
        {/**Protected routes */}
        <Route element={<ProtectedRoute />}>
          {/*Company inside*/}
          <Route path="/company/jobs/create" element={<CreateJobPage />} />
          <Route path="/company/jobs/" element={<CompanyJobListPage />} />
          <Route path="/company/jobs/:jobId/applications" element={<JobApplicationsPage />} />

          {/**Dashboards*/}
          <Route path="/user/dashboard" element={<UserDashboardPage />} />
          <Route path="/user/account-settings" element={<AccountSettings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
