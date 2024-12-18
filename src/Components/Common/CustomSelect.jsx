import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { FormControl } from '../ui/form'

const CustomSelect = ({ data, placeholder, field }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [focusedIndex, setFocusedIndex] = useState(null)
    const [filteredOptions, setFilterOption] = useState(data)

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

    // const filteredOptions = data.filter((option) =>
    //     option.label.toLowerCase().includes(searchTerm.toLowerCase())
    // )

    const handleChange = (e) => {
        console.log('field : ', field)
        // setSearchTerm()
        setFilterOption(
            data.filter((option) =>
                option.label
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            )
        )
        setDropdownOpen(true) // Open dropdown when user starts typing
    }
    const handleClick = () => {
        console.log('field : ', field)
        setDropdownOpen(true) // Open dropdown when user starts typing
    }

    const handleSelect = (option) => {
        field['value'] = option['label']
        setSearchTerm(option.label) // Optionally set the search term to the selected value
        setDropdownOpen(false) // Close the dropdown after selecting
    }

    const handleKeyDown = (e) => {
        if (!isDropdownOpen) return

        switch (e.key) {
            case 'ArrowDown':
                setFocusedIndex((prevIndex) => {
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
            {/* <FormControl> */}
            <Input
                type="text"
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full"
                onKeyDown={handleKeyDown}
                onClick={handleClick}
                {...field}
            />
            {/* </FormControl> */}
            {isDropdownOpen && (
                <ul
                    ref={dropdownRef}
                    className="ulcls w-full"
                    style={{
                        opacity: isDropdownOpen ? 1 : 0, // Smooth fade in/out
                        visibility: isDropdownOpen ? 'visible' : 'hidden',
                    }}
                >
                    {console.log('filteredOptions : ', filteredOptions)}
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
