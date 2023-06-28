import React, { useState } from 'react';

const ChildDemo = ({arrJobs, DeleteJob}) => {
   
     const handleClickDelete = (job) =>{
console.log(job);
        DeleteJob(job);
    
     }
    return (
        <div>
         <div className='tableShowJob'>
      {arrJobs.map((job) => (
        <div key={job.id}>
        {job.titlejob} - Salary: {job.salary} <span onClick={()=>handleClickDelete(job)}>X</span>
        </div>
      ))}
    </div>
        </div>
    );
};

export default ChildDemo;