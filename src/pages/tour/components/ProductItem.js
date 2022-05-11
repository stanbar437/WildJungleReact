import React from "react"
function ProductItem(props) {
  // 每個商品物件
  //    {
  //        id:1,
  //        name: '咖啡色 T-shirt',
  //        image:'https://i.imgur.com/1GrakTl.jpg',
  //
  //    }

  const { id, name, image } = props

  return (
    <>
     
        <div style={{width:'25%',height:'100%'}} className="mapic align-items-center">
          <div style={{width:'100%',height:'350px'}} className="col-12">
            <img style={{width:'100%',height:'300px'}} alt="" className="img-fluid" src={image} />
          </div>
          <div style={{fontSize:'1.8rem',fontWeight:'600',marginLeft:'8rem'}} className="row">{name}</div>
         </div>
     
        { 
    }
    </>
  )
}

export default ProductItem
