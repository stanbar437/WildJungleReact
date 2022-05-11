import React, { useState, useEffect } from 'react'

function OrderCancel() {
    // 取得資料庫的訂單
    const [live_search, setLive_search] = useState([])
    // 篩選方式
    const [sortBy, setSortBy] = useState('')
    const [newD, setNewD] = useState([])

    const m_sid = JSON.parse(localStorage.getItem('admin_account')).m_sid

    const temp = async () => {
        const r = await fetch('http://localhost:4000/carts/live_search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ m_sid: m_sid }),
        })
        const obj = await r.json()
        setLive_search(obj)
    }

    useEffect(() => {
        temp()
    }, [])

    const handleSort = (live_search, sortBy) => {
        let newRoomdata = [...live_search]
        switch (sortBy) {
            case 'oneMonth':
                newRoomdata = [...newRoomdata].filter((v, i) => {
                    return (
                        Math.abs(new Date() - new Date(v.start)) <=
                        30 * 1000 * 3600 * 24
                    )
                })
                break
            case 'threeMonth':
                newRoomdata = [...newRoomdata].filter((v, i) => {
                    return (
                        Math.abs(new Date() - new Date(v.start)) <=
                        90 * 1000 * 3600 * 24
                    )
                })
                break
            case 'sixMonth':
                newRoomdata = [...newRoomdata].filter((v, i) => {
                    return (
                        Math.abs(new Date() - new Date(v.start)) <=
                        180 * 1000 * 3600 * 24
                    )
                })
                break
            case 'aYear':
                newRoomdata = [...newRoomdata].filter((v, i) => {
                    return (
                        Math.abs(new Date() - new Date(v.start)) <=
                        365 * 1000 * 3600 * 24
                    )
                })
                break
            default:
                break
        }
        return newRoomdata
    }

    useEffect(() => {
        setNewD(live_search)
    }, [live_search])

    useEffect(() => {
        let newRoomdata = [...live_search]
        newRoomdata = handleSort(newRoomdata, sortBy)
        setNewD(newRoomdata)
    }, [live_search, sortBy])

    return (
        <>
            <div className="tysu_filterSelect">
                <select
                    name="cars"
                    id="cars"
                    className="tysu_select"
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value)
                    }}
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
                        <th style={{ width: '126px' }}>訂房 / 退房時間</th>
                        <th style={{ width: '88px' }}>訂單金額</th>
                        <th style={{ width: '88px' }}>狀態</th>
                    </tr>
                </thead>
                {newD.length !== 0 ? (
                    newD.map((v, i) => {
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
                                    {typeof v.room_name === 'string' ? (
                                        <td className="tysu_orderBg">
                                            <div>{v.room_name}</div>
                                        </td>
                                    ) : (
                                        <td className="tysu_orderBg">
                                            <div>{v.room_name.join('\n')}</div>
                                        </td>
                                    )}
                                    <td>${v.price}</td>
                                    <td>{v.room_count}</td>
                                    <td>
                                        {v.start}
                                        <br />至<br />
                                        {v.end}
                                    </td>
                                    <td>${v.amount}</td>
                                    <td>{v.status}</td>
                                </tr>
                            </tbody>
                        )
                    })
                ) : (
                    <tbody>
                        <tr className="tysu_tr tysu_last">
                            <th></th>
                            <td></td>
                            <td></td>
                            <td>
                                <div className="tysu_creditT">沒有資料</div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                )}
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
export default OrderCancel
