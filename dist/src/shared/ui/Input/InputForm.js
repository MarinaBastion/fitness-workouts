var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useLayoutEffect, useRef, useState, } from 'react';
import clsx from 'clsx';
import s from './InputForm.module.css';
export const InputForm = forwardRef((_a, ref) => {
    var { label, error, minWidth = 40, maxWidth = 1000, className, wrapperClassName, value: controlledValue, defaultValue, onChange } = _a, rest = __rest(_a, ["label", "error", "minWidth", "maxWidth", "className", "wrapperClassName", "value", "defaultValue", "onChange"]);
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue !== null && defaultValue !== void 0 ? defaultValue : '');
    const value = isControlled ? controlledValue : uncontrolledValue;
    const inputRef = useRef(null);
    const spanRef = useRef(null);
    // пробрасываем ref наружу
    const setRefs = (node) => {
        inputRef.current = node;
        if (typeof ref === 'function')
            ref(node);
        else if (ref)
            ref.current = node;
    };
    useLayoutEffect(() => {
        debugger;
        if (!spanRef.current || !inputRef.current)
            return;
        const width = spanRef.current.offsetWidth;
        const clamped = Math.min(Math.max(width, minWidth), maxWidth);
        inputRef.current.style.width = `${clamped}px`;
    }, [value, minWidth, maxWidth]);
    const handleChange = (e) => {
        if (!isControlled) {
            setUncontrolledValue(e.target.value);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(e);
    };
    return (_jsxs("div", { className: clsx(s.autoWrapper, wrapperClassName), children: [label && _jsx("label", { children: label }), _jsx("span", { ref: spanRef, className: s.autoSizer, children: value || ' ' }), _jsx("input", Object.assign({}, rest, { ref: setRefs, value: value, onChange: handleChange, className: clsx(s.autoInput, className) })), error && _jsx("span", { style: { color: 'red' }, children: error })] }));
});
