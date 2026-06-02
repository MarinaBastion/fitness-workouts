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
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, } from 'react';
import clsx from 'clsx';
import s from './Button.module.css';
export const Button = forwardRef(function Button(_a, ref) {
    var { children, variant = 'primary', className } = _a, props = __rest(_a, ["children", "variant", "className"]);
    return (_jsx("button", Object.assign({}, props, { ref: ref, className: clsx(s.button, s[`button--${variant}`], className), children: children })));
});
