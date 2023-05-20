import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UsersList = () => {
    return (
        <div className='d-flex justify-content-center mt-5'>
            <Link to='/modal/:id'>
                <Button variant="primary">Users</Button>
            </Link>
        </div>
    )
}

export default UsersList