import { Field, Switch } from '@headlessui/react';

const ToggleSwitch = ({ label, description, isChecked, onToggle }) => {
    return (
        <Field className="flex items-center justify-between">
            <Switch
                checked={isChecked}
                onChange={onToggle}
                className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#222325] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/25 focus:ring-offset-2 data-[checked]:bg-teal-600"
            >
                <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#121212] shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
            </Switch>
        </Field>
    );
};

export default ToggleSwitch;
