import axios from 'axios';
import React, { useState } from 'react'
import {
    Container,
    Row,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
} from "reactstrap";

function AddProductForm() {
    const initProductState = {
        name: "",
        category: "",
        price: "",
        tags: [],
    };
    const [product, setProduct] = useState(initProductState);
    const [submitted, setSubmitted] = useState(false);


    const handleInputChange = (event) => {
        let { name, value } = event.target;  //มันจะแมตอัตโนมัติ กับ name
        if(name === "tags"){
            value = value.split(",");
        };
        setProduct({...product, [name]: value });
    };
    const saveProduct = () => {
        const param = {
            name: product.name,
            category: product.category,
            price: product.price,
            tags: product.tags,
        };

        //call API
        axios.post("http://localhost:5000/api/products", param)
        .then((response)=>{
                console.log(response.data);
                setProduct(initProductState);
                setSubmitted(true);
            })
        .catch((error)=>{
                console.log(error);
            });
    };
    
    const newProduct = () =>{
        setProduct(initProductState);
        setSubmitted(false);
    }
    return (
        <Container>
            <Row><h3>Add new Product</h3></Row>

            {submitted ? (
                <>
                <Alert color='success'>
                    You have submitted successfully !!
                    </Alert>
                    <Button className='btn btn-success' onClick={newProduct}>Add new product</Button>
                    </>
            ):(<>
            <Form>

            <FormGroup>
                <Label for="productName">Product Name</Label>
                <Input type='text' name="name" id="productName"
                    value={product.name || ""}
                    onChange={handleInputChange} placeholder='Enter product name'>
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="productCategory">Product Category</Label>
                <Input type='text' name="category" id="productCategory"
                    value={product.category || ""}
                    onChange={handleInputChange} placeholder='Enter product category'>
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="productPrice">Product Price</Label>
                <Input type='text' name="price" id="productPrice"
                    value={product.price || ""}
                    onChange={handleInputChange} placeholder='Enter product price'>
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="productTags">Product Tags</Label>
                <Input type='text' name="tags" id="productTags"
                    value={product.tags || ""}
                    onChange={handleInputChange} placeholder='Enter product tags'>
                </Input>
            </FormGroup>

            <Button className='btn btn-success' onClick={saveProduct} >Add new product</Button>

        </Form>
            </>)}
            
        </Container>
    )
}

export default AddProductForm;
