import React from 'react'

function ActivityLike() {
    return (
        <>
            <table className="tysu_table">
                <thead>
                    <tr className="tysu_orderTr">
                        <th style={{ width: '42px' }}></th>
                        <th style={{ width: '160px' }}>活動種類</th>
                        <th style={{ width: '296px' }}>活動名稱</th>
                        <th style={{ width: '174px' }}>加入時間</th>
                        <th style={{ width: '158px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr className="tysu_orderTr tysu_orderText">
                    <th>1</th>
                    <td className="tysu_orderBg">餵食秀</td>
                    <td>海豚表演</td>
                    <td>2022/02/01</td>
                    <td className="tysu_likeGroup">
                        <button id="tysu_likeBtn" className="tysu_likeBtn tysu_likeCart">加入購物車</button>
                        <button id="tysu_likeBtn" className="tysu_likeBtn tysu_likeCancel">取消收藏</button>
                    </td>
                </tr> */}
                </tbody>
            </table>
            <div className="tysu_creditT" style={{ marginBottom: '50rem' }}>
                尚未加入唷!
            </div>
            {/* <nav className="tysu_filterSelect tysu_btnPages">
                <ul className="tysu_pageGroup" style={{marginLeft:"63.2px"}}>
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
export default ActivityLike
