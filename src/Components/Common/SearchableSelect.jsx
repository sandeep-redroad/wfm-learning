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

const SearchableSelect = ({ data, name }) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen} className="w-full">
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value
                            ? data.find((val) => val.value === value)?.label
                            : `Select ${name}`}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" w-full p-0">
                    <Command className="w-full max-w-2xl min-w-full">
                        <CommandInput
                            placeholder={`Search ${name} `}
                            className=" w-full"
                        />
                        <CommandList>
                            <CommandEmpty>
                                No {name}
                                found.
                            </CommandEmpty>
                            <CommandGroup>
                                {data.map((val) => (
                                    <CommandItem
                                        key={val.value}
                                        value={val.value}
                                        onSelect={(currentValue) => {
                                            setValue(
                                                currentValue === value
                                                    ? ''
                                                    : currentValue
                                            )
                                            setOpen(false)
                                        }}
                                    >
                                        {val.label}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value === val.value
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
        </div>
    )
}

export default React.memo(SearchableSelect)
