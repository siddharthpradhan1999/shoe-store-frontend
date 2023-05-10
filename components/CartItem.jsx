import { removeFromCart, updateCart } from '@/store/cartSlice';
import Image from 'next/image';
import React from 'react'
import { useDispatch } from 'react-redux';

function CartItem({ data }) {

  const p = data?.attributes;

  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    let payload = {
      key, 
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id
    }
    dispatch(updateCart(payload))

  }
  return (
    <div className='flex py-5 gap-3 md:gap-5 border-b'>

      {/* Image Start Start */}
      <div className='shrink-0 aspect-square w-[50px] md:w-[120px]'>
        <Image width={120} height={120} src={p.thumbnail.data.attributes.url} alt={p.name} />
      </div>
      {/* Image Start End */}

      <div className='w-full flex flex-col'>
        <div className='flex flex-col md:flex-row justify-between'>

          {/* Product Title Start */}
          <div className='text-lg md:text-2xl font-semibold text-black/[0.8]'>
            {p.name}
          </div>
          {/* Product Title End */}

          {/* Product SubTitle md */}
          <div className='text-sm md:text-md font-medium text-black/[0.5] block md:hidden'>
            {p.subTitle}
          </div>
          {/* Product SubTitle  md*/}

          {/* Product Price Start */}
          <div className='text-lg md:text-2xl font-semibold text-black/[0.8] mt-2'>
            &#8377; {p.price}
          </div>
          {/* Product Price End */}
        </div>

        {/* Product SubTitle  */}
        <div className='text-sm md:text-md font-medium text-black/[0.5] hidden md:block'>
          {p.subTitle}
        </div>
        {/* Product SubTitle  */}

        <div className='flex items-center justify-between mt-4'>
          <div className='flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md'>
            <div className='flex items-center gap-1'>
              <div className='font-semibold'>Size:</div>
              <select className='hover:text-black' onChange={(e) => updateCartItem(e, "selectedSize")}>
                {p.size.data.map((item, i) => {
                  return (
                    <option
                      key={i}
                      value={item.size}
                      disabled={!item.enabled ? true : false}
                      selected={data.selectedSize === item.size}>{item.size}</option>
                  )
                })}
              </select>
            </div>


            <div className='flex items-center gap-1'>
              <div className='font-semibold'>Quantity:</div>
              <select className='hover:text-black' onChange={(e) => updateCartItem(e, "quantity")}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option 
                    key={i} 
                    value={q}
                    selected={data.quantity === q}>{q}</option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className='cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]' onClick={() => dispatch(removeFromCart({id: data.id}))}>
            <ion-icon name="trash-outline" ></ion-icon>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem