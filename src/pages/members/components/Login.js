import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

// import './members/tysu.scss'
// import './members/members.css'
import MemberModal from './MemberModal'
import Config from '../Config'
import Keys from './../Keys'

function Login(props) {
    const { setAuth, comeUrl, setCommentbox } = props
    const history = useHistory()
    const emailInput = useRef()
    const passInput = useRef()

    const [captchaValue, setCaptchaValue] = useState(null)
    const [userState, setUserState] = useState(false)

    // input欄位
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [passType, setPassType] = useState('password')
    const [visible, setVisible] = useState(false)

    const captcha = useRef(null)

    // Modal 顯示是否成功登入
    const [success, setSuccess] = useState('')
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(true)
    }

    const handleChange = () => {
        if (captcha.current.getValue()) {
            // console.log('我不是機器人');
            setCaptchaValue(true)
        }
    }

    const submitData = async (e) => {
        e.preventDefault()

        if (captcha.current.getValue()) {
            setUserState(true)
            setCaptchaValue(true)

            const r = await fetch(Config.TYSU_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    'g-recaptcha-response': captcha.current.getValue(),
                }),
            })
            const obj = await r.json()
            // console.log(obj)
            if (obj.success) {
                localStorage.setItem(
                    'admin_account',
                    JSON.stringify(obj.account)
                )
                localStorage.setItem('admin_token', obj.token)

                // 傳回頂層登入與否的狀態
                setAuth(true)
                setSuccess('登入成功')
                handleShow()
                setTimeout(() => setShow(false), 1000)
                setTimeout(() => {
                    if (comeUrl === '/carts') {
                        history.goBack()
                    } else if (comeUrl === '/lodging') {
                        setCommentbox(false)
                        history.goBack()
                    } else {
                        history.push('/members/modify-member-info')
                    }
                }, 1500)
            } else {
                setSuccess(obj.error || '帳號或密碼錯誤')
                handleShow()
                setTimeout(() => setShow(false), 1000)
            }
        } else {
            setUserState(false)
            setCaptchaValue(false)
        }
    }

    return (
        <>
            <div className="tysu_contain">
                <h1
                    className="tysu_h1"
                    onClick={(e) => {
                        setEmail(
                            (emailInput.current.value =
                                'wildjungle2022@gmail.com')
                        )
                        setPassword((passInput.current.value = '123456'))
                    }}
                >
                    LOGIN
                </h1>

                <form name="form1" id="tysu_form" onSubmit={submitData}>
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
                                        name="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                    <div id="emailHelp"></div>
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
                                        type={passType}
                                        id="tysu_pass"
                                        className="tysu_input"
                                        name="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                    />
                                    {visible ? (
                                        <i
                                            className="fas fa-eye tysu_see"
                                            onClick={() => {
                                                setPassType('password')
                                                setVisible(false)
                                            }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fas fa-eye-slash tysu_see"
                                            onClick={() => {
                                                setPassType('text')
                                                setVisible(true)
                                            }}
                                        ></i>
                                    )}
                                    <div id="tysu_passHelp"></div>
                                </td>
                            </tr>
                            <tr className="tysu_tr tysu_last">
                                <th></th>
                                <td>
                                    <div className="recaptcha">
                                        <ReCAPTCHA
                                            ref={captcha}
                                            sitekey={Keys.RECAPTCHA_KEY_V2}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div id="tysu_recaptchaHelp">
                                        {captchaValue === false &&
                                            '請完成機器人驗證'}
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
                                            登 入
                                        </button>
                                        <div className="tysu_help">
                                            <Link
                                                to="/members/signup"
                                                className="tysu_signText"
                                            >
                                                <i className="fas fa-user-plus"></i>
                                                SIGN UP
                                            </Link>
                                            <Link
                                                to="/members/forgot"
                                                className="tysu_helpText"
                                            >
                                                <i className="fas fa-question"></i>
                                                HELP
                                            </Link>
                                            <MemberModal
                                                show={show}
                                                setShow={setShow}
                                                success={success}
                                            />
                                        </div>
                                    </div>
                                </td>
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
export default Login
