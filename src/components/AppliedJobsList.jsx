// AppliedJobsList.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import './AppliedJobsList.css';

const AppliedJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem('auth')).user.email;
        const res = await axios.get('http://localhost:8080/api/user/applied-jobs', {
          params: { email: userEmail }
        });
        setJobs(res.data);
      } catch (error) {
        console.error('Error fetching applied jobs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, []);

  return (
    <section className="applied-jobs-section">
      <div className="container">
        <h2 className="section-title">Jobs You've Applied For</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company Name</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.jobTitle}</td>
                    <td>{job.companyName}</td>
                    <td>{job.jobSalary}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No jobs applied yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AppliedJobsList;
