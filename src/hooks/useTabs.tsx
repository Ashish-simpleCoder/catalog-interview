import { useCallback, useState } from "react"

export default function useTabs<T extends Array<any>>(initialList: T) {
    const [tabs, setTabs] = useState({
        list: initialList,
        activeTabIndex: 0
    })

    const updateTabIndex = useCallback((idx: number) => {
        setTabs((tabs) => {
            tabs.activeTabIndex = idx
            return { ...tabs }
        })
    }, [])



    return { tabs, activeTabIndex: tabs.activeTabIndex, setTabs, updateTabIndex }
}