import React, { useRef, useState } from 'react'
import Config from '../Config'
import MemberModal from './MemberModal'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Signup() {
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(true)
    }
    const [signSuccess, setSignSuccess] = useState('')

    // 欄位狀態
    const [fields, setFields] = useState({
        email: '',
        name: '',
        gender: '',
        birthday: '',
        password: '',
        confirmPassword: '',
        checkbox: true,
    })

    // 錯誤訊息狀態
    const [fieldErrors, setFieldErrors] = useState({
        email: '',
        name: '',
        gender: '',
        birthday: '',
        password: '',
        confirmPassword: '',
        checkbox: '',
    })

    // 輸入欄位
    const handleFieldChange = (e) => {
        let newValue = e.target.value

        // 1.拷貝 2.處理
        const updateFieldError = { ...fields, [e.target.name]: newValue }
        // 3.設定回原狀態
        setFields(updateFieldError)
    }

    // 表單有更動時先清空
    const handleFormChange = (e) => {
        const name = e.target.name

        const updateFieldError =
            name === 'password' ||
            name === 'confirmPassword' ||
            name === 'checkbox'
                ? {
                      ...fieldErrors,
                      password: '',
                      confirmPassword: '',
                      checkbox: '',
                  }
                : { ...fieldErrors, [name]: '' }
        setFieldErrors(updateFieldError)
    }

    // 填寫錯誤時顯示
    const handleFormInvalid = (e) => {
        e.preventDefault()
        const updateFieldError = {
            ...fieldErrors,
            [e.target.name]: e.target.validationMessage,
        }
        setFieldErrors(updateFieldError)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const fd = new FormData(e.target)
        const email = fd.get('email')
        const name = fd.get('name')
        const gender = fd.get('gender')
        const birthday = fd.get('birthday')
        const password = fd.get('password')
        const confirmPassword = fd.get('confirmPassword')
        const checkbox = fd.get('checkbox')
        // console.log(!!checkbox)
        if (
            email.trim() === '' &&
            name.trim() === '' &&
            gender === '' &&
            password === '' &&
            confirmPassword === ''
        ) {
            const updateFieldError = {
                ...fieldErrors,
                email: '請輸入您的帳號/email',
                name: '請輸入至少包含兩位字元',
                gender: '請選擇一種',
                birthday: '請確定您的生日',
                password: '請檢查! 您的密碼與再次確認密碼不同',
                confirmPassword: '請檢查! 您的密碼與再次確認密碼不同',
            }
            setFieldErrors(updateFieldError)
            // console.log('1')
            return
        }

        if (email.trim() === '' || email.length === 0) {
            const updateFieldError = {
                ...fieldErrors,
                email: '請輸入您的帳號/email',
            }
            setFieldErrors(updateFieldError)
            // console.log('2')
            return
        }
        if (name.trim() === '' || name.length < 2) {
            const updateFieldError = {
                ...fieldErrors,
                name: '請輸入至少兩位數的姓名',
            }
            setFieldErrors(updateFieldError)
            // console.log('3')
            return
        }
        if (
            password.trim() === '' ||
            confirmPassword.trim() === '' ||
            password.trim() !== confirmPassword.trim()
        ) {
            const updateFieldError = {
                ...fieldErrors,
                password: '請檢查! 您的密碼與再次確認密碼不同',
                confirmPassword: '請檢查! 您的密碼與再次確認密碼不同',
            }
            setFieldErrors(updateFieldError)
            // console.log('4')
            return
        }
        if (fields.checkbox === false) {
            const updateFieldError = {
                ...fieldErrors,
                checkbox: '須同意才能註冊',
            }
            setFieldErrors(updateFieldError)
            return
        }

        fetch(Config.TYSU_SIGNUP, {
            method: 'POST',
            body: fd,
        })
            .then((r) => r.json())
            .then((obj) => {
                // console.log(obj)
                if (obj.success) {
                    setSignSuccess('成功註冊，請至您的信箱收取驗證信')
                    handleShow(true)
                } else {
                    setSignSuccess(
                        obj.error || '此帳號已被註冊，如忘記密碼請點選忘記密碼'
                    )
                    handleShow(true)
                }
            })
    }

    const emailInput = useRef()
    const nameInput = useRef()
    const genderSelect = useRef()
    const birthInput = useRef()
    const passInput = useRef()
    const cfpassInput = useRef()

    return (
        <>
            <h1
                className="tysu_h1"
                onClick={(e) => {
                    setFields({
                        email: (emailInput.current.value = ''),
                        name: '',
                        gender: '未決定',
                        birthday: '',
                        password: 'a123456',
                        confirmPassword: 'a123456',
                    })
                    setFieldErrors({
                        email: '',
                        name: '',
                        gender: '',
                        birthday: '',
                        password: '',
                        confirmPassword: '',
                        checkbox: '',
                    })
                }}
            >
                SIGN&nbsp;&nbsp;&nbsp;&nbsp;UP
            </h1>
            <form
                id="tysu_form"
                name="form2"
                onSubmit={handleSubmit}
                onInvalid={handleFormInvalid}
                onChange={handleFormChange}
            >
                <table>
                    <tbody>
                        <tr className="tysu_tr">
                            <th>
                                <label htmlFor="tysu_email">
                                    帳號 / 電子郵件
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
                                    value={fields.email}
                                    placeholder="請輸入您的email"
                                    onChange={handleFieldChange}
                                    name="email"
                                />
                                <div id="emailHelp">{fieldErrors.email}</div>
                            </td>
                        </tr>

                        <tr className="tysu_tr">
                            <th>
                                <label htmlFor="tysu_name">
                                    姓名
                                    <br />
                                    <span className="tysu_titleSpan">Name</span>
                                </label>
                            </th>
                            <td>
                                <input
                                    ref={nameInput}
                                    type="text"
                                    id="tysu_name"
                                    className="tysu_input"
                                    value={fields.name}
                                    placeholder="請輸入您的姓名"
                                    onChange={handleFieldChange}
                                    name="name"
                                />
                                <div id="nameHelp">{fieldErrors.name}</div>
                            </td>
                        </tr>
                        <tr className="tysu_tr">
                            <th>
                                <label htmlFor="tysu_gender">
                                    性別
                                    <br />
                                    <span className="tysu_titleSpan">
                                        Gender
                                    </span>
                                </label>
                            </th>
                            <td>
                                <select
                                    ref={genderSelect}
                                    id="tysu_gender"
                                    className="tysu_input"
                                    name="gender"
                                    value={fields.gender}
                                    onChange={handleFieldChange}
                                >
                                    <option value="">請選擇</option>
                                    <option value="男">男性</option>
                                    <option value="女">女性</option>
                                    <option value="未決定">未決定</option>
                                </select>
                                <div id="genderHelp">{fieldErrors.gender}</div>
                            </td>
                        </tr>
                        <tr className="tysu_tr">
                            <th>
                                <label htmlFor="tysu_birth">
                                    生日
                                    <br />
                                    <span className="tysu_titleSpan">
                                        Birthday
                                    </span>
                                </label>
                            </th>
                            <td>
                                <input
                                    ref={birthInput}
                                    id="tysu_birth"
                                    type="date"
                                    className="tysu_input"
                                    name="birthday"
                                    value={fields.birthday}
                                    onChange={handleFieldChange}
                                />
                                <div id="birthHelp">{fieldErrors.birthday}</div>
                            </td>
                        </tr>
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
                                    ref={passInput}
                                    type="text"
                                    id="tysu_pass"
                                    className="tysu_input"
                                    name="password"
                                    value={fields.password}
                                    onChange={handleFieldChange}
                                />
                                <div id="tysu_passHelp">
                                    {fieldErrors.password}
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
                                    ref={cfpassInput}
                                    type="text"
                                    id="tysu_cfPass"
                                    className="tysu_input"
                                    value={fields.confirmPassword}
                                    onChange={handleFieldChange}
                                    name="confirmPassword"
                                />
                                <div id="tysu_cfPassHelp">
                                    {fieldErrors.confirmPassword}
                                </div>
                            </td>
                        </tr>
                        <tr className="tysu_tr tysu_last">
                            <th></th>
                            <td>
                                <Form.Check
                                    type="checkbox"
                                    id="tysu_iAgree"
                                    style={{
                                        textAlign: 'left',
                                        marginLeft: '1.8rem',
                                    }}
                                >
                                    <Form.Check.Input
                                        type="checkbox"
                                        name="checkbox"
                                        value={fields.checkbox}
                                        checked={fields.checkbox}
                                        onChange={() => {
                                            if (fields.checkbox) {
                                                setFields({
                                                    ...fields,
                                                    checkbox: false,
                                                })
                                            } else {
                                                setFields({
                                                    ...fields,
                                                    checkbox: true,
                                                })
                                            }
                                        }}
                                    />
                                    <Form.Check.Label>
                                        我同意<Link to="#">會員條款與隱私</Link>
                                    </Form.Check.Label>
                                </Form.Check>
                                <div id="tysu_cfPassHelp">
                                    {fieldErrors.checkbox}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>
                                <div className="tysu_logHelp">
                                    <button
                                        id="submit"
                                        className="tysu_btn_sign"
                                    >
                                        註 冊
                                    </button>
                                    <div className="tysu_help">
                                        <Link
                                            to="login"
                                            className="tysu_signText"
                                        >
                                            <i className="fas fa-user-friends"></i>
                                            LOGIN
                                        </Link>
                                    </div>
                                </div>
                                <MemberModal
                                    show={show}
                                    setShow={setShow}
                                    signSuccess={signSuccess}
                                    setSignSuccess={setSignSuccess}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div className="tysu_loginBg">
                <img src="./../img/member/leaf_g.svg" alt="" />
            </div>
        </>
    )
}
export default Signup
