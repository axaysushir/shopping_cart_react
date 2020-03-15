import React from 'react'

export default function CartData({item, value}) {
    const {id, title, img, price, count, total} = item;
    const {increment, decrement, removeItem, } = value;
    return (
        <div className="row my-2 text-center text-capitalize">
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} style={{width:'5rem', height:"5rem"}} className='img-fluid' alt="product"/>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">Product: </span>{title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">Price: </span>{price}
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1" onClick={() => decrement(id)}>-</span>
                        <span className="btn btn-black mx-1">{count}</span>
                        <span className="btn btn-black mx-1" onClick={() => increment(id)}>+</span>
                    </div>
                </div>
            </div>
            {/* 4.52 */}
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={() => removeItem(id)}>
                    <i className='fas fa-trash'></i>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong>Item total: $ {total}</strong>
            </div>
        </div>
    )
}
