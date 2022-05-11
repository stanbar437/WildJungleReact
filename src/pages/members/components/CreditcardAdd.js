import React, { useState } from 'react'
import Cards from 'react-credit-cards'

// import './components/members/styles.scss'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from './utils'

import 'react-credit-cards/es/styles-compiled.css'
import Config from '../Config'

export default class CreditcardAdd extends React.Component {
    constructor(props) {
        super(props)
        this.inputElement = React.createRef()
    }
    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: null,
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer })
        }
    }

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        })
    }

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value)
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value)
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value)
        }

        this.setState({ [target.name]: target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { issuer } = this.state
        const formData = [...e.target.elements]
            .filter((d) => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value
                return acc
            }, {})

        this.setState({ formData })
        //   this.form.reset();
        // console.log(formData)
        await fetch(Config.TYSU_CREDITCARD_ADD, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then((obj) => {
                // console.log(obj);
                if (obj.success) {
                    const newCredit = {
                        ...JSON.parse(
                            localStorage.getItem('wildjungle_creditcard'),
                            { ...formData }
                        ),
                    }
                    localStorage.setItem(
                        'wildjungle_creditcard',
                        JSON.stringify(newCredit)
                    )
                    // console.log(newCredit)

                    let newAr = Object.keys(newCredit).map((v) => newCredit[v])
                    // console.log(newAr)
                    // this.props.setLocalCredit(newAr);
                    newAr.unshift({
                        credit_sid: obj.info,
                        credit_num: formData.number,
                        credit_name: formData.name,
                        credit_date: formData.expiry,
                        credit_code: parseInt(formData.cvc),
                    })
                    // console.log(newAr)
                    this.props.setCreditData(newAr)

                    this.props.getCreditDataAgain()
                    this.props.setShowTable(true)
                    this.props.setShowAdd(false)
                }
            })
    }

    render() {
        const { name, number, expiry, cvc, focused, issuer, formData } =
            this.state

        return (
            <div key="Payment">
                <div className="App-payment">
                    <Cards
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                        callback={this.handleCallback}
                    />
                </div>
                <form
                    ref={(c) => (this.form = c)}
                    id="tysu_form"
                    style={{ maxWidth: '830px', margin: '0 auto' }}
                    onSubmit={this.handleSubmit}
                >
                    <table>
                        <tbody>
                            <tr className="tysu_tr">
                                <th>
                                    <label htmlFor="tysu_creditCard">
                                        信用卡卡號
                                        <br />
                                        <span className="tysu_titleSpan">
                                            Credit Card Number
                                        </span>
                                    </label>
                                </th>
                                <td>
                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            name="number"
                                            id="tysu_creditCard"
                                            className="form-control tysu_input tysu_creditInput"
                                            placeholder="Card Number"
                                            pattern="[\d| ]{16,22}"
                                            required
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr className="tysu_tr">
                                <th>
                                    <label htmlFor="tysu_Cardname">
                                        持卡人姓名
                                        <br />
                                        <span className="tysu_titleSpan">
                                            Cardholder Name
                                        </span>
                                    </label>
                                </th>
                                <td>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            id="tysu_Cardname"
                                            className="form-control tysu_input"
                                            placeholder="Name"
                                            required
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr className="tysu_tr">
                                <th>
                                    <label htmlFor="tysu_expireDate">
                                        有效日期
                                        <br />
                                        <span className="tysu_titleSpan">
                                            Card Valid Thru
                                        </span>
                                    </label>
                                </th>
                                <td className="tysu_expireDateList">
                                    <div className="row">
                                        <div className="col-12">
                                            <input
                                                type="tel"
                                                name="expiry"
                                                id="tysu_expireDate"
                                                className="form-control tysu_input tysu_code"
                                                placeholder="Valid Thru"
                                                pattern="\d\d/\d\d"
                                                required
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                onFocus={this.handleInputFocus}
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="tysu_tr tysu_last">
                                <th>
                                    <label htmlFor="tysu_code">
                                        檢查碼
                                        <br />
                                        <span className="tysu_titleSpan">
                                            Card Vaildation Code
                                        </span>
                                    </label>
                                </th>
                                <td className="tysu_expireDateList">
                                    <div className="row">
                                        <div className="col-12">
                                            <input
                                                type="tel"
                                                name="cvc"
                                                id="tysu_code"
                                                className="form-control tysu_input tysu_code"
                                                placeholder="CVC"
                                                pattern="\d{3,4}"
                                                required
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                onFocus={this.handleInputFocus}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="hidden"
                                        name="issuer"
                                        value={issuer}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="tysu_btnGroup" style={{ left: '5rem' }}>
                        <button
                            type="submit"
                            id="tysu_editBtn"
                            className="tysu_editBtn"
                        >
                            儲 存
                        </button>
                        <button
                            id="tysu_cancelBtn"
                            className="tysu_cancelBtn"
                            onClick={(e) => {
                                // console.log(this.render()._self)
                                this.props.setShowTable(true)
                                this.props.setShowAdd(false)
                            }}
                        >
                            取 消
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
