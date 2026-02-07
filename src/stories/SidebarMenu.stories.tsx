import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarMenu } from '../components/SidebarMenu/SidebarMenu';
import { Layout, Settings, Folder, User } from 'lucide-react';
import '../App.css'

const meta: Meta<typeof SidebarMenu> = {
    title: 'Navigation/SidebarMenu',
    component: SidebarMenu,
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

export const Default: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="p-10 bg-slate-100 min-h-[500px]">
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-600 transition-all cursor-pointer"
                >
                    Show Navigation
                </button>
                <SidebarMenu {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        );
    },
    args: {
        items: [
            { id: '1', label: 'Overview', icon: <Layout size={18}/> },
            {
                id: '2',
                label: 'Project Settings',
                icon: <Settings size={18}/>,
                children: [
                    { id: '2-1', label: 'General Info' },
                    {
                        id: '2-2',
                        label: 'Internal Teams',
                        children: [
                            { id: '2-2-1', label: 'Backend Squad' },
                            { id: '2-2-2', label: 'Designers' },
                        ]
                    },
                    { id: '2-3', label: 'API Keys' },
                ]
            },
            { id: '3', label: 'Documents', icon: <Folder size={18}/> },
            { id: '4', label: 'Profile', icon: <User size={18}/> },
        ]
    }
};