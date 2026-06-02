import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEventHandler } from 'react'
import Styles from './modal-form.module.css'
import Portal, { createContainer } from '../portal/portal'
import { useNavigate } from "react-router-dom";

interface ModalFormProps {
    isVisible?: boolean
    modalContainerId?: string
    onClose?: () => void
    children?: React.ReactNode
}

export const ModalForm: React.FC<ModalFormProps> = ({
    isVisible,
    modalContainerId,
    onClose,
    children,
}) => {
    const [isShowModal, setShowModal] = useState(false)
    const navigate = useNavigate();
    React.useEffect(() => {
        document.body.classList.add("overflow-hidden");
    
        return () => {
          document.body.classList.remove("overflow-hidden");
        };
      }, []);
      
      React.useEffect(() => {
        document.body.classList.add("overflow-hidden");
    
        return () => {
          document.body.classList.remove("overflow-hidden");
        };
      }, []);

    useEffect(() => {
        createContainer({ id: modalContainerId })
        setShowModal(true)
    }, [])

    const handleClose: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            if (onClose) {
                onClose()
                return
            }
            navigate(-1)
        }, [navigate, onClose])

    return isShowModal ? (
        <Portal id={modalContainerId}>
            <div className={Styles.wrap}>
                <div className={Styles.content}>
                    <div className={Styles.header}>
                        <button
                            type="button"
                            className={Styles.closeButton}
                            onClick={handleClose}
                        >
                            Х
                        </button>
                    </div>
                    <div className={Styles.middle}>{children}</div>
                </div>
            </div>
        </Portal>
    ) : null
}
