import "../css/modal.css"

const Modal = ({ message, showModal, setShowModal, onOK }) => {
    
    const cancel = () => {
        setShowModal(prev => !prev);
    }

    return (
        <>
            {
                showModal &&
                <div className="modal-overlay">
                    <div className="modal">
                        <p className="modal-message">{message}</p>
                        <div className="modal-action">
                            <button onClick={onOK}>YES</button>
                            <button onClick={cancel}>NO</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal;