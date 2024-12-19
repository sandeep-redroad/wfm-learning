import React, { useState } from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const SearchableSelect = ({ frameworks, name, field }) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? frameworks.find(
                              (framework) => framework.value === value
                          )?.label
                        : 'Select framework...'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 dsdsds">
                <Command>
                    <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ''
                                                : currentValue
                                        )
                                        setOpen(false)
                                    }}
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === framework.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SearchableSelect
