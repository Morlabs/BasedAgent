import React, {useState} from 'react';
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react';
import {CheckIcon, ChevronDownIcon} from '@heroicons/react/20/solid';
import clsx from 'clsx';

const TagInputWithCombobox = ({tempOptions = [], tags, setTags, placeholder = 'Select an option'}) => {
	const [query, setQuery] = useState('');
	
	const options = tempOptions.map((position, index) => ({
		id: index,
		name: position,
	}));
	
	const filteredOptions = query === ''
		? options
		: options.filter((option) =>
			option?.name?.toLowerCase().includes(query.toLowerCase())
		);
	
	const handleSelect = (value) => {
		if (!tags.includes(value.name)) {
			setTags([...tags, value.name]);
		}
		setQuery('');
	};
	
	const removeTag = (tagToRemove) => {
		setTags(tags.filter(tag => tag !== tagToRemove));
	};
	
	return (
		<div>
			<div className="relative w-full">
				<Combobox value={tags} onChange={handleSelect} onClose={() => setQuery('')}>
					<div className="relative">
						<ComboboxInput
							className={clsx(
								'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
								'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
							)}
							displayValue={(option) => option?.name || ''}
							onChange={(event) => setQuery(event.target.value)}
							placeholder={placeholder}
						/>
						<ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
							<ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white"/>
						</ComboboxButton>
					</div>
					<ComboboxOptions
						anchor="bottom"
						transition
						className={clsx(
							'w-[var(--input-width)] rounded-xl border border-white/25 bg-[#222325]  p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
							'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 '
						)}
					>
						{filteredOptions.map((option) => (
							<ComboboxOption
								key={option.id}
								value={option}
								className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
							>
								<CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible"/>
								<div className="text-sm/6 text-white">{option.name}</div>
							</ComboboxOption>
						))}
					</ComboboxOptions>
				</Combobox>
			</div>
			<div className="mt-2">
				{tags.map((tag, index) => (
					<span key={index} className="inline-block bg-gray-600 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
						{tag}
						<button
							type="button"
							className="ml-2 text-white"
							onClick={() => removeTag(tag)}
						>
							&times;
						</button>
					</span>
				))}
			</div>
		</div>
	);
};

export default TagInputWithCombobox;
