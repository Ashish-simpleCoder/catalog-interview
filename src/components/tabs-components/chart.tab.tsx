import { useQuery } from "@tanstack/react-query";
import { Else, For, If } from "classic-react-components";
import { BiPlusCircle } from "react-icons/bi";
import { MdFullscreenExit } from "react-icons/md";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

import useTabs from "../../hooks/useTabs";
import { cn } from "../../lib/cn";
import Tab from "../tab";
import Loader from "../ui/loader";

export default function ChartTab() {
    const { tabs, updateTabIndex, activeTabIndex } = useTabs([
        {
            label: "1d",
            value: "TIME_SERIES_DAILY",
            key: 'Time Series (Daily)',
        },
        {
            label: "1w",
            value: "TIME_SERIES_WEEKLY",
            key: 'Weekly Time Series'
        },
        {
            label: "1m",
            value: "TIME_SERIES_MONTHLY",
            key: 'Monthly Time Series'
        },
        {
            label: "6m",
            value: "6month",
            key: '"Monthly Time Series'
        },
        {
            label: "1y",
            value: "1year",
            key: '"Monthly Time Series'
        },
        {
            label: "max",
            value: "max",
            key: '"Monthly Time Series'
        },
    ] as const)


    const { error, isLoading, data: chartData } = useQuery({
        queryKey: ['chartData', tabs.list[activeTabIndex].value, tabs.list[activeTabIndex].key],

        queryFn: async ({ queryKey }) => {
            const filterRange = queryKey[1]
            const res = await fetch(`https://www.alphavantage.co/query?function=${filterRange}&symbol=IBM&apikey=demo`);
            // const res = await fetch('/data.json');
            const data = await res.json();

            const key = queryKey[2]
            return Object.values(data[key]).slice(0, 100).map((details: any) => {
                return {
                    Price: details["2. high"]
                };
            });
        },
        enabled: true
    })


    return (
        <div className="flex flex-col gap-3 mt-6 p-4">
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
                    <For data={tabs.list}>
                        {({ label }, idx) => {
                            return (
                                <Tab key={label} isActive={activeTabIndex == idx} onClick={() => {
                                    updateTabIndex(idx)
                                }} className={cn('px-3 py-1 rounded-md', activeTabIndex == idx && "bg-purple-600 text-white border-none")}>{label}</Tab>
                            )
                        }}
                    </For>
                </div>
            </div>

            <div>
                <If condition={error && !chartData}>
                    <div className='text-red-500'>Something went wrong.</div>
                </If>
                <If condition={isLoading}>
                    <div className="flex w-full justify-center h-[400px] items-center">
                        <Loader />
                    </div>
                    <Else>
                        <ResponsiveContainer width={768} height={400}>
                            <AreaChart
                                data={chartData}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip labelClassName={'hidden'} />
                                <Area dataKey="Price" className='stroke-purple-700 fill-purple-200' fill='' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Else>
                </If>
            </div>

        </div>
    )
}