import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useEffect, useState } from 'react';
import Styles from './modal-form.module.css';
import Portal, { createContainer } from '../portal/portal';
import { useNavigate } from "react-router-dom";
export const ModalForm = ({ isVisible, modalContainerId, onClose, children, }) => {
    const [isShowModal, setShowModal] = useState(false);
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
        createContainer({ id: modalContainerId });
        setShowModal(true);
    }, []);
    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
            return;
        }
        navigate(-1);
    }, [navigate, onClose]);
    return isShowModal ? (_jsx(Portal, { id: modalContainerId, children: _jsx("div", { className: Styles.wrap, children: _jsxs("div", { className: Styles.content, children: [_jsx("div", { className: Styles.header, children: _jsx("button", { type: "button", className: Styles.closeButton, onClick: handleClose, children: "\u0425" }) }), _jsx("div", { className: Styles.middle, children: children })] }) }) })) : null;
};
