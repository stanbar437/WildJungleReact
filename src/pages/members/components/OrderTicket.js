import React, { useState, useEffect } from 'react'

function OrderTicket() {
    const [ticket_search, setTicket_search] = useState([])
    const m_sid = JSON.parse(localStorage.getItem('admin_account')).m_sid

    useEffect(() => {
        const temp = async () => {
            const r = await fetch('http://localhost:4000/carts/ticket_search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ m_sid: m_sid }),
            })
            const obj = await r.json()
            setTicket_search(obj)
        }
        temp()
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
                        <th style={{ width: '88px' }}>訂單金額</th>
                        <th style={{ width: '126px' }}>有效時間</th>
                        <th style={{ width: '88px' }}>狀態</th>
                    </tr>
                </thead>
                {ticket_search.map((v, i) => {
                    return (
                        <tbody key={i}>
                            <tr className="tysu_orderTr tysu_orderText">
                                <th rowSpan="0">{i + 1}</th>
                                <td rowSpan="0">
                                    <a href="#/">
                                        A
                                        {v.order_date
                                            .slice(0, 10)
                                            .split('-')
                                            .join('') + v.order_sid}
                                    </a>
                                </td>
                                {typeof v.product_name === 'string' ? (
                                    <td className="tysu_orderBg">
                                        <div>{v.product_name}</div>
                                    </td>
                                ) : (
                                    <td className="tysu_orderBg">
                                        <div>{v.product_name.join('\n')}</div>
                                    </td>
                                )}
                                <td>${v.product_price}</td>
                                <td>{v.product_quantity}</td>
                                <td rowSpan="0">${v.amount}</td>
                                <td>{v.order_date.slice(0, 10)}</td>
                                <td>未使用</td>
                            </tr>
                        </tbody>
                    )
                })}
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
export default OrderTicket
