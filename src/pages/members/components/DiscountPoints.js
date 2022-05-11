import React from 'react'

function DiscountPoints(props) {
    const { pointData } = props

    return (
        <>
            <table className="tysu_table" style={{ marginBottom: '50rem' }}>
                <thead>
                    <tr className="tysu_orderTr">
                        <th style={{ width: '42px' }}></th>
                        <th style={{ width: '142px' }}>紅利序號</th>
                        <th style={{ width: '208px' }}>紅利名稱</th>
                        <th style={{ width: '120px' }}>點數</th>
                        <th style={{ width: '218px' }}>有效時間</th>
                        <th style={{ width: '100px' }}>使用狀態</th>
                    </tr>
                </thead>
                <tbody>
                    {pointData.length === 0 && (
                        <tr className="tysu_orderText">
                            <th></th>
                            <td></td>
                            <td></td>
                            <td className="tysu_creditT">沒有資料</td>
                            <td></td>
                            <td></td>
                        </tr>
                    )}
                    {pointData.map((v, i) => {
                        return (
                            <tr key={i} className="tysu_orderTr tysu_orderText">
                                <th>{i + 1}</th>
                                <td>P77C{v.bonusList_sid}</td>
                                <td className="tysu_orderBg">{v.name}</td>
                                <td>{v.number}</td>
                                <td>{v.getTime_start + '~' + v.getTime_end}</td>
                                <td>{v.bonus_status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
export default DiscountPoints
