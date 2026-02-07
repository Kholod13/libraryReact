import {type ComponentProps, useState} from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../components/Input/Input';

const meta: Meta<typeof Input> = {
    title: 'Inputs/Input',
    component: Input,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

type InputProps = ComponentProps<typeof Input>;

const InteractiveInput = (args: InputProps) => {
    const [value, setValue] = useState(args.value || '');

    return (
        <Input
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export const Password: Story = {
    render: (args) => <InteractiveInput {...args} />,
    args: {
        type: 'password',
        label: 'Input password',
        clearable: true,
        placeholder: 'Enter password...',
    },
};

export const ClearableWithText: Story = {
    render: (args) => <InteractiveInput {...args} />,
    args: {
        type: 'text',
        label: 'Clearable Input',
        clearable: true,
        value: 'Clear it!',
    },
};

export const Default: Story = {
    render: (args) => <InteractiveInput {...args} />,
    args: {
        type: 'number',
        label: 'Number Input',
        clearable: true,
        placeholder: 'Type something...',
    },
};