import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import '../../App.css'

export interface MenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    items: MenuItem[];
}

export const SidebarMenu: React.FC<SidebarProps> = ({ isOpen, onClose, items }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-md cursor-pointer"
                    />

                    {/* Menu */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 z-[101] h-full w-[320px] bg-slate-900 border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-8 border-b border-white/5">
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">Project Menu</h2>
                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Navigation Center</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Elements list */}
                        <nav className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
                            <div className="flex flex-col gap-1">
                                {items.map((item) => (
                                    <SidebarItem key={item.id} item={item} level={0} />
                                ))}
                            </div>
                        </nav>

                        {/* Footer menu */}
                        <div className="p-6 bg-slate-950/50 border-t border-white/5 text-center">
                            <p className="text-[10px] text-slate-600">v1.0.4 • developstoday-test</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const SidebarItem: React.FC<{ item: MenuItem; level: number }> = ({ item, level }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <div className="w-full">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`
                    flex items-center justify-between w-full p-3 text-left transition-all rounded-xl cursor-pointer group
                    ${isExpanded && hasChildren ? 'bg-white/5 text-blue-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}
                `}
                style={{ paddingLeft: `${(level * 12) + 12}px` }}
            >
                <div className="flex items-center gap-3">
                    {/* no icon logic */}
                    {item.icon ? item.icon : (level > 0 && <div className="w-1 h-1 rounded-full bg-current opacity-40" />)}
                    <span className={`text-sm font-medium ${level === 0 ? 'text-[15px]' : 'text-[14px]'}`}>
                        {item.label}
                    </span>
                </div>

                {hasChildren && (
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 opacity-50 group-hover:opacity-100 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                )}
            </button>

            <AnimatePresence>
                {hasChildren && isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col mt-1 gap-1 border-l border-white/5 ml-4">
                            {item.children?.map((child) => (
                                <SidebarItem key={child.id} item={child} level={level + 1} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};