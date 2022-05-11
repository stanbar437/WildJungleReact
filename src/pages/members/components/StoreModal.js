import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function StoreModal(props) {
    const { show, setShow, storeModalText, setShowStoreAdd } = props

    const handleClose = () => {
        setShowStoreAdd(false)
        setShow(false)
    }

    return (
        <>
            <Modal
                show={show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="tysu_editModal">
                    <h4>{storeModalText}</h4>
                </Modal.Body>
                <Modal.Footer className="tysu_editModalFooter">
                    <Button
                        className="tysu_editModalBtn tysu_storeModalBtn"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default StoreModal
