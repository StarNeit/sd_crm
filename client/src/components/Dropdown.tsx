import React, { useMemo, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { ChevronDown, CheckIcon } from "lucide-react"
import clsx from 'clsx'

export type DropdownOption = {
    id: string | number;
    name: string;
}

type Props = {
    options: Array<DropdownOption>,
    onChange: (value: DropdownOption | null) => void,
}

const Dropdown: React.FC<Props> = ({ options, onChange }) => {
    const [query, setQuery] = useState<string>('');
    const [selected, setSelected] = useState<DropdownOption | null>(null);

    const filteredPeople = useMemo(() => {
       return options.filter((option) => option.name.toLowerCase().includes(query.toLowerCase()));
    }, [query, options]);

    const handleChangeDropdown = (value: DropdownOption) => {
        setSelected(value);
        onChange(value);
    };

    const handleChangeQuery = (value: string) => {
        setQuery(value);
        if (!value) {
            onChange(null);
        }
    }

    return (
        <Combobox value={selected} onChange={handleChangeDropdown} onClose={() => setQuery('')}>
            <div className="relative">
                <ComboboxInput
                    className={clsx(
                        'w-full rounded-lg border-none  py-1.5 pr-8 pl-3 text-sm/6 h-10',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    displayValue={(person: DropdownOption) => person?.name}
                    onChange={(event) => handleChangeQuery(event.target.value)}
                    placeholder="All"
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <ChevronDown className="size-4" />
                </ComboboxButton>
            </div>

            <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                    'w-[var(--input-width)] rounded-xl p-1 [--anchor-gap:8px] empty:invisible bg-white border border-gray-200',
                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                )}
            >
                {filteredPeople.map((person) => (
                    <ComboboxOption
                        key={person.id}
                        value={person}
                        className="group flex items-center gap-2 rounded-lg py-1.5 px-3 select-none cursor-pointer"
                    >
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible flex-shrink-0" />
                        <div className="text-sm/6 truncate">{person.name}</div>
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    )
}

export default Dropdown;
