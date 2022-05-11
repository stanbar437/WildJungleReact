import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Config from '../Config'

import MemberInfo from './MemberInfo'
import GradeInfo from './GradeInfo'
import Creditcard from './Creditcard'
import AddressAdd from './AddressAdd'
import OrderInfo from './OrderInfo'
import OrderTicket from './OrderTicket'
import OrderCancel from './OrderCancel'
import ConvenienceStore from './ConvenienceStore'
import ConvenienceStoreAdd from './ConvenienceStoreAdd'
import DiscountPoints from './DiscountPoints'
import DiscountTicket from './DiscountTicket'
import ProductLike from './ProductLike'
import ActivityLike from './ActivityLike'

// navItem=['基本設定','分級資訊','信用卡管理','常用資訊']
// orderNavItem=['訂單查詢','票券查詢','訂單退換貨','配送設定']
// discountNavItem=['紅利','折價券']
// likeNavItem=['商品','活動']

function MemberNavItem(props) {
    const {
        memberlist,
        account,
        navItem,
        orderNavItem,
        discountNavItem,
        likeNavItem,
        actived,
        setNavState,
        navState,
        sidData,
        setSidData,
        creditData,
        setCreditData,
        pointData,
        setPointData,
        user711Data,
        setUser711Data,
        likeAddCard,
        setLikeAddCart,
        likeListData,
        setLikeListData,
    } = props

    const [navActived, setNavActived] = useState(navState)
    // {navItem:'基本設定',orderNavItem:'訂單查詢',discountNavItem:'紅利',likeNavItem:'商品'}
    const sid = JSON.parse(localStorage.getItem('admin_account'))

    // 點選navItem[0]重新抓取資料庫資料
    const [dataAgain, setDataAgain] = useState({})

    const credit = JSON.parse(localStorage.getItem('wildjungle_creditcard'))
    const [localCredit, setLocalCredit] = useState(credit)

    const getSidDataAgain = async () => {
        const r = await fetch(Config.TYSU_MEMBER_INFO + `${sid.m_sid}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_token'),
                'Content-Type': 'application/json',
            },
        })
        const obj = r.json()
        setSidData(obj.info)
    }
    const getCreditDataAgain = async () => {
        const r = await fetch(Config.TYSU_CREDITCARD_INFO + sid.m_sid, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_token'),
                'Content-Type': 'application/json',
            },
        })
        const obj = r.json()
        if (obj.success) {
            setCreditData(obj.info.list)
            setLocalCredit(obj.info.list)
        }
    }

    return (
        <>
            <ul className="tysu_memberChild">
                {/* props傳入的對象是誰，就渲染哪個nav item；除被點擊的nav item以外，其他nav item不動 */}
                {actived === memberlist[0] &&
                    navItem.map((v, i) => {
                        return (
                            <li
                                key={i}
                                onClick={(e) => {
                                    // console.log(e.target.innerHTML)
                                    if (e.target.innerHTML === v) {
                                        setNavActived({
                                            ...navActived,
                                            navItem: v,
                                        })
                                        setNavState({
                                            ...navState,
                                            navItem: e.target.innerHTML,
                                        })
                                        if (e.target.innerHTML === navItem[0]) {
                                            getSidDataAgain()
                                            // console.log('第一個');
                                        }
                                        if (e.target.innerHTML === navItem[2]) {
                                            getCreditDataAgain()
                                            // console.log('第二個');
                                        }
                                    }
                                }}
                            >
                                <Link to="#" className="tysu_link">
                                    {v}
                                </Link>
                            </li>
                        )
                    })}
                {actived === memberlist[1] &&
                    orderNavItem.map((v, i) => {
                        return (
                            <li
                                key={i}
                                onClick={(e) => {
                                    // console.log(e.target.innerHTML)
                                    if (e.target.innerHTML === v) {
                                        setNavActived({
                                            ...navActived,
                                            orderNavItem: v,
                                        })
                                        setNavState({
                                            ...navState,
                                            orderNavItem: e.target.innerHTML,
                                        })
                                    }
                                }}
                            >
                                <Link to="#" className="tysu_link">
                                    {v}
                                </Link>
                            </li>
                        )
                    })}
                {actived === memberlist[2] &&
                    discountNavItem.map((v, i) => {
                        return (
                            <li
                                key={i}
                                onClick={(e) => {
                                    // console.log(e.target.innerHTML)
                                    if (e.target.innerHTML === v) {
                                        setNavActived({
                                            ...navActived,
                                            discountNavItem: v,
                                        })
                                        setNavState({
                                            ...navState,
                                            discountNavItem: e.target.innerHTML,
                                        })
                                    }
                                }}
                            >
                                <Link to="#" className="tysu_link">
                                    {v}
                                </Link>
                            </li>
                        )
                    })}
                {actived === memberlist[3] &&
                    likeNavItem.map((v, i) => {
                        return (
                            <li
                                key={i}
                                onClick={(e) => {
                                    // console.log(e.target.innerHTML)
                                    if (e.target.innerHTML === v) {
                                        setNavActived({
                                            ...navActived,
                                            likeNavItem: v,
                                        })
                                        setNavState({
                                            ...navState,
                                            likeNavItem: e.target.innerHTML,
                                        })
                                    }
                                }}
                            >
                                <Link to="#" className="tysu_link">
                                    {v}
                                </Link>
                            </li>
                        )
                    })}
            </ul>
            <hr className="tysu_hr" />
            <ul className="tysu_focusUnderLine tysu_memberChild">
                {actived === memberlist[0] &&
                    navItem.map((v, i) => {
                        return (
                            <Link
                                to="#"
                                key={i}
                                className={
                                    navState === v || navState.navItem === v
                                        ? 'tysu_link'
                                        : 'tysu_link disabled'
                                }
                            >
                                <li></li>
                            </Link>
                        )
                    })}
                {actived === memberlist[1] &&
                    orderNavItem.map((v, i) => {
                        return (
                            <Link
                                to="#"
                                key={i}
                                className={
                                    navState === v ||
                                    navState.orderNavItem === v
                                        ? 'tysu_link'
                                        : 'tysu_link disabled'
                                }
                            >
                                <li></li>
                            </Link>
                        )
                    })}
                {actived === memberlist[2] &&
                    discountNavItem.map((v, i) => {
                        return (
                            <Link
                                to="#"
                                key={i}
                                className={
                                    navState === v ||
                                    navState.discountNavItem === v
                                        ? 'tysu_link'
                                        : 'tysu_link disabled'
                                }
                            >
                                <li></li>
                            </Link>
                        )
                    })}
                {actived === memberlist[3] &&
                    likeNavItem.map((v, i) => {
                        return (
                            <Link
                                to="#"
                                key={i}
                                className={
                                    navState === v || navState.likeNavItem === v
                                        ? 'tysu_link'
                                        : 'tysu_link disabled'
                                }
                            >
                                <li></li>
                            </Link>
                        )
                    })}
                <img
                    className="tysu_bg"
                    src="./../img/member/flower.svg"
                    alt=""
                />
            </ul>

            {/* memberlist && 當前狀態的nav item皆符合才會渲染 */}
            {actived === memberlist[0] && navState.navItem === navItem[0] ? (
                <MemberInfo
                    navActived={navActived}
                    navItem={navItem}
                    account={account}
                    sidData={sidData}
                    setSidData={setSidData}
                    dataAgain={dataAgain}
                    setDataAgain={setDataAgain}
                />
            ) : (
                ''
            )}
            {actived === memberlist[0] && navState.navItem === navItem[1] ? (
                <GradeInfo navActived={navActived} navItem={navItem} />
            ) : (
                ''
            )}
            {actived === memberlist[0] && navState.navItem === navItem[2] ? (
                <Creditcard
                    navActived={navActived}
                    navItem={navItem}
                    creditData={creditData}
                    setCreditData={setCreditData}
                    getCreditDataAgain={getCreditDataAgain}
                    localCredit={localCredit}
                    setLocalCredit={setLocalCredit}
                />
            ) : (
                ''
            )}
            {actived === memberlist[0] && navState.navItem === navItem[3] ? (
                <AddressAdd navActived={navActived} navItem={navItem} />
            ) : (
                ''
            )}
            {actived === memberlist[1] &&
            navState.orderNavItem === orderNavItem[0] ? (
                <OrderInfo
                    navActived={navActived}
                    orderNavItem={orderNavItem}
                />
            ) : (
                ''
            )}
            {actived === memberlist[1] &&
            navState.orderNavItem === orderNavItem[1] ? (
                <OrderTicket
                    navActived={navActived}
                    orderNavItem={orderNavItem}
                />
            ) : (
                ''
            )}
            {actived === memberlist[1] &&
            navState.orderNavItem === orderNavItem[2] ? (
                <OrderCancel
                    navActived={navActived}
                    orderNavItem={orderNavItem}
                />
            ) : (
                ''
            )}
            {actived === memberlist[1] &&
            navState.orderNavItem === orderNavItem[3] ? (
                <ConvenienceStore
                    navActived={navActived}
                    orderNavItem={orderNavItem}
                    user711Data={user711Data}
                    setUser711Data={setUser711Data}
                />
            ) : (
                ''
            )}
            {actived === memberlist[2] &&
            navState.discountNavItem === discountNavItem[0] ? (
                <DiscountPoints
                    navActived={navActived}
                    discountNavItem={discountNavItem}
                    pointData={pointData}
                    setPointData={setPointData}
                />
            ) : (
                ''
            )}
            {actived === memberlist[2] &&
            navState.discountNavItem === discountNavItem[1] ? (
                <DiscountTicket
                    navActived={navActived}
                    discountNavItem={discountNavItem}
                />
            ) : (
                ''
            )}
            {actived === memberlist[3] &&
            navState.likeNavItem === likeNavItem[0] ? (
                <ProductLike
                    navActived={navActived}
                    likeNavItem={likeNavItem}
                    likeAddCard={likeAddCard}
                    setLikeAddCart={setLikeAddCart}
                    likeListData={likeListData}
                    setLikeListData={setLikeListData}
                />
            ) : (
                ''
            )}
            {actived === memberlist[3] &&
            navState.likeNavItem === likeNavItem[1] ? (
                <ActivityLike
                    navActived={navActived}
                    likeNavItem={likeNavItem}
                />
            ) : (
                ''
            )}
        </>
    )
}
export default MemberNavItem
