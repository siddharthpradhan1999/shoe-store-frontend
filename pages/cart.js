import CartItem from '@/components/CartItem'
import Wrapper from '@/components/Wrapper'
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { makePaymentRequest } from '@/utils/api'

const stripePromise = loadStripe("pk_test_51MZYhASFJX5BaTIm6E1EIToHKRI5YDn6uZP2aNeBEYiRaTXtrDGsJZ7ob6tidZi7VVOmY87HMMmK6A9NE8alXgMJ00opEhFCZT")
function cart() {

    const [loading, setLoading] = useState(false)

    const { cartItems } = useSelector((state) => state.cart);
    const subTotal = useMemo(() => {
        return cartItems.reduce((total, val) => total + val.attributes.price, 0)
    }, [cartItems])

    const handlePayment = async () => {
        try {
            setLoading(true);
            const stripe = await stripePromise;
            const res = await makePaymentRequest("/api/orders", {
                products: cartItems,
            });
            await stripe.redirectToCheckout({
                sessionId: res.stripeSession.id,
            });
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <div className='w-full md:py-20'>
            <Wrapper>
                {cartItems.length > 0 && (

                    <>
                        {/* Heading & Paragraph Start */}
                        <div className='text-center max-w-[800px] mx-auto mt-8 md\mt-0'>
                            <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
                                Shopping Cart
                            </div>
                        </div>
                        {/* Heading & Paragraph End */}


                        {/* Cart Content Start */}
                        <div className='flex flex-col lg:flex-row gap-12 py-10'>

                            {/* Cart Items Start */}
                            <div className='flex-[2]'>
                                <div className='text-lg font-bold'>Cart Items</div>
                                {cartItems.map((item) => (
                                    <CartItem key={item.id} data={item} />
                                ))}
                            </div>
                            {/* Cart Items End */}

                            {/* Cart Summary Start */}
                            <div className='flex-[1]'>
                                <div className='text-lg font-bold'>Summary</div>

                                <div className='p-5 my-5 bg-black/[0.05] rounded-xl'>
                                    <div className='flex justify-between'>
                                        <div className='uppercase text-md md:text-lg font-medium text-black'>Subtotal</div>
                                        <div className='text-md md:text-lg font-medium text-black'>&#8377; {subTotal}</div>
                                    </div>
                                    <div className='text-sm md:text-md py-5 border-t mt-5'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </div>
                                </div>

                                {/* Button Start */}
                                <button className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 uppercase flex items-center gap-2 justify-center' onClick={handlePayment}>
                                    Checkout
                                    {loading && <img src='/spinner.svg' />}
                                </button>
                                {/* Button Start */}

                            </div>
                            {/* Cart Summary End */}

                        </div>
                        {/* Cart Content End */}
                    </>
                )}


                {/* Empty Cart: Start */}
                {cartItems.length < 1 && (
                    <div className='flex-[2] flex flex-col items-center pb-[50px] md:-mt-14'>
                        <Image src='/empty-cart.jpg' width={300} height={300} className='w-[300px] md:w-[400px]' />
                        <span className='text-xl font-bold'>Your Cart is empty</span>
                        <span className='text-center mt-4'>
                            Looks like you have not added anything in your cart.
                            <br />
                            Go ahead and explore top categories.
                        </span>
                        <Link href='/'
                            className='py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8'>
                            Continue Shopping
                        </Link>
                    </div>
                )}
                {/* Empty Cart: End */}
            </Wrapper>
        </div>
    )
}

export default cart