import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [carData, setCarData] = useState({
    make: "",
    model: "",
    year: "",
    daily_rate: "",
    available: true,
  });

  const [rentalData, setRentalData] = useState({
    user_name: "",
    start_date: "",
    end_date: "",
  });

  let navigate = useNavigate();

  
  const getCars = () => {
    axios
      .get("http://127.0.0.1:8000/myapp/cars/")
      .then((res) => setCars(res.data.cars))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCars();
  }, []);

 
  const handleSaveCar = (e) => {
    e.preventDefault();

    if (!carData.make || !carData.model || !carData.year || !carData.daily_rate) {
      Swal.fire("Validation Error", "All fields are required", "warning");
      return;
    }

    const url = isEdit
      ? `http://127.0.0.1:8000/myapp/cars/${selectedCar.id}/`
      : "http://127.0.0.1:8000/myapp/cars/";

    const method = isEdit ? axios.put : axios.post;

    method(url, carData)
      .then(() => {
        Swal.fire("Success", isEdit ? "Car updated successfully!" : "Car added!", "success");
        setShowAddEditModal(false);
        setCarData({ make: "", model: "", year: "", daily_rate: "", available: true });
        getCars();
      })
      .catch(() => Swal.fire("Error", "Operation failed", "error"));
  };

 
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This car will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/myapp/cars/${id}/`)
          .then(() => {
            Swal.fire("Deleted!", "Car deleted successfully!", "success");
            getCars();
          })
          .catch(() => Swal.fire("Error", "Failed to delete car", "error"));
      }
    });
  };

 
  const handleRent = (e) => {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/myapp/cars/${selectedCar.id}/rent/`, rentalData)
      .then(() => {
        Swal.fire("Success", "Car rented successfully!", "success");
        setShowRentModal(false);
        setRentalData({ user_name: "", start_date: "", end_date: "" });
        getCars();
      })
      .catch(() => Swal.fire("Error", "Failed to rent car", "error"));
  };


  
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Make", selector: (row) => row.make, sortable: true },
    { name: "Model", selector: (row) => row.model, sortable: true },
    { name: "Year", selector: (row) => row.year, sortable: true },
    { name: "Rate", selector: (row) => `₹${row.daily_rate}`, sortable: true },
    {
      name: "Available",
      selector: (row) => (row.available ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button size="sm" variant="info" onClick={() => {setIsEdit(true);setSelectedCar(row); setCarData({
                make: row.make,
                model: row.model,
                year: row.year,
                daily_rate: row.daily_rate,
                available: row.available,
              });
              setShowAddEditModal(true);
            }}
          >
            Edit
          </Button>{" "}
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>{" "}
          <Button
            size="sm"
            variant="success"
            disabled={!row.available}
            onClick={() => {
              setSelectedCar(row);
              setShowRentModal(true);
            }}
          >
            Rent
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Car Management System</h2>
      <DataTable columns={columns} data={cars} pagination highlightOnHover />

      <div className="mt-3">
        <Button
          variant="primary"
          onClick={() => {
            setIsEdit(false);
            setCarData({ make: "", model: "", year: "", daily_rate: "", available: true });
            setShowAddEditModal(true);
          }}
        >
          Add New Car
        </Button>{" "}
        <Button variant="warning" onClick={() => navigate ('/rental')}>
          Return  Car deatils
         </Button>
      </div>
      
      <Modal show={showAddEditModal} onHide={() => setShowAddEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Car" : "Add Car"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveCar}>
            <Form.Group className="mb-2">
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                value={carData.make}
                onChange={(e) => setCarData({ ...carData, make: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                value={carData.model}
                onChange={(e) => setCarData({ ...carData, model: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                value={carData.year}
                onChange={(e) => setCarData({ ...carData, year: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Daily Rate</Form.Label>
              <Form.Control
                type="number"
                value={carData.daily_rate}
                onChange={(e) =>
                  setCarData({ ...carData, daily_rate: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check
                type="checkbox"
                label="Available"
                checked={carData.available}
                onChange={(e) =>
                  setCarData({ ...carData, available: e.target.checked })
                }
              />
            </Form.Group>
            <Button type="submit" variant="success">
              {isEdit ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

     
      <Modal show={showRentModal} onHide={() => setShowRentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Rent Car: {selectedCar?.make} {selectedCar?.model}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRent}>
            <Form.Group className="mb-2">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={rentalData.user_name}
                onChange={(e) =>
                  setRentalData({ ...rentalData, user_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                required
                value={rentalData.start_date}
                onChange={(e) =>
                  setRentalData({ ...rentalData, start_date: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                required
                value={rentalData.end_date}
                onChange={(e) =>
                  setRentalData({ ...rentalData, end_date: e.target.value })
                }
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Confirm Rent
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    
    </div>
  );
};

export default CarManagement; 
