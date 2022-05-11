import React from 'react'

function GradeInfo() {
    return (
        <>
            <ul className="tysu_memberChild">
                <li></li>
                <li className="tysu_gradeLi">
                    <img
                        className="tysu_gradeSmall"
                        src="/img/member/v_small.png"
                        alt=""
                    />
                </li>
                <li className="tysu_gradeLi">
                    <img
                        className="tysu_gradeSmall"
                        src="/img/member/g_small.png"
                        alt=""
                    />
                </li>
                <li className="tysu_gradeLi">
                    <img
                        className="tysu_gradeSmall"
                        src="/img/member/p_small.png"
                        alt=""
                    />
                </li>
                <li className="tysu_gradeLi">
                    <img
                        className="tysu_gradeSmall"
                        src="/img/member/d_small.png"
                        alt=""
                    />
                </li>
            </ul>

            <ul className="tysu_memberChild">
                <li>
                    <button id="tysu_gradeBtn" className="tysu_gradeBtn">
                        符合資格
                    </button>
                </li>
                <li className="tysu_gradetext">加入會員</li>
                <li className="tysu_gradetext">
                    $1000以上
                    <br />/ 2次購物
                </li>
                <li className="tysu_gradetext">
                    $1500以上
                    <br />/ 4次購物
                </li>
                <li className="tysu_gradetext">
                    $2000以上
                    <br />/ 6次購物
                </li>
            </ul>

            <hr className="tysu_hr tysu_listHr" />

            <ul className="tysu_memberChild" style={{ paddingBottom: '7rem' }}>
                <li>
                    <button id="tysu_gradeBtn" className="tysu_gradeBtn">
                        優&emsp;&emsp;惠
                    </button>
                </li>
                <li className="tysu_gradetext">享一次免運</li>
                <li className="tysu_gradetext">購物享九折</li>
                <li className="tysu_gradetext">購物享八五折</li>
                <li className="tysu_gradetext">購物享八折</li>
            </ul>
        </>
    )
}
export default GradeInfo
