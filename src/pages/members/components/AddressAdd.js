import React from 'react'

function AddressAdd() {
    return (
        <>
            <table className="tysu_table">
                <tbody>
                    <tr>
                        <th></th>
                        <td>
                            <div className="tysu_creditT">{'尚未設定'}</div>
                        </td>
                    </tr>

                    {/* <tr className="tysu_tr" >
                <th>
                    <div className="tysu_creditDelete">
                        <i className="fas fa-times"></i>
                    </div>
                </th>
                <td className="tysu_addressTitle">
                    <label htmlFor="tysu_address">地址1<br /><span className="tysu_titleSpan">Address1</span></label>
                </td>
                <td>
                    <input type="text" id="tysu_address" className="tysu_input" />
                    <div id="tysu_addressHelp"></div>
                </td>
                <td>
                    <div className="tysu_creditEdit">
                        <i className="fas fa-edit"></i>
                    </div>
                </td>
            </tr>
            <tr className="tysu_tr tysu_last">
                <th>
                    <div className="tysu_creditDelete">
                        <i className="fas fa-times"></i>
                    </div>
                </th>
                <td className="tysu_addressTitle">

                    <label htmlFor="tysu_address">地址2<br /><span className="tysu_titleSpan">Address2</span></label>
                </td>
                <td>
                    <input type="text" id="tysu_address" className="tysu_input" />
                    <div id="tysu_addressHelp"></div>
                </td>
                <td>
                    <div className="tysu_creditEdit">
                        <i className="fas fa-edit"></i>
                    </div>
                </td>
                
            </tr> */}
                </tbody>
            </table>
            <div className="tysu_btnCenter">
                <button id="tysu_addBtn" className="tysu_addBtn">
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        </>
    )
}
export default AddressAdd
