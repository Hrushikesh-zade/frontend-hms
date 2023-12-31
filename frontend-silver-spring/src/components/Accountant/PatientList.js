import React, { useEffect, useState } from "react";
import { Alert, Button, Collapse, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import patientService from "../../services/patient.service";
import ProfileHeader from "../Receptionist/ProfileHeader";
import "bootstrap-icons/font/bootstrap-icons.css";
// import logo from "../images/logo.png"
import  '../../css/PatientcssHomePage.css';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});
  // const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [searchByFirstName, setSearchByFirstName] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");
  const [searchById, setSearchById] = useState("");

  /**
   * start of alert
   */

  const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setShowAlert(false);
//     }, 3000);

//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [showAlert]);

//   const handleClick = () => {
//     setShowAlert(true);
//   };

  /**
   * end of alert
   */

//   const handleClose = () => {
//     // console.log("in handle close" + id);
//     setShow(false);
//   };

//   const handleShow = (p) => {
//     setPatient(p);
//     setShow(true);
//   };

  const clearAllFilters = () => {
    setOpen(false);
    setSearchByEmail("");
    setSearchByFirstName("");
    setSearchById("");
  };

  const init = () => {
    patientService
      .getAll()
      .then((response) => {
        console.log("Printing patient data", response.data);
        setPatients(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

//   const handleDelete = () => {
//     // console.log("Printing id", id);
//     patientService
//       .remove(patient.patientId)
//       .then((response) => {
//         console.log("employee deleted successfully", response.data);
//         handleClick(); //alert
//         // setPatient({});
//         setShow(false);
//         init();
//       })
//       .catch((error) => {
//         console.log("Something went wrong", error);
//       });
//   };



  const giveColorTOStatus=(status)=>{
    
    if(status === "PAID"){
      
      return <span className="badge rounded-pill text-bg-success">PAID</span>
    }
     if(status === "NOTPAID"){
      
      return <span className="badge rounded-pill text-bg-danger">NOT PAID</span>
    }else{
      return <span className="badge rounded-pill text-bg-dark"> NOT APPLICABLE </span>
    }
  }

  return (
    <div className="p-3 mb-2 bg-secondary">
      <div className="container-fluid">

      <ProfileHeader></ProfileHeader>
      
      </div>
      {/* <>
        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
            className="fade"
          >
            Patient <span>{patient.firstName}</span>{" "}
            <span>{patient.lastName}</span> deleted succefully
          </Alert>
        )}
      </> */}

      {/*  */}

      {/* <>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "red", color: "white" }}
          >
            <Modal.Title
              id="example-custom-modal-styling-title"
              style={{ backgroundColor: "red" }}
            >
              Are you Sure?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "white" }}>
            patient : <span>{patient.firstName}</span>
            <span style={{ margin: "2px" }}>{patient.lastName} </span>
            will be deleted permanently
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "white" }}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </> */}

      {/*  */}

      {/* <div>
        <Link to="/addPatient" className="btn btn-primary mb-2">
          Add Patient
        </Link>
      </div> */}

      {/*  */}

      {/* start of  filter bar */}

      {/* 2 container */}

      <div className="container-fluid ">
        <div className="p-3 mb-2 bg-light text-white">
          <div
            className="container-fluid text-center"
             style={{ border: "2px solid red" }}
          >
            
              {/* <div id="filterdiv" */}
              <div
                className="d-grid gap-2 d-md-flex justify-content-md-end"
                // style={{ border: "2px solid red" }}
              >
                <button
                  className="btn btn-primary me-md-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  onClick={() => setOpen(!open)}
                  aria-controls="collapse-filter-menu"
                  aria-expanded={open}
                  // style={{ border: "2px solid black" }}
                >
                  <i className="bi bi-funnel"></i>
                  Filter it
                </button>
                {/* <Link to="/addPatient" className="btn btn-primary">
                  Add Patient
                </Link> */}
              </div>
            
          </div>

          <Collapse in={open}>
            <div id="collapse-filter-menu">
              <div className="text-dark">
                <div className="container-fluid text-center">
                  <div className="row">
                    <div
                      className="col-2"
                      
                    >
                      Filter
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-lg-3">
                    <div className="row">
                      <div className="col-lg-12">Id</div>
                      <div className="col-lg-12">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search ny id"
                          aria-label="Search"
                          value={searchById}
                          onChange={(e) => setSearchById(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="row">
                      <div className="col-lg-12">NAME</div>
                      <div className="col-lg-12">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="search by name"
                          aria-label="Search"
                          value={searchByFirstName}
                          onChange={(e) => setSearchByFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="row">
                      <div className="col-lg-12">Email</div>
                      <div className="col-lg-12">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search by email"
                          aria-label="Search"
                          value={searchByEmail}
                          onChange={(e) => setSearchByEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3" >
                    <button
                    // style={{marginTop:"10px"}}
                      type="button"
                      className="btn btn-primary mt-4"
                      onClick={() => {
                        clearAllFilters();
                      }}
                    >
                      clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>

      {/* end of filter bar */}

      {/* start of tables */}

      <div className="container-fluid ">
        <table className="table table-secondary table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">FIRST NAME</th>
              <th scope="col">LAST NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">STATUS</th>
              <th scope="col">INVOICE</th>
              {/* <th scope="col">REMOVE</th> */}
            </tr>
          </thead>
          <tbody>
            {patients
              .filter((cf) => {
                if (
                  (searchByFirstName === "" ||
                    searchByFirstName.trim() === "") &&
                  (searchById === "" || searchById.trim() === "") &&
                  (searchByEmail === "" || searchByEmail.trim() === "")
                ) {
                  return cf;
                } else if (
                  (cf.firstName
                    .toLowerCase()
                    .includes(searchByFirstName.toLowerCase()) ||

                    cf.lastName
                    .toLowerCase()
                    .includes(searchByFirstName.toLowerCase())) &&

                  cf.patientId.toString().includes(searchById.toLowerCase())
                   && cf.email.toLowerCase().includes(searchByEmail.toLowerCase())
                ) {
                  return cf;
                }else{
                  return false;
                }
              })

            .map((patient) => (
                <tr key={patient.patientId}>
                  <td>{patient.patientId}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.email}</td>

                  {/* <td>{patient.payStatus}</td> */}
                  <td>{giveColorTOStatus(patient.paymentStatus)}</td>
                  {/* <td><span class="badge rounded-pill text-bg-success">{patient.payStatus}</span></td> */}

                  <td>
                    <Link
                      to={`/accountant/invoice/${patient.patientId}`}
                      className="btn btn-info mb-2"
                    >
                      <i className="bi bi-info-circle-fill"></i>
                      Invoice
                    </Link>
                  </td>

                  

                  {/* <td>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => {
                        handleShow(patient);
                      }}
                    >
                      <i className="bi-trash"></i>
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;