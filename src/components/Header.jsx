import React from 'react';
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart } from "react-icons/fa";
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Header = () => {

    const { state:{ cart }, dispatch, filterDispatch } = CartState();

    return (
        <Navbar bg='dark' variant='dark' style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <a href='/'>Shoopy!</a>
                </Navbar.Brand>
                <Navbar.Text classname="search">
                    <FormControl 
                        style={{ width: 500 }}
                        placeholder="Search"
                        className="m-auto"
                        onChange={(e) =>
                            filterDispatch({
                                type: "FILTER_BY_SEARCH",
                                payload: e.target.value,
                            })
                        }
                    />
                </Navbar.Text>
                <Nav>
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant='success'>
                            <FaShoppingCart color="white" fontSize="25px"/>
                            <Badge bg='success'>{ cart.length }</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {cart.length > 0 ? (
                                <>
                                    {cart.map((product) => (
                                        <span className="cartItem" key={product.id}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="cartItemImg"
                                            />
                                            <div className="cartItemDetail">
                                                <span>{ product.name }</span>
                                                <span>$ { product.price.split(".")[0] }</span>
                                            </div>
                                            <AiFillDelete
                                                fontSize="20px"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: product,
                                                    })
                                                }
                                            />
                                        </span>
                                    ))}
                                    <Link to="/cart">
                                        <Button style={{ width: "95%", margin: "0 10px" }}>
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <span style={{ padding: 10 }}>Cart is Empty!</span>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
};

export default Header;