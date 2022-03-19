import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions'; 

const CartScreens = () => {
    const { id, qty }   = useParams();
    const navigate      = useNavigate();
    const dispatch      = useDispatch();
    const cart          = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if(id){
            dispatch(addToCart(id, Number(qty)||1))
        }
    },[dispatch, id, qty]);

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate(`/shipping`)
    }

    return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            { !cartItems.length?(
                <Message variant='info'>
                    Your cart is empty <Link to='/'>Go Back</Link>
                </Message>
            ) : (
                <ListGroup variant="flush">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={3}>
                                    <Form.Control 
                                        as='select'
                                        value={item.qty}
                                        onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                        {
                                            [...Array(item.countInStock)].map((e,i) => (i < 5)
                                                    ?(
                                                        <option key={i} value={i+1}>
                                                        {i+1}
                                                        </option>
                                                    )
                                                    :''
                                                )
                                        }
                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                    <Button 
                                        type='button'
                                        variant='light'
                                        onClick={() => removeFromCartHandler(item.product)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        ${cartItems.reduce((acc, item) => acc + item.qty* item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup.Item>
                   <Button
                        type='button'
                        className='btn-block'
                        style={{width: '100%'}}
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                   >
                       Procced To Checkout
                    </Button> 
                </ListGroup.Item>
            </Card>
        </Col>
    </Row>
    )
}

export default CartScreens
