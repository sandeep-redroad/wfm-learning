import React, { useState, useRef, useEffect } from 'react'

const CustomSelect = ({ data, placeholder, field }) => {
    const [searchTerm, setSearchTerm] = useState('')  // Store the search term
    const [filteredOptions, setFilteredOptions] = useState(data)  // Store filtered options
    const [isDropdownOpen, setDropdownOpen] = useState(false)  // State to manage dropdown visibility
    const [focusedIndex, setFocusedIndex] = useState(null)  // Manage keyboard navigation (up/down)
    
    const dropdownRef = useRef(null)  // To detect clicks outside the dropdown and close it

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Filter the options based on the search term
    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)  // Update the search term
        // Filter the options based on the search term
        setFilteredOptions(
            data.filter(option =>
                option.label.toLowerCase().includes(value.toLowerCase()) // Case-insensitive match
            )
        )
        setDropdownOpen(true)  // Open the dropdown when the user starts typing
    }

    const handleSelect = (option) => {
        field.onChange(option.label)  // Set the value of the input field
        setSearchTerm(option.label)  // Set the search term to the selected option
        setDropdownOpen(false)  // Close the dropdown after selection
    }

    const handleKeyDown = (e) => {
        if (!isDropdownOpen) return

        switch (e.key) {
            case 'ArrowDown':
                setFocusedIndex((prevIndex) => {
                    if (prevIndex === null || prevIndex === filteredOptions.length - 1) {
                        return 0  // Move to the first item if we're at the end
                    }
                    return prevIndex + 1
                })
                break
            case 'ArrowUp':
                setFocusedIndex((prevIndex) => {
                    if (prevIndex === null || prevIndex === 0) {
                        return filteredOptions.length - 1  // Move to the last item if we're at the beginning
                    }
                    return prevIndex - 1
                })
                break
            case 'Enter':
                if (focusedIndex !== null) {
                    handleSelect(filteredOptions[focusedIndex])  // Select the option on Enter
                }
                break
            default:
                break
        }
    }

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded"
                {...field}  // This ensures the input is controlled by React Hook Form
            />
            
            {isDropdownOpen && filteredOptions.length > 0 && (
                <ul
                    ref={dropdownRef}
                    className="absolute w-full bg-white shadow-lg mt-1 max-h-60 overflow-auto z-10"
                    style={{ top: '100%' }}
                >
                    {filteredOptions.map((option, index) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            onMouseEnter={() => setFocusedIndex(index)}
                            onMouseLeave={() => setFocusedIndex(null)}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                backgroundColor: focusedIndex === index ? '#e0e0e0' : 'transparent',
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}

            {/* If there are no results, show "No results found" */}
            {isDropdownOpen && filteredOptions.length === 0 && (
                <div className="absolute w-full bg-white shadow-lg mt-1 z-10">
                    <p className="p-2 text-center text-gray-500">No results found</p>
                </div>
            )}
        </div>
    )
}

export default CustomSelect
