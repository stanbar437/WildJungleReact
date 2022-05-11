import React from 'react'

function DiscountTicket() {
    return (
        <>
            <table className="tysu_table" style={{ marginBottom: '50rem' }}>
                <thead>
                    <tr className="tysu_orderTr">
                        <th style={{ width: '42px' }}></th>
                        <th style={{ width: '142px' }}>優惠券序號</th>
                        <th style={{ width: '208px' }}>優惠券名稱</th>
                        <th style={{ width: '86px' }}>面額</th>
                        <th style={{ width: '92px' }}>抵用門檻</th>
                        <th style={{ width: '160px' }}>有效時間</th>
                        <th style={{ width: '100px' }}>使用狀態</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="tysu_tr tysu_last">
                        <th></th>
                        <td></td>
                        <td></td>
                        <td>
                            <div className="tysu_creditT">尚未獲得</div>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default DiscountTicket
