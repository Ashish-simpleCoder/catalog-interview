import { Pie, PieChart, Tooltip } from 'recharts';


export default function Summary() {
    const data = [
        { 'name': 'Maximum', value: 4500 },
        { 'name': 'Minimum', value: 3100 },
    ];


    return (
        <div className="flex flex-col gap-3 mt-6 p-4 justify-center items-center">
            <PieChart width={300} height={300}>
                <Tooltip labelClassName={'hidden'} />
                <Pie dataKey="value" data={data} fill="#8884d8" label />
            </PieChart>
        </div>
    )
}