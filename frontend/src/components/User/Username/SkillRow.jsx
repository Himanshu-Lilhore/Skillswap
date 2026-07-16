export default function SkillRow({dataType, dataVal}) {
    const pillClass = dataType === 'interests' ? 'pill-interest' : 'pill-skill'

    return (
        <div className="w-full flex justify-between items-start gap-6 my-4 py-3 border-b divider md:col-span-2">
            <label className='text-sm font-grotesk font-semibold text-slate-700 dark:text-slate-200'>{dataType === 'interests' ? 'Want to learn' : 'Can teach'}</label>
            <div className="flex flex-wrap justify-end gap-2">
                {dataVal.map((element, key) => {
                    return <span key={key} className={pillClass}>{element.name}</span>
                })}
            </div>
        </div>
    )
}