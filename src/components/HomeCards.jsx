import { Link } from "react-router-dom"
import './HomeCard.css'
const HomeCards = () => {
    return (
        <div className="container">
      <div className="box">
        <h2 className="candidates">For Candidates</h2>
        <span>Find jobs</span>
        <Link to={'/jobs'} className="btn">Find job</Link>
      </div>
      <div className="box1">
        <h2 className="candidates">For Companies</h2>
        <span>Add job</span>
        <Link to={'/add-job'} className="btn">Add job</Link>
      </div>
    </div>
    )
}

export default HomeCards