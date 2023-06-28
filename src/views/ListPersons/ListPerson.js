import axios from "axios";
import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/navigationbar/NavigationBar";
import PersonService from "../../services/PersonService";
import { connect, useSelector } from "react-redux";

const ListPerson = () => {
    const myState = useSelector(state => state.users);
    console.log(myState);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [guy, setGuy] = useState({
    name: "thanh nguyen",
    age: "21",
  });
  const [person, setPerson] = useState();
  // PersonService.getPerson().then((res)=>{
  //     console.log(res.data)
  //     setPerson(res.data)});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/test");
        setPerson(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleOnChangeName = (event) => {
    setGuy({ name: event.target.value });
  };
  const handleClickShow = () => {
    setShow(!show);
  };
  const handleChangeCount = (sign) => {
    if (sign === "+") {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  };

  

  return (
    <div>
      <NavigationBar />
      {show === false ? (
        <div>
          <button onClick={() => handleClickShow()}>show</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleClickShow()}>hide</button>
          <div className="personList">
            <h2 className="text-center">Person List</h2>
            <div className="row">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>age</th>
                    <th>university</th>
                  </tr>
                </thead>
                <tbody>
                  {person.map((person) => (
                    <tr key={person.id}>
                      <td>{person.id}</td>
                      <td>{person.name}</td>
                      <td>{person.age}</td>
                      <td>{person.university}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <div className="demo02">
        <div>{count}</div>
        <button onClick={() => handleChangeCount("+")}>+1</button>
        <button onClick={() => handleChangeCount("-")}>-1</button>
        <div>{guy.name}</div>
        <input
          value={guy.name}
          onChange={(event) => handleOnChangeName(event)}
        ></input>
      </div>
      {/* ---------------------------------------- */}

      <div className="demoRedux"></div>
    </div>
  );
};



export default ListPerson;
