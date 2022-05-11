import React, { useEffect, useState } from 'react'
import Config from '../Config'

import ConvenienceStoreAdd from './ConvenienceStoreAdd'

function ConvenienceStore(props) {
    const { user711Data, setUser711Data } = props
    const sid = JSON.parse(localStorage.getItem('admin_account'))
    // props fetch的資料將data(array)設為狀態
    const [user711D, setUser711D] = useState([])
    // 切換為新增畫面
    const [showStoreAdd, setShowStoreAdd] = useState(false)

    useEffect(() => {
        const get711Again = async () => {
            const r = await fetch(
                Config.TYSU_711_Add + '?m_id=' + sid['m_sid'],
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            const obj = await r.json()
            // console.log('again 711 obj',obj)
            setUser711D(obj.info)
        }
        get711Again()
    }, [])
    useEffect(() => {
        if (Object.keys(user711Data).length !== 0) {
            setUser711D(user711Data.info)
        }
    }, [user711Data])

    return (
        <>
            {showStoreAdd === false && (
                <>
                    <table className="tysu_table">
                        <tbody>
                            {user711D.length !== 0 ? (
                                user711D.map((v, i) => {
                                    return (
                                        <tr key={i} className="tysu_tr">
                                            <th>
                                                <div
                                                    className="tysu_creditDelete"
                                                    onClick={(e) => {
                                                        // console.log(v["store_sid"])
                                                        const deleteStore =
                                                            async () => {
                                                                await fetch(
                                                                    Config.TYSU_711_DELETE,
                                                                    {
                                                                        method: 'POST',
                                                                        headers:
                                                                            {
                                                                                'Content-Type':
                                                                                    'application/json',
                                                                            },
                                                                        body: JSON.stringify(
                                                                            {
                                                                                store_sid:
                                                                                    v[
                                                                                        'store_sid'
                                                                                    ],
                                                                            }
                                                                        ),
                                                                    }
                                                                )
                                                                    .then((r) =>
                                                                        r.json()
                                                                    )
                                                                    .then(
                                                                        (
                                                                            obj
                                                                        ) => {
                                                                            // console.log('刪除',obj)
                                                                            if (
                                                                                obj.success
                                                                            ) {
                                                                                let newAr =
                                                                                    user711D.filter(
                                                                                        (
                                                                                            k,
                                                                                            j
                                                                                        ) => {
                                                                                            return (
                                                                                                v[
                                                                                                    'store_sid'
                                                                                                ] !==
                                                                                                k[
                                                                                                    'store_sid'
                                                                                                ]
                                                                                            )
                                                                                        }
                                                                                    )
                                                                                // console.log(newAr)
                                                                                setUser711Data(
                                                                                    {
                                                                                        ...user711Data,
                                                                                        error: newAr,
                                                                                    }
                                                                                )
                                                                                setUser711D(
                                                                                    newAr
                                                                                )
                                                                            } else {
                                                                                // console.log('NO')
                                                                            }
                                                                        }
                                                                    )
                                                            }
                                                        deleteStore()
                                                    }}
                                                >
                                                    <i className="fas fa-times"></i>
                                                </div>
                                            </th>
                                            <td
                                                className="tysu_addressTitle"
                                                style={{ padding: '0 15px' }}
                                            >
                                                <label htmlFor="tysu_address">
                                                    7-11 取貨門市【{i + 1}】
                                                    <br />
                                                    <span className="tysu_titleSpan">
                                                        convenience store
                                                    </span>
                                                </label>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="tysu_address"
                                                    className="tysu_input tysu_address_input"
                                                    disabled
                                                    value={v.store_name}
                                                />
                                                <div id="tysu_addressHelp"></div>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr></tr>
                            )}

                            {!user711D.length && (
                                <tr className="tysu_tr tysu_last">
                                    <th></th>
                                    <td>
                                        <div className="tysu_creditT">
                                            尚未設定
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="tysu_btnCenter">
                        <button
                            id="tysu_addBtn"
                            className="tysu_addBtn"
                            onClick={(e) => {
                                e.preventDefault()
                                setShowStoreAdd(true)
                            }}
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </>
            )}
            {showStoreAdd && (
                <ConvenienceStoreAdd
                    showStoreAdd={showStoreAdd}
                    setShowStoreAdd={setShowStoreAdd}
                    user711Data={user711Data}
                    setUser711Data={setUser711Data}
                    user711D={user711D}
                    setUser711D={setUser711D}
                />
            )}
        </>
    )
}
export default ConvenienceStore
