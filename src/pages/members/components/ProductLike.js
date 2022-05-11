import React, { useEffect, useState } from 'react'
import Config from '../Config'

function ProductLike(props) {
    const { likeAddCard, setLikeAddCart, likeListData, setLikeListData } = props
    let likes = []
    if (localStorage.getItem('like')) {
        likes = JSON.parse(localStorage.getItem('like'))
    }

    // 取得資料庫所有商品列表
    const [productLikeData, setProductLikeData] = useState([])
    const [likeProducts, setLikeProducts] = useState({})

    useEffect(() => {
        const getProductsData = async () => {
            const r = await fetch(Config.TYSU_PRODUCT_LIKE, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const obj = await r.json()
            // console.log(obj);
            setProductLikeData(obj)

            let newAr = {}

            obj.forEach((el) => {
                likes.forEach((v) => {
                    // console.log(el['ProductSid']===Number(v))
                    if (el['ProductSid'] === Number(v)) {
                        // console.log(el);
                        //newAr.push(el)
                        newAr[el.ProductSid.toString()] = el
                    }
                })
            })
            // console.log('newAr:', newAr);
            setLikeProducts(newAr)
        }
        getProductsData()
    }, [])

    return (
        <>
            <table className="tysu_table" style={{ marginBottom: '50rem' }}>
                <thead>
                    <tr className="tysu_orderTr">
                        <th style={{ width: '38px' }}></th>
                        <th style={{ width: '176px' }}>商品</th>
                        <th style={{ width: '168px' }}>商品名稱</th>
                        <th style={{ width: '120px' }}>單價</th>
                        <th style={{ width: '140px' }}>加入時間</th>
                        <th style={{ width: '158px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {!!Object.keys({ ...likeProducts }).length &&
                        likes.map((pid, i) => {
                            const v = likeProducts[pid]
                            return (
                                <tr
                                    key={v.ProductSid}
                                    className="tysu_orderTr tysu_orderText"
                                    name={v.ProductSid}
                                >
                                    <th>{i + 1}</th>
                                    <td>
                                        <img
                                            className="tysu_likeImg"
                                            src={
                                                '/img/product/' +
                                                v.ProductsMainPic
                                            }
                                            alt=""
                                        />
                                    </td>
                                    <td className="tysu_orderBg">
                                        {v.ProductsName}
                                    </td>
                                    <td>${v.ProductsPrice}</td>
                                    <td>
                                        {new Date().toISOString().slice(0, 10)}
                                    </td>
                                    <td className="tysu_likeGroup">
                                        <button
                                            id="tysu_likeBtn"
                                            className="tysu_likeBtn tysu_likeCart"
                                        >
                                            加入購物車
                                        </button>
                                        <button
                                            id="tysu_likeBtn"
                                            className="tysu_likeBtn tysu_likeCancel"
                                            onClick={(e) => {
                                                const numAr = Object.keys(
                                                    likeProducts
                                                ).filter((j, k) => {
                                                    return j == v.ProductSid
                                                })
                                                if (
                                                    v.ProductSid.toString() ===
                                                    numAr[0]
                                                ) {
                                                    let targetNum =
                                                        likes.findIndex(
                                                            (k) =>
                                                                k ===
                                                                v.ProductSid.toString()
                                                        )
                                                    if (targetNum !== -1) {
                                                        likes.splice(
                                                            targetNum,
                                                            1
                                                        )
                                                        localStorage.setItem(
                                                            'like',
                                                            JSON.stringify(
                                                                likes
                                                            )
                                                        )
                                                    }
                                                }
                                            }}
                                        >
                                            取消收藏
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    {Object.keys({ ...likeProducts }).length < 1 ||
                    likes.length < 1 ? (
                        <tr>
                            <th></th>
                            <td></td>
                            <td></td>
                            <td>
                                <div className="tysu_creditT">尚未加入唷!</div>
                            </td>
                            <td></td>
                        </tr>
                    ) : (
                        <tr></tr>
                    )}
                </tbody>
            </table>
            {/* <nav className="tysu_filterSelect tysu_btnPages">
            <ul className="tysu_pageGroup">
                <li className="tysu_pageItem">
                    <a className="tysu_pageLink" href="#/">
                        <i className="fas fa-angle-left"></i>
                    </a>
                </li>
                <li className="tysu_pageItem tysu_pageText">
                    <input type="text" className="tysu_pageInput" defaultValue="1" />
                </li>
                <li className="tysu_pageItem">
                    <a className="tysu_pageLink" href="#/">
                        <i className="fas fa-angle-right"></i>
                    </a>
                </li>
            </ul>
            <ul>
                <li className="tysu_allPage">/&nbsp;10&nbsp;頁</li>
            </ul>
        </nav> */}
        </>
    )
}
export default ProductLike
