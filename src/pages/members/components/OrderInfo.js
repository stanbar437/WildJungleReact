import { isTrivialHref } from '@restart/ui/esm/Anchor'
import React, { useState, useEffect } from 'react'

function OrderInfo() {
    const [order_search, setOrder_search] = useState([])
    const [rowSpan, setRowSpan] = useState([])
    const m_sid = JSON.parse(localStorage.getItem('admin_account')).m_sid
    let count = 1

    useEffect(() => {
        let isMounted = true
        const temp = async () => {
            const r = await fetch('http://localhost:4000/carts/order_search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ m_sid: m_sid }),
            })
            const obj = await r.json()

            // console.log('整理的',obj)
            if (isMounted) {
                setOrder_search(obj)
            }
        }
        const temp2 = async () => {
            const r = await fetch('http://localhost:4000/carts/order_search2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ m_sid: m_sid }),
            })
            const obj = await r.json()

            // console.log('檢查span長度',obj);
            let b = [...rowSpan]
            obj.map((v, i) => {
                if (typeof v.product_name === 'string') {
                    b.push(String(1))
                    if (isMounted) {
                        setRowSpan(b)
                    }
                } else {
                    let num = v.product_name.length
                    b.push(String(num))
                    for (i = 0; i < v.product_name.length - 1; i++) {
                        b.push(String(1))
                    }
                    if (isMounted) {
                        setRowSpan(b)
                    }
                }
            })
        }
        temp2()
        temp()
        return () => {
            isMounted = false
        }
    }, [])

    return (
        <>
            <div className="tysu_filterSelect">
                <select
                    name="cars"
                    id="cars"
                    className="tysu_select"
                    style={{}}
                >
                    <option value="">篩選條件</option>
                    <option value="oneMonth">最近一個月</option>
                    <option value="threeMonth">最近三個月</option>
                    <option value="sixMonth">最近半年</option>
                    <option value="aYear">一年內</option>
                </select>
            </div>
            <table className="tysu_table" style={{ marginBottom: '40rem' }}>
                <thead>
                    <tr className="tysu_orderTr">
                        <th style={{ width: '42px' }}></th>
                        <th style={{ width: '146px' }}>訂單編號</th>
                        <th style={{ width: '208px' }}>商品名稱</th>
                        <th style={{ width: '68px' }}>單價</th>
                        <th style={{ width: '60px' }}>數量</th>
                        <th style={{ width: '126px' }}>訂購時間</th>
                        <th style={{ width: '88px' }}>訂單金額</th>
                        <th style={{ width: '88px' }}>狀態</th>
                    </tr>
                </thead>
                <tbody>
                    {order_search.map((v, i) => {
                        let a = v.order_date === 'none' ? count : count++
                        return (
                            <React.Fragment key={i}>
                                <tr
                                    className="tysu_orderTr tysu_orderText"
                                    key={i}
                                >
                                    {/* <th>{i + 1}</th> */}
                                    {v.order_date === 'none' ? null : (
                                        <th rowSpan={rowSpan[i]}>{a}</th>
                                    )}
                                    {v.order_date === 'none' ? null : (
                                        <td rowSpan={rowSpan[i]}>
                                            <a href="#/">
                                                A
                                                {v.order_date
                                                    .slice(0, 10)
                                                    .split('-')
                                                    .join('') + v.order_sid}
                                            </a>
                                        </td>
                                    )}

                                    <td className="tysu_orderBg">
                                        {' '}
                                        {v.product_name}
                                    </td>
                                    <td>${v.product_price}</td>
                                    <td>{v.product_quantity}</td>
                                    {v.order_date === 'none' ? null : (
                                        <td rowSpan={rowSpan[i]}>
                                            {v.order_date.slice(0, 10)}
                                            <br />
                                            {v.order_date.slice(10)}
                                        </td>
                                    )}
                                    {v.amount === 'none' ? null : (
                                        <td rowSpan={rowSpan[i]}>
                                            ${v.amount}
                                        </td>
                                    )}
                                    {v.status === 'none' ? null : (
                                        <td rowSpan={rowSpan[i]}>{v.status}</td>
                                    )}
                                </tr>
                            </React.Fragment>
                        )
                    })}
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
export default OrderInfo
