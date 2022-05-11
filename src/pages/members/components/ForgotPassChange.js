import React from 'react'
import { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Config from '../Config'

import EditModal from './EditModal'

function ForgotPassChange() {
    const location = useLocation()
    const history = useHistory()
    const [editModalShow, setEditModalShow] = useState(false)
    const [forgotPassText, setForgotPassText] = useState('')

    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const [formError, setFormError] = useState({
        password: '',
        confirmpassword: '',
    })
    const usp = new URLSearchParams(location.search)
    const authRole = usp.get('auth')

    const [changePass, setChangePass] = useState(false)

    const FormChange = (e) => {
        const name = e.target.name

        const updateFieldError =
            name === 'password' || name === 'confirmpassword'
                ? { ...formError, password: '', confirmpassword: '' }
                : { ...formError, [name]: '' }
        setFormError(updateFieldError)
    }

    const FormInvalid = (e) => {
        e.preventDefault()
        const updateFieldError = {
            ...formError,
            [e.target.name]: e.target.validationMessage,
        }
        setFormError(updateFieldError)
    }

    const submitChangePass = async (e) => {
        e.preventDefault()

        const fd = new FormData(e.target)
        const fdpassword = fd.get('password')
        const fdconfirmpassword = fd.get('confirmpassword')
        if (fdpassword === '' || fdconfirmpassword === '') {
            const updateFieldError = {
                ...formError,
                password: '請輸入欲變更的密碼',
                confirmpassword: '請輸入欲變更的密碼',
            }
            setFormError(updateFieldError)
        }
        if (fdpassword !== fdconfirmpassword) {
            const updateFieldError = {
                ...formError,
                password: '密碼與確認密碼需相同',
                confirmpassword: '密碼與確認密碼需相同',
            }
            setFormError(updateFieldError)
        } else {
            await fetch(Config.TYSU_CHANGE_PASS, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + authRole,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: password }),
            })
                .then((r) => r.json())
                .then((obj) => {
                    // console.log(obj);
                    if (obj.success) {
                        // console.log(obj.error);
                        setForgotPassText(obj.error || '已更改成功，請重新登入')
                        setEditModalShow(true)
                        setChangePass(true)
                    } else {
                        // console.log(obj.error);
                        setForgotPassText(obj.error || '不可與前一次密碼相同')
                        setEditModalShow(true)
                        setChangePass(false)
                    }
                })
        }
    }

    return (
        <>
            <h1 className="tysu_h1">FORGOT&nbsp;&nbsp;&nbsp;&nbsp;PASSWORD</h1>
            <form
                id="tysu_form"
                onSubmit={submitChangePass}
                onChange={FormChange}
                onInvalid={FormInvalid}
            >
                <table>
                    <tbody>
                        <tr className="tysu_tr">
                            <th>
                                <label htmlFor="tysu_pass">
                                    密碼
                                    <br />
                                    <span className="tysu_titleSpan">
                                        Password
                                    </span>
                                </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    id="tysu_pass"
                                    className="tysu_input"
                                    name="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                                <div id="tysu_passHelp">
                                    {formError.password}
                                </div>
                            </td>
                        </tr>
                        <tr className="tysu_tr tysu_last">
                            <th>
                                <label htmlFor="tysu_cfPass">
                                    再次確認密碼
                                    <br />
                                    <span className="tysu_titleSpan">
                                        Confirm Password
                                    </span>
                                </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    id="tysu_cfPass"
                                    className="tysu_input"
                                    name="confirmpassword"
                                    value={confirmpassword}
                                    onChange={(e) => {
                                        setConfirmpassword(e.target.value)
                                    }}
                                />
                                <div id="tysu_cfPassHelp">
                                    {formError.confirmpassword}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>
                                <div className="tysu_logHelp">
                                    {!changePass ? (
                                        <button
                                            id="submit"
                                            className="tysu_btn_sign"
                                        >
                                            確　定　變　更
                                        </button>
                                    ) : (
                                        <button
                                            id="submit"
                                            className="tysu_btn_sign"
                                            onClick={() => {
                                                history.push('/members/login')
                                            }}
                                        >
                                            前　往　登　入
                                        </button>
                                    )}
                                </div>
                                <EditModal
                                    editModalShow={editModalShow}
                                    setEditModalShow={setEditModalShow}
                                    forgotPassText={forgotPassText}
                                    setForgotPassText={setForgotPassText}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    )
}
export default ForgotPassChange
