import { useState, useEffect } from 'react'

// Usage
function App() {
    // Similar to useState but first arg is key to the value in local storage.
    const [name, setName] = useLocalStorage('name', 'Bob')

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
    )
}

// // Hook
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        let item = initialValue
        if (typeof window !== 'undefined') {
            item = window.localStorage.getItem(key)
        }
        return item ? JSON.parse(item) : initialValue
    })

    const setValue = (value) => {
        if (typeof window !== 'undefined') {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value
            // Save state
            setStoredValue(valueToStore)
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
    }

    return [storedValue, setValue]
}

export default useLocalStorage
