import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export interface ToastProps {
    id?: string;
    type: 'success' | 'error' | 'info';
    message: string;
    duration?: number;
    onClose: () => void;
    isVisible: boolean;
}

const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
};

const styles = {
    success: 'bg-slate-900 border-green-500/50 shadow-green-500/10',
    error: 'bg-slate-900 border-red-500/50 shadow-red-500/10',
    info: 'bg-slate-900 border-blue-500/50 shadow-blue-500/10',
};

export const Toast: React.FC<ToastProps> = ({
                                                type,
                                                message,
                                                duration = 3000,
                                                onClose,
                                                isVisible,
                                            }) => {
    // Auto closing
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    // Animation slide-in
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.9, transition: { duration: 0.2 } }}
                    className={`fixed bottom-5 right-5 z-[9999] flex items-center gap-3 min-w-[300px] p-4 border-2 rounded-2xl shadow-2xl backdrop-blur-md ${styles[type]}`}
                >
                    <div className="flex-shrink-0">{icons[type]}</div>

                    <div className="flex-1 text-sm font-medium text-gray-100">
                        {message}
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1 ml-2 text-gray-500 transition-colors rounded-lg hover:text-white hover:bg-white/10"
                    >
                        <X size={16} />
                    </button>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: duration / 1000, ease: "linear" }}
                        className={`absolute bottom-0 left-0 h-1 rounded-full opacity-40 
              ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};