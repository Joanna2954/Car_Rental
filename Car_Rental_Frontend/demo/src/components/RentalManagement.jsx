import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { Button} from "react-bootstrap";
import Swal from 'sweetalert2';

const RentalManagement = () => {


    const [user, setUser] = useState([]);

  const getUser = () => {
    axios.get("http://127.0.0.1:8000/myapp/rentals/")
      .then(res => {
        console.log(res.data);
        setUser(res.data.rentals); 
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  let navigate=useNavigate()

   const col = [


    {
    name: 'make',
    selector: row => row.car.make,
    sortable: true
  },


  {
    name: 'user_name',
    selector: row => row.user_name,
    sortable: true      
   
  },
 

   {
    name: 'start_date',
    selector: row => row.start_date,
    sortable: true
  },
 {
    name: "end_date",
    selector: row => row.end_date,
    sortable: true
  },
   {
    name: 'rental_date',
    selector: row => row.rental_date,
    sortable: true
  },
  {
      name:"Return",
      selector:row=><Button variant='danger' onClick={()=>handlechange(row.id)}>Return</Button>
    },
  

]


function handlechange(rental_id){
    axios.delete(`http://127.0.0.1:8000/myapp/cancel/${rental_id}/`) 
    .then(res => {
        console.log(res.data);
        getUser(); 
         
        Swal.fire({
  title: "Car Returned Successfully",
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  hideClass: {
    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
  }
});
      })
    }

  
 

  return (
    <div>
<DataTable 

columns={col}
data={user}
highlightOnHover
pagination

paginationRowsPerPageOptions={[20]}


className="colorful-table"
/>
<Button variant="warning" onClick={()=>navigate('/cars')}>Back to Car Management</Button>

    </div>
  )
}

export default RentalManagement