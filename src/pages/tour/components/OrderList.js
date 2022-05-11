import React from 'react'
import ProductItem from './ProductItem'

const products = [
  {
    id: 1,
    name: '亞洲象',
    image:'img/tour/tiger.jpeg'
  },
  {
    id: 2,
    name: '亞洲象',
    image:'img/tour/sleep.jpeg'
  },
  {
    id: 3,
    name: '亞洲象',
    image:'img/tour/Capybara.jpg'
  },
  {
    id: 4,
    name: '亞洲象',
    image:'img/tour/img-raccoon-6.jpg'
  },
]

function OrderList(props) {
  return (
    <>
      <div className="Test11111">
          <div style={{display:'flex'}} className="row">
          

          {products.map((product, i) => {
          const { id, name, image } = product
          return <ProductItem key={id} id={id} name={name} image={image} />
        })}
        
        </div>
     </div>

    </>
  )
}

export default OrderList
