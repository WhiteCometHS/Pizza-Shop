import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [nazwa, setNazwa] = useState("");
  const [opis, setOpis] = useState("");
  const [pizzaList, setPizzaList]=useState([]);

  const [newNazwa, setNewNazwa]=useState("");
  const [newOpis, setNewOpis]=useState("");

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setPizzaList(response.data)
    });
  },[]);

  const submitOpis= ()=>{


    Axios.post("http://localhost:3001/api/insert",
    {nazwa: nazwa, opis:opis,});

    setPizzaList([...pizzaList, {nazwa: nazwa, opis: opis}]);
  };

  const deletePizza=(id)=>{
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
  };

  const updatePizza=(id)=>{
    Axios.put(`http://localhost:3001/api/update/${id}`,
    {nazwa: newNazwa, opis: newOpis});
    setNewNazwa("");
    setNewOpis("");
  };

  return ( 
    <div className="App">
      <h1>CRUD Application</h1>

      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="nazwa" onChange={(e)=> {
          setNazwa(e.target.value)
        }}/>
        <label>Review:</label>
        <input type="text" name="opis" onChange={(e)=> {
          setOpis(e.target.value)
        }}/>
        <button onClick={submitOpis}>Submit</button>

        {pizzaList.map((val)=>{
          return (
          <div className="card">
            <h1>{val.nazwa}</h1>
            <p>{val.opis}</p>

            <button onClick={()=> {deletePizza(val.id)}}>Delete</button>
            <input type="text" id="updateInput" onChange={(e)=>
            setNewNazwa(e.target.value)}
            />
            <input type="text" id="updateInput" onChange={(e)=>
            setNewOpis(e.target.value)}
            />
            <button onClick={()=> {updatePizza(val.id)}}>Update</button>
          </div>);
        })}
      </div>
    </div>
  );
}

export default App;
