import React from 'react'
import CartData from './CartData'

export default function CartList({value}) {
    const {cart} = value;
    
    return (
        <div className='container-fluid'>
            {cart.map((item) => {
                return <CartData key={item.id} item={item} value={value} />
            })}
            
        </div>
    )
}

// map through the cart and get the items