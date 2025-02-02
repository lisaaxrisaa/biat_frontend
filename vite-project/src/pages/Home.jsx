import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();

    const [data, setData] = useState("");

    //for test
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkZDc2N2JhLWNlY2MtNDZjZi1hZWY1LTM0NDllNTJjOWUyNiIsImlhdCI6MTczODUxMDQ5MSwiZXhwIjoxNzM4NTk2ODkxfQ.NEtUzSFkaTdob7Tq7UM-H3LLoCG2-w8pnrbHeKs65Q4"; 
    const token = sessionStorage.getItem('token');

    const fetchUsers = async () => {

      try {
        const {data} = await axios.get(
          'https://biat-backend.onrender.com/allUsers',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setData(data);

      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      if(!token){
        navigate(`/login`);
      }else{
        fetchUsers();
      }
    }, [token, navigate]);

    return (
      <>
{!data ? <h1>something wrong</h1>: 

<div className = "table_width">
<table className="table table-hover">
    <thead>
    <tr>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Email</th>
    </tr>
    </thead>
    <tbody className="table-group-divider">
    {data ? (
        data.map((p) => (
        <tr key={p.email}>
            <td><h5>{p.first_name}</h5></td>
            <td><h5>{p.last_name}</h5></td>
            <td><h6>{p.email}</h6></td>
        </tr>
            ))
            ) : (
            <tr><td colSpan="3">There is no result.</td></tr>
        )}
    </tbody>
</table>
</div>  

}
      </>
    );
};

export default Home;
