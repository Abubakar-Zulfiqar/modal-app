import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Modal, Row, Table } from 'react-bootstrap'
import { FaRegUserCircle } from 'react-icons/fa'
import { FcDepartment } from 'react-icons/fc'
import axios from 'axios'

import '../Users List/usersList.css'

const UserModal = () => {
    const [data, setData] = useState([])
    const [dep, setDep] = useState('')
    const [show, setShow] = useState(false)
    const [clickedData, setClickedData] = useState(null)
    const [totalUsers, setTotalUsers] = useState(0)

    const { id } = useParams()
    const navigate = useNavigate()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        fetch('http://localhost:3000/users/' + id)
            .then((res) => {
                return res.json()
            })
            .then((resp) => {
                setDep(resp.dep)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [id])

    const handleSubmit = () => {
        fetch('http://localhost:3000/users/' + id, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                ...clickedData,
                department: dep,
            }),
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:3000/users`)
            .then((res) => {
                setData(res.data)
                setTotalUsers(res.data.length)
            })
            .catch((err) => {
                alert('something wrong in get method', err)
            })
    }, [])

    const uniqueData = []
    // eslint-disable-next-line 
    data.map((items) => {
        if (uniqueData.indexOf(items.department) === -1) {
            return uniqueData.push(items.department)
        }
    })

    const departmentCounts = data.reduce((acc, user) => {
        acc[user.department] = acc[user.department] + 1 || 1
        return acc
    }, {})

    return (
        <>
            <Table striped bordered hover variant='dark' className='mt-5'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Department Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.gender}</td>
                            <td>{item.phone}</td>
                            <td>
                                <Button
                                    variant='primary'
                                    onClick={() => {
                                        handleShow()
                                        setClickedData(item)
                                        navigate(`/modal/${item.id}`)
                                    }}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#3a3a3a',
                                        border: 'white',
                                    }}
                                >
                                    {item.department}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                className='modal-lg'
            >
                <Modal.Header closeButton>User Details</Modal.Header>
                <Modal.Body>
                    {clickedData ? <h3>{clickedData.department}</h3> : null}
                    <Table striped bordered hover size='sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clickedData ? (
                                <tr>
                                    <td>{clickedData.id}</td>
                                    <td>{clickedData.firstName}</td>
                                    <td>{clickedData.lastName}</td>
                                    <td>{clickedData.email}</td>
                                    <td>{clickedData.gender}</td>
                                    <td>{clickedData.phone}</td>
                                </tr>
                            ) : null}
                        </tbody>
                    </Table>

                    <div className='row'>
                        <div className='offset-lg-3 col-lg-6'>
                            <form className='container' onSubmit={handleSubmit}>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-lg-12 mb-2'>
                                            <label className='mb-2'>Departments</label>
                                            <select
                                                type='text'
                                                name='dep'
                                                value={dep}
                                                className='form-control'
                                                onChange={(e) => setDep(e.target.value)}
                                            >
                                                {data.map((item) =>
                                                (
                                                    <option key={item.id}>{item.department}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='col-lg-12'>
                                            <div className='form-group'>
                                                <button
                                                    className='btn btn-success'
                                                    style={{ marginLeft: '9rem' }}
                                                    type='submit'
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col className='col'>
                    <Card className='card'>
                        <Card.Body>
                            <Card.Title>
                                <FaRegUserCircle
                                    style={{ fontSize: '2rem', marginRight: '0.5rem' }}
                                />
                            </Card.Title>
                            <Card.Text>
                                {totalUsers}
                            </Card.Text>
                            <Card.Text>Total Users</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                {uniqueData.map((value, i) => (
                    <Col className='col' key={i}>
                        <Card className='card'>
                            <Card.Body>
                                <Card.Title>
                                    <FcDepartment
                                        style={{ fontSize: '2rem', marginRight: '0.5rem' }}
                                    />
                                </Card.Title>

                                <div>
                                    {Object.entries(departmentCounts).map(([department, count]) =>
                                        department === value ?
                                            (
                                                <Card.Text key={department}>
                                                    {count} users
                                                </Card.Text>
                                            ) : null
                                    )}
                                </div>

                                <Card.Text>{value}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default UserModal
