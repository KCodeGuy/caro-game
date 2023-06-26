import React from 'react';
import { useState, useMemo, useRef } from 'react';

// Convert string to number js
// 1. let num1 = parseInt(str) 
// 2. let num2 = +str
// 3. let num3 = Number(str)

const TodoList = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [products, setProducts] = useState([]);

    // Get DOM elements by useRef()
    const productName = useRef();
    const productPrice = useRef();

    const handleSubmit = () => {
        setProducts(
            [...products, { name, price: parseInt(price) }]
        )
        // Set input empty after adding
        setName('');
        setPrice('');

        // Focus to input after adding
        productName.current.focus();
        productPrice.current.focus();
    }

    const handleRemove = (index) => {
        let tempProducts = [...products];
        tempProducts.splice(index, 1);
        setProducts(tempProducts);
    }

    const setInputPlaceholder = (product) => {
        productName.current.value = product.name;
        productPrice.current.value = product.price;
    }

    const total = useMemo(() => {
        const result = products.reduce((result, prod) => {
            return result + prod.price;
        }, 0);
        return result;
    }, [products]);

    return (
        <div>
            <form>
                <input
                    ref={productName}
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    placeholder='Enter your product!'
                    required
                />
                <input
                    ref={productPrice}
                    value={price}
                    onChange={(e) => { setPrice(e.target.value) }}
                    placeholder='Enter your price!'
                    required
                />
                <button type='submit' onClick={handleSubmit}>Add product</button>
            </form>
            <div>
                <span>Total: </span>
                {total}
            </div>
            <ul>
                {
                    products.map((product, index) => (
                        <li key={index} onClick={() => setInputPlaceholder(product)}>
                            {index + 1}. {product.name} - {product.price}
                            <button>Update</button>
                            <button onClick={() => handleRemove(index)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div >
    );
};

export default TodoList;