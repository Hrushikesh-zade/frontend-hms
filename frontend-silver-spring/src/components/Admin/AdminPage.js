import { useEffect, useState } from "react";
import employeeService from "../../services/employeeService";
import { Link } from "react-router-dom";
import { Alert, Button, Collapse, Modal } from "react-bootstrap";

const AdminPage = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [employee, setEmployee] = useState({});
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchByFirstName, setSearchByFirstName] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");
  const [searchById, setSearchById] = useState("");

  useEffect(() => {
    getEmployees();
  }, []);

  const handleShow = (p) => {
    setEmployee(p);
    setShow(true);
  };
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showAlert]);

  const handleClick = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    // console.log("in handle close" + id);
    setShow(false);
  };

  const clearAllFilters = () => {
    setOpen(false);
    setSearchByEmail("");
    setSearchByFirstName("");
    setSearchById("");
  };

  const handleDelete = () => {
    // console.log("Printing id", id);
    employeeService
      .remove(employee.empId)
      .then((response) => {
        console.log("employee deleted successfully", response.data);
        handleClick(); //alert
        // setPatient({});
        setShow(false);
        getEmployees();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  function getEmployees() {
    employeeService
      .getAll()
      .then((resp) => {
        setEmployeeList(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  return (
    <div>
      <>
        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
            className="fade"
          >
            Patient <span>{employee.firstName}</span>{" "}
            <span>{employee.lastName}</span> deleted succefully
          </Alert>
        )}
      </>

      {/*  */}

      <>
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
            Employee : <span>{employee.firstName}</span>
            <span style={{ margin: "2px" }}>{employee.lastName} </span>
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
      </>

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
              <Link to="/admin/add" className="btn btn-primary">
                Add Employee
              </Link>
              <Link to="/admin/addDoctor" className="btn btn-primary">
                Add Doctor
              </Link>
            </div>
          </div>

          <Collapse in={open}>
            <div id="collapse-filter-menu">
              <div className="text-dark">
                <div className="container-fluid text-center">
                  <div className="row">
                    <div className="col-2">Filter</div>
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

                  <div className="col-lg-3">
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

      {/* /************************************************ */}

      <div className="container-fluid ">
        <table className="table table-secondary table-striped">
          <thead>
            <tr>
              <th scope="col">EMPLOYEE Id</th>
              <th scope="col">FIRST NAME</th>
              <th scope="col">LAST NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ROLE</th>
              <th scope="col">DETAILS</th>
              <th scope="col">EDIT</th>
              <th scope="col">REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {employeeList
              .filter((cf)=>{
                if (
                  (searchByFirstName === "" ||
                    searchByFirstName.trim() === "") &&
                  (searchById === "" || searchById.trim() === "") &&
                  (searchByEmail === "" || searchByEmail.trim() === "")
                ) {
                  return cf;
                }
                 else if (
                    (cf.firstName
                        .toLowerCase()
                        .includes(searchByFirstName.toLowerCase()) ||
                        cf.lastName
                          .toLowerCase()
                          .includes(searchByFirstName.toLowerCase()))
                           &&
                  cf.empId.toString().includes(searchById.toLowerCase())
                   &&
                  cf.email.toLowerCase().includes(searchByEmail.toLowerCase())
                ) {
                  return cf;
                }
                else{
                    return false;
                }
              })

              .map((patient) => (
                <tr key={patient.empId}>
                  <td>{patient.empId}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.email}</td>
                  <td>{patient.role}</td>
                  <td>
                    <Link
                      to={`/admin/info/${patient.empId}`}
                      className="btn btn-info mb-2"
                    >
                      <i className="bi bi-info-circle-fill"></i>
                      Info
                    </Link>
                  </td>

                  <td>
                    <Link
                      className="btn btn-secondary"
                      to={`/admin/edit/${patient.empId}`}
                    >
                      <i className="bi bi-pencil-square"></i>
                      Edit
                    </Link>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => {
                        handleShow(patient);
                      }}
                    >
                      <i className="bi-trash"></i>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
