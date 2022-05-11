import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'

function EditModal(props) {
    // const [close, setClose] = useState(false);
    const location = useLocation()
    const history = useHistory()

    const {
        editModalShow,
        setEditModalShow,
        editModalText,
        editCardModalText,
        forgotModalText,
        forgotPassText,
        setShowAdd,
        setShowTable,
        setEditShow,
    } = props

    const handleClose = () => {
        setEditModalShow(false)
        if (forgotPassText === '已更改成功，請重新登入') {
            setShowAdd(false)
            setShowTable(true)
            history.push('/members/login')
        }
        if (
            editCardModalText === '修改成功' ||
            editCardModalText === '沒有變更'
        ) {
            setEditShow(false)
            setShowTable(true)
        }
    }

    return (
        <>
            <Modal
                show={editModalShow}
                onHide={handleClose}
                animation={false}
                centered
            >
                <Modal.Body className="tysu_editModal">
                    {editModalText}
                    {forgotModalText}
                    {forgotPassText}
                    {editCardModalText}
                </Modal.Body>
                <Modal.Footer className="tysu_editModalFooter">
                    <Button className="tysu_editModalBtn" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditModal
