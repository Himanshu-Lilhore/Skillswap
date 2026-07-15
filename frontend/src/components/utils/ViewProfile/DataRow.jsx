export default function DataRow({dataType, dataVal}) {
    return (
        <div className="w-full my-2 flex flex-col py-3 border-b divider last:border-0">
            <label className='eyebrow mb-1 capitalize'>{dataType}</label>
            <label className='text-base text-slate-700 dark:text-slate-200 break-words'>{dataVal}</label>
        </div>
    )
}