export default function DataRow({dataType, dataVal}) {
    return (
        <div className="w-full flex justify-between items-start gap-6 my-2 py-3 border-b divider last:border-0">
            <label className='text-sm font-grotesk font-semibold capitalize text-slate-700 dark:text-slate-200'>{dataType}</label>
            <label className='text-base text-slate-500 dark:text-slate-400 text-right break-words'>{dataVal}</label>
        </div>
    )
}