import { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

const SearchableDropdown = ({
    options,
    label,
    selectedVal,
    handleChange,
    placeholder,
    field,
    className
}) => {
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        console.log("options label",options,label)
        document.addEventListener('click', toggle)
        return () => document.removeEventListener('click', toggle)
    }, [])

    const selectOption = (option) => {
        setQuery(() => '')
        handleChange(option[label])
       
        setIsOpen((isOpen) => !isOpen)
    }

    function toggle(e) {
        setIsOpen(e && e.target === inputRef.current)
    }

    const getDisplayValue = () => {
        if (query) return query
        if (selectedVal) return selectedVal

        return ''
    }

    const filter = (options) => {
        return options.length>0 && options.filter(
            (option) =>
                option[label]?.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    return (
        <div className="dropdownx">
            <div className="control">
                <div className="selected-value">
                    <input
                        ref={inputRef}
                        type="text"
                        {...field}
                        value={getDisplayValue()}
                        name="searchTerm"
                        onChange={(e) => {
                            setQuery(e.target.value)
                            handleChange("")
                           
                        }}
                        placeholder={placeholder}
                        onClick={toggle}
                        autoComplete='off'
                        className={cn(
                            `flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 ${className}`
                        )}
                    />
                </div>
            </div>

            <div className={`options ${isOpen ? 'open' : ''}`}>
                {options.length > 0 ? filter(options).map((option, index) => {
                    return (
                        <div
                            onClick={() => selectOption(option)}
                            className={`option ${
                                option[label] === selectedVal
                                    ? 'selected'
                                    : ''
                            }`}
                            key={`${index}`}
                        >
                            {option[label]}
                        </div>
                    )}):(<div
                            onClick={() => selectOption("No Data found")}
                            className={`option selected`}
                            
                        >
                           No data found
                        </div>)
                    
                }
            </div>
        </div>
    )
}

export default SearchableDropdown
