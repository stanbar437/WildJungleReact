import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

function MemberModal(props) {
    const history = useHistory()
    // const [close, setClose] = useState(false);
    const { show, setShow, success, signSuccess, setSignSuccess } = props

    const handleClose = () => {
        if (signSuccess.includes('成功註冊')) {
            setShow(false)
            history.push('/members/login')
        } else {
            setShow(false)
        }
    }

    // 判斷網址列字串
    const signUrl = new URLSearchParams(window.location.href).toString()
    // console.log(signUrl.includes('signup'))

    return (
        <>
            {/* <Button style={{paddingTop:"10rem"}} variant="primary">
        Launch static backdrop modal
      </Button> */}

            <Modal
                size="sm"
                // size='lg'
                show={show}
                // onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                {/* 網址列有 signup 才顯示 Modal.Header */}
                {signUrl.includes('signup') && (
                    <Modal.Header>
                        <Modal.Title className="tysu_modalTitle">
                            提醒!
                        </Modal.Title>
                        <button
                            type="button"
                            className="tysu_modalBtn"
                            onClick={handleClose}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </Modal.Header>
                )}
                <Modal.Body className="tysu_modal">
                    {success}
                    {signSuccess}
                </Modal.Body>
                {/* <Modal.Footer>
          <Button variant="secondary">
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
            </Modal>
        </>
    )
}

export default MemberModal
