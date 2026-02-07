import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import '../../App.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    clearable?: boolean;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
                                                label,
                                                type = 'text',
                                                clearable,
                                                error,
                                                value,
                                                onChange,
                                                className,
                                                ...props
                                            }) => {
    // State for showing input
    const [showPassword, setShowPassword] = useState(false);

    // input type
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    // Function clearing input
    const handleClear = () => {
        if (onChange) {
            const event = {
                target: { value: '' },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(event);
        }
    };

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {/* Label */}
            {label && (
                <label className="text-sm font-medium text-gray-200 ml-1">
                    {label}
                </label>
            )}

            <div className="relative group">
                {/* Input */}
                <input
                    {...props}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    className={`
            w-full px-4 py-2 bg-slate-800 border-2 rounded-xl outline-none transition-all text-white
            ${error ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'}
            ${(clearable || isPassword) ? 'pr-12' : ''} 
          `}
                />

                {/* Buttons Block */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400">

                    {/* Button clearable */}
                    {clearable && value && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}

                    {/* Button Eye for showing password */}
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Error message */}
            {error && <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>}
        </div>
    );
};