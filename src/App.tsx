import { useMemo } from "react";
import Tab from "./components/tab";
import useTabs from "./hooks/useTabs";
import { For } from "classic-react-components";
import { cn } from "./lib/cn";

import Summary from "./components/tabs-components/summary.tab";
import ChartTab from "./components/tabs-components/chart.tab";
import StaticsTicsTab from "./components/tabs-components/statistics.tab";
import AnalysisTicsTab from "./components/tabs-components/analysis.tab";
import SettingsTab from "./components/tabs-components/settings.tab";

export default function App() {
   const { tabs, activeTabIndex, updateTabIndex } = useTabs([
      {
         label: "Summary",
         comp: Summary
      },
      {
         label: "Chart",
         comp: ChartTab
      },
      {
         label: "Statistics",
         comp: StaticsTicsTab
      },
      {
         label: "Analysis",
         comp: AnalysisTicsTab
      },
      {
         label: "Settings",
         comp: SettingsTab
      },
   ])
   const ActiveTabComponent = useMemo(() => tabs.list[activeTabIndex].comp, [activeTabIndex])



   return (
      <div className="max-w-screen-md mx-auto mt-5">

         <div className="flex flex-col gap-4 p-4">
            <h1 className='relative'><span className="text-5xl font-semibold">63,179.71</span> <span className='text-md absolute text-gray-400'>USD</span></h1>
            <h2 className='text-green-500'>+ 2,161.42 (3.54%)</h2>
         </div>


         {/* tabs */}
         <div className="flex gap-3 w-full border-b-[1px] border-gray-200 px-4 mt-4">
            <For data={tabs.list} >
               {({ label }, idx) => {
                  const isActive = activeTabIndex == idx
                  return (
                     <Tab key={label} className={cn(!isActive && "text-gray-500")} isActive={isActive} onClick={() => updateTabIndex(idx)}>{label}</Tab>
                  )
               }}
            </For>
         </div>

         <ActiveTabComponent />
      </div>
   )
}
