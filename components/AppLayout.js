import React from 'react'

import useDarkMode from 'use-dark-mode'
import { Switch } from 'antd'
const AppLayout = ({ children }) => {
    const darkMode = useDarkMode(false)
    return (
        <div>
            <header>
                {' '}
                menus
                <div>
                    {/* <button type="button" onClick={darkMode.disable}>
                        disable darkmode
                    </button> */}
                    <Switch
                        defaultChecked
                        checked={darkMode.value}
                        onChange={darkMode.toggle}
                    />
                    <button type="button" onClick={darkMode.enable}>
                        ☾
                    </button>
                </div>
            </header>
            {children}
            <div>akjdhaksdalk</div>
        </div>
    )
}

AppLayout.propTypes = {}

export default AppLayout
