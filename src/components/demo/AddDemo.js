import { useState } from "react";
import "./demo.scss";
const AddDemo = ({AddNewJob}) => {
    const [job, setJob] = useState({
        'jobTitle': '',
        'salary': ''
    })
    const handleChangeJobTitle = (event) => {
        setJob({
          ...job,
          jobTitle : event.target.value
        })
      }
      const handleChangeSalary = (event) => {
          setJob({
            ...job,
            salary : event.target.value
          })
        }
       const handleSubmit = () => {
        if(job.titlejob === "" || job.salary === ""){
            alert('fill your tilte job and salary');
        }else{
        AddNewJob({id : Math.floor(Math.random() * 1000)+'',titlejob:job.jobTitle , salary : job.salary}); 
        setJob({jobTitle:'', salary:''});
    }
    }
    return (
        <div>
                 <form action="/action_page.php">
  <label htmlFor="fname">Title Job:</label><br/>
  <input type="text" onChange={(event) => handleChangeJobTitle(event)} value={job.jobTitle}/><br/>
  <label htmlFor="lname">Salary:</label><br/>
  <input type="text" onChange={(event) => handleChangeSalary(event)} value={job.salary}/><br/><br/>
  <input type="button" className="btn-submit" onClick={() => handleSubmit()} value="Submit"/>
            </form>     
        </div>
    );
};

export default AddDemo;