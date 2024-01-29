import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";


export default function CustomerTable() {
    const [search, setSearch] = useState('')
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState(customers);

    const itemPerPage = 5;
    const numberOfPages = Math.ceil(customers.length / itemPerPage);
    const pageIndex = Array.from({ length: numberOfPages }, (_, idx) => idx + 1);


    useEffect(() => {
        fetch("http://127.0.0.1:8000/customer")
            .then(response => response.json())
            .then(data => {
                setCustomers(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (customerId) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            fetch(`http://127.0.0.1:8000/customer/${customerId}`, {
                method: 'DELETE',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    if (res.ok) {
                        alert("Record deleted successfully");
                        fetch("http://127.0.0.1:8000/customer")
                            .then(response => response.json())
                            .then(data => {
                                setCustomers(data);
                                setFilteredData(data);
                            })
                            .catch(error => console.error('Error fetching data:', error));
                    } else {
                        alert("Failed to delete record");
                    }
                })
                .catch((error) => {
                    alert("Failed to delete record");
                    console.log(error);
                });
        }
    };

    const viewCustomerDetails = (customerId) => {

    }

    useEffect(() => {
        const filtered = customers.filter(customer => {
            return search.toLowerCase() === '' ? true :
                customer.name.toLowerCase().includes(search) ||
                customer.email.toLowerCase().includes(search) ||
                customer.phone_no.toLowerCase().includes(search) ||
                customer.address.toLowerCase().includes(search) ||
                customer.id.toLocaleString().includes(search);
        });
        setFilteredData(filtered);
        setCurrentPage(0); // Reset to the first page on search
    }, [search]);


    const customerdatarows = filteredData.slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const [sorted, setSorted] = useState({ sorted: "id", reversed: false });

    const sortedById = () => {
        setSorted({ sorted: "id", reversed: !sorted.reversed });
        const customerCopy = [...customers];
        customerCopy.sort((customerA, customerB) => {
            if (sorted.reversed) {
                return customerA.id - customerB.id;
            }
            return customerB.id - customerA.id;
        });
        setFilteredData(customerCopy);
    }

    const sortedByName = () => {
        setSorted({ sorted: "name", reversed: !sorted.reversed });
        const customerCopy = [...customers];
        customerCopy.sort((customerA, customerB) => {
            const nameA = `${customerA.name}`;
            const nameB = `${customerB.name}`;

            if (sorted.reversed) {
                return nameA.localeCompare(nameB);
            }

            return nameB.localeCompare(nameA);
        });

        setFilteredData(customerCopy)
    }
    const sortedByEmail = () => {
        setSorted({ sorted: "email", reversed: !sorted.reversed });
        const customerCopy = [...customers];
        customerCopy.sort((customerA, customerB) => {
            const emailA = `${customerA.email}`;
            const emailB = `${customerB.email}`;

            if (sorted.reversed) {
                return emailA.localeCompare(emailB);
            }

            return emailB.localeCompare(emailA);
        });

        setFilteredData(customerCopy)
    }

    const sortedByPhoneNo = () => {
        setSorted({ sorted: "phone_no", reversed: !sorted.reversed });
        const customerCopy = [...customers];
        customerCopy.sort((customerA, customerB) => {
            const phone_noA = `${customerA.phone_no}`;
            const phone_noB = `${customerB.phone_no}`;

            if (sorted.reversed) {
                return phone_noA.localeCompare(phone_noB);
            }

            return phone_noB.localeCompare(phone_noA);
        });

        setFilteredData(customerCopy)
    }

    const sortedByaddress = () => {
        setSorted({ sorted: "address", reversed: !sorted.reversed });
        const customerCopy = [...customers];
        customerCopy.sort((customerA, customerB) => {
            const addressA = `${customerA.address}`;
            const addressB = `${customerB.address}`;

            if (sorted.reversed) {
                return addressA.localeCompare(addressB);
            }

            return addressB.localeCompare(addressA);
        });

        setFilteredData(customerCopy)
    }

    const renderArrow = () => {
        if (sorted.reversed) {
            return <FaArrowUp />;
        }
        return <FaArrowDown />;
    }

    return (
        <Container>
            <h1 className='text-center mt-4 title'>All Customers</h1>
            <Form className="d-flex">
                <InputGroup className="me-2">
                    <Form.Control className='search-bar' onChange={handleSearchChange} placeholder='Search Customer' />
                </InputGroup>
            </Form>
            <div className='table-container'>
                <Table hover className='table'>
                    <thead>
                        <tr>
                            <th onClick={sortedById}>CustomerID  {sorted.sorted === "id" ? renderArrow() : null}</th>
                            <th onClick={sortedByName}>Name  {sorted.sorted === "name" ? renderArrow() : null}</th>
                            <th onClick={sortedByEmail}>Email  {sorted.sorted === "email" ? renderArrow() : null}</th>
                            <th onClick={sortedByPhoneNo}>Phone No.  {sorted.sorted === "phone_no" ? renderArrow() : null}</th>
                            <th onClick={sortedByaddress}>Address  {sorted.sorted === "address" ? renderArrow() : null}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerdatarows.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone_no}</td>
                                <td>{customer.address}</td>
                                <td className='link'>
                                    <button onClick={() => viewCustomerDetails(customer.id)} className='action-buttons'><i class="fa fa-user-circle" aria-hidden="true"></i></button>
                                    <button onClick={() => handleDelete(customer.id)} className='action-buttons'><i class="fa fa-trash" aria-hidden="true"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className='pagination'>
                <button className='pagination-btn' disabled={currentPage < 1} onClick={() => handlePageChange(currentPage - 1)}>Prev</button>

                {pageIndex.slice(
                    Math.max(0, currentPage - 2),
                    Math.min(numberOfPages, currentPage + 3)
                ).map(
                    (page) => (<button key={page} onClick={() => handlePageChange(page - 1)} className={page === currentPage + 1 ? "pagination-btn-active" : "pagination-btn"}>
                        {page}
                    </button>
                    ))}
                <button className='pagination-btn' disabled={currentPage >= numberOfPages - 1} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
        </Container>
    )
}