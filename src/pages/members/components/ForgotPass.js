import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Config from '../Config'
import EditModal from './EditModal'

function ForgotPass() {
    const [email, setEmail] = useState('')
    const [editModalShow, setEditModalShow] = useState(false)
    const [forgotModalText, setForgotModalText] = useState('')

    const emailInput = useRef()

    function submitForgotPass(e) {
        e.preventDefault()

        if (email.trim() !== '') {
            fetch(Config.TYSU_FORGOT_PASS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            })
                .then((r) => r.json())
                .then((obj) => {
                    // console.log(obj);
                    setForgotModalText(obj.info || obj.error)
                    setEditModalShow(true)
                })
        } else {
            // console.log('請輸入您的信箱 / 帳號');
            setForgotModalText('請輸入您的信箱 / 帳號')
            setEditModalShow(true)
        }
    }

    return (
        <>
            <h1
                className="tysu_h1"
                onClick={() => {
                    setEmail(
                        (emailInput.current.value = 'wildjungle2022@gmail.com')
                    )
                }}
            >
                FORGOT&nbsp;&nbsp;&nbsp;&nbsp;PASSWORD
            </h1>
            <div className="tysu_contain">
                <form id="tysu_form">
                    <table>
                        <tbody>
                            <tr className="tysu_tr tysu_last">
                                <th>
                                    <label htmlFor="tysu_email">
                                        請輸入電子郵件
                                        <br />
                                        <span className="tysu_titleSpan">
                                            Email
                                        </span>
                                    </label>
                                </th>
                                <td>
                                    <input
                                        ref={emailInput}
                                        type="email"
                                        id="tysu_email"
                                        className="tysu_input"
                                        value={email}
                                        placeholder="請輸入您的email"
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        name="email"
                                    />
                                    <div id="emailHelp"></div>
                                </td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>
                                    <div className="tysu_logHelp">
                                        <button
                                            type="button"
                                            id="submit"
                                            className="tysu_btn_sign"
                                            onClick={submitForgotPass}
                                        >
                                            發 送 驗 證 信
                                        </button>
                                    </div>
                                    <div className="tysu_help">
                                        <Link
                                            to="signup"
                                            className="tysu_signText"
                                        >
                                            <i className="fas fa-user-plus"></i>
                                            SIGN UP
                                        </Link>
                                    </div>
                                </td>
                                <EditModal
                                    editModalShow={editModalShow}
                                    setEditModalShow={setEditModalShow}
                                    forgotModalText={forgotModalText}
                                />
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div className="tysu_loginBg">
                    <img src="./../img/member/leaf_g.svg" alt="" />
                </div>
            </div>
        </>
    )
}
export default ForgotPass
