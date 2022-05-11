import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import './../members/tysu.scss'
import './../members/members.css'
import Config from './Config'
import { useState } from 'react'

function MembersConfirm() {
    const location = useLocation()

    // query string
    const [searchId, setSearchId] = useState('')

    // 顯示標題
    const [confirmText, setConfirmText] = useState('')
    // 顯示登入 / 加入
    const [enterText, setEnterText] = useState('')

    useEffect(() => {
        const usp = new URLSearchParams(location.search)
        const id = usp.get('id')
        // console.log(id);
        if (id !== '') {
            setSearchId(id)
        }
        const confirmMember = async () => {
            const r = await fetch(Config.TYSU_CONFIRM + '?id=' + id, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + id,
                    'Content-Type': 'application/json',
                    body: JSON.stringify({
                        check_code: id,
                        check_email: 1,
                    }),
                },
            })
            const obj = await r.json()

            if (obj.success) {
                setConfirmText(obj.info || 'WELCOME　TO　JOIN　US')
                setEnterText('登入')
            } else {
                setConfirmText(obj.error || '尚未加入會員')
                setEnterText('加入')
            }
        }

        confirmMember()
    }, [])

    return (
        <>
            <div className="tysu_contain">
                <h2 className="tysu_h1" style={{ paddingBottom: '0' }}>
                    {confirmText}
                </h2>
                <h2 className="tysu_h1 tysu_enter_h1">
                    {enterText === '登入' && (
                        <Link to="/members/login" className="tysu_enter">
                            立即{enterText}
                        </Link>
                    )}
                    {enterText === '加入' && (
                        <Link to="/members/signup" className="tysu_enter">
                            立即{enterText}
                        </Link>
                    )}
                </h2>
            </div>
        </>
    )
}

export default MembersConfirm
