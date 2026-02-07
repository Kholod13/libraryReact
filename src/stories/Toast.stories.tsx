import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, type ToastProps} from '../components/Toast/Toast';

const meta: Meta<typeof Toast> = {
    title: 'Feedback/Toast',
    component: Toast,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Interactive trigger
const ToastTrigger = (args: ToastProps) => {
    const [show, setShow] = useState(false);
    return (
        <div className="h-[200px]">
            <button
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
                onClick={() => setShow(true)}
            >
                Show message
            </button>
            <Toast {...args} isVisible={show} onClose={() => setShow(false)} />
        </div>
    );
};

export const Success: Story = {
    render: (args) => <ToastTrigger {...args} />,
    args: {
        type: 'success',
        message: 'Data successfully save!',
        duration: 3000,
    },
};

export const Error: Story = {
    render: (args) => <ToastTrigger {...args} />,
    args: {
        type: 'error',
        message: 'File download error.',
        duration: 5000,
    },
};

export const Infinite: Story = {
    render: (args) => <ToastTrigger {...args} />,
    args: {
        type: 'info',
        message: 'This message without auto closing.',
        duration: 0, //without auto closing
    },
};