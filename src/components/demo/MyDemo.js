import React, { useState } from 'react';
import AddDemo from './AddDemo';
import ChildDemo from './ChildDemo';


const MyDemo = () => {
   const [job, setJob] = useState([
    {'id' : 'a01', 'titlejob' : 'y ta', 'salary' : '400$'},
    {'id' : 'a02', 'titlejob' : 'bac sy', 'salary' : '800$'}
   ])

   const AddNewJob = (newJob) => {
    setJob( [...job, newJob]);
      console.log(newJob);
      console.log(job);
   }
   const DeleteJob = (delJob) => {
    setJob(job.filter(job => job.id !== delJob.id))
   }
   


    return (
      <>
         <div>
       <AddDemo AddNewJob = {AddNewJob}/>
        <ChildDemo arrJobs = {job} DeleteJob={DeleteJob}/>
        </div> 

      </>
       

    );
};

export default MyDemo;