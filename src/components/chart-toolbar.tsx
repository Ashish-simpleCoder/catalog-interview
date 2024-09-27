import { For } from "classic-react-components";
import { MdFullscreenExit } from "react-icons/md";
import { BiPlusCircle } from "react-icons/bi";

import useTabs from "../hooks/useTabs";
import Tab from "./tab";
import { cn } from "../lib/cn";


export default function ChartToolbar() {
    const { tabs, updateTabIndex, activeTabIndex } = useTabs([
        {
            label: "1D",
            value: "1day"
        },
        {
            label: "3d",
            value: "3days"
        },
        {
            label: "1w",
            value: "1week"
        },
        {
            label: "1m",
            value: "1month"
        },
        {
            label: "6m",
            value: "6month"
        },
        {
            label: "1y",
            value: "1year"
        },
        {
            label: "max",
            value: "max"
        },
    ] as const)

    return (
        <div className="flex justify-between flex-wrap">
            <div className="gap-4 flex max-md:mb-3">
                <button className="flex items-center gap-2 text-gray-500">
                    <MdFullscreenExit />
                    <span>Fullscreen</span>
                </button>

                <button className="flex items-center gap-2 text-gray-500">
                    <BiPlusCircle />
                    <span>Compare</span>
                </button>
            </div>

            <div className="flex gap-2">
                <For data={tabs.list} >
                    {({ label }, idx) => {
                        return (
                            <Tab key={label} isActive={activeTabIndex == idx} onClick={() => updateTabIndex(idx)} className={cn('px-3 py-1 rounded-md', activeTabIndex == idx && "bg-purple-600 text-white border-none")}>{label}</Tab>
                        )
                    }}
                </For>
            </div>
        </div>
    )
}