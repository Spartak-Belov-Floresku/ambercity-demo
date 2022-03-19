import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const navigate = useNavigate();

    const [queryParams, setQueryParams] = useState('');

    const submitHandler = e => {
        e.preventDefault();
        if(queryParams){
            navigate(`/keyword=${queryParams}&page=1`)
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex me-5'>
            <Form.Control
                type='text'
                name='q'
                onChange={e => setQueryParams(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
