import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'

const CustomSelect = ({ data, name }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [focusedIndex, setFocusedIndex] = useState(null)

    const dropdownRef = useRef(null)

    // Close the dropdown if a click outside of it is detected
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false)
            }
        }

        // Attach event listener
        document.addEventListener('mousedown', handleClickOutside)

        // Clean up the event listener when component is unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const filteredOptions = data.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
        setDropdownOpen(true) // Open dropdown when user starts typing
    }
    const handleClick = () => {
        
        setDropdownOpen(true) // Open dropdown when user starts typing
    }

    const handleSelect = (option) => {
        setSelectedOption(option.label)
        setSearchTerm(option.label) // Optionally set the search term to the selected value
        setDropdownOpen(false) // Close the dropdown after selecting
    }

    const handleKeyDown = (e) => {
        console.log('in handledydown')
        if (!isDropdownOpen) return
        console.log(e.key)

        switch (e.key) {
            case 'ArrowDown':
                setFocusedIndex((prevIndex) => {
                    console.log(
                        prevIndex === null ||
                            prevIndex === filteredOptions.length - 1
                    )
                    if (
                        prevIndex === null ||
                        prevIndex === filteredOptions.length - 1
                    ) {
                        return 0 // Go to the first item if we're at the end
                    }
                    return prevIndex + 1
                })
                break
            case 'ArrowUp':
                setFocusedIndex((prevIndex) => {
                    if (prevIndex === null || prevIndex === 0) {
                        return filteredOptions.length - 1 // Go to the last item if we're at the beginning
                    }
                    return prevIndex - 1
                })
                break
            case 'Enter':
                if (focusedIndex !== null) {
                    handleSelect(filteredOptions[focusedIndex])
                }
                break
            default:
                break
        }
    }

    return (
        <div className="w-full relative">
            <Input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={`${name}`}
                className="w-full"
                onKeyDown={handleKeyDown}
                onClick={handleClick}
            />
            {isDropdownOpen && (
                <ul
                    ref={dropdownRef}
                    className="ulcls w-full"
                    style={{
                        opacity: isDropdownOpen ? 1 : 0, // Smooth fade in/out
                        visibility: isDropdownOpen ? 'visible' : 'hidden',
                    }}
                >
                    {filteredOptions.map((option, index) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            style={{
                                padding: '5px',
                                cursor: 'pointer',
                                backgroundColor:
                                    focusedIndex === index
                                        ? '#ddd'
                                        : 'transparent', 
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
            {/* {selectedOption && <p>Selected: {selectedOption}</p>} */}
        </div>
    )
}

export default CustomSelect
