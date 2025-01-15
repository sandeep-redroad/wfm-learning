import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import SearchableDropdownTypeEnum from '@/Enums/SearchableDropdownTypeEnum'

const SearchableDropdown = ({ options, label, selectedVal, handleChange, placeholder, field, className, type = '' }) => {
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef(null)
    
    useEffect(() => {
        document.addEventListener('click', toggle)
        return () => document.removeEventListener('click', toggle)
    }, [])

    //console.log("options",label,options)

    const selectOption = (option) => {
        setQuery(() => '')
        if(type in SearchableDropdownTypeEnum){
        // if(type == 'note'||type=='contactPerson'||type=='contactPersonB'){
        //     ["contactPersonB", "note", "contactPerson"].indexOf(type)
            handleChange(option)
        }else{
            handleChange(option[label])
        }

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
        return (
            options.length > 0 &&
            options.filter((option) => {
                return option[label]?.toLowerCase().indexOf(query.toLowerCase()) > -1
            })
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
                            handleChange('')
                        }}
                        placeholder={placeholder}
                        onClick={toggle}
                        autoComplete="off"
                        className={cn(
                            `flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 ${className}`
                        )}
                    />
                </div>
            </div>

            <div className={`options ${isOpen ? 'open' : ''}`}>
                {options.length > 0 ? (
                    filter(options).map((option, index) => {
                        return (
                            <div
                                onClick={() => selectOption(option)}
                                className={`option ${option[label] === selectedVal ? 'selected' : ''}`}
                                key={`${index}`}
                            >
                                {type == 'inoviceProjectListing' ? (
                                    <div className='flex flex-col text-left uppercase'>
                                        <span className=' font-bold'>{option[label]}</span>
                                        <span>{option["process"]}</span>
                                    </div>
                                ) : type == "projectFromInvoice" ? (
                                    <div className='flex flex-col text-left uppercase'>
                                        <span>{option['id']}</span>
                                        <span className='ml-2 text-gray-300'>{option['process']}</span>
                                        <span className='ml-2 text-gray-300'>{option['billingType']}</span>
                                    </div>
                                    
                                ): <span>{option[label]}</span>}
                            </div>
                        )
                    })
                ) : (
                    <div onClick={() => selectOption('No Data found')} className={`option selected`}>
                        No data found
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchableDropdown
