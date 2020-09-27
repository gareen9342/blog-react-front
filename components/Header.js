import React from 'react'

import useDarkMode from 'use-dark-mode'
import { Switch } from 'antd'

const Header = () => {
    const darkMode = useDarkMode(true)
    return (
        <div className="header" style={{ height: 60 + 'px' }}>
            <Switch
                defaultChecked
                checked={darkMode.value}
                onChange={darkMode.toggle}
            />
            {console.log(darkMode)}
            <button type="button" onClick={darkMode.enable}>
                ☾
            </button>
        </div>
    )
}

export default Header
