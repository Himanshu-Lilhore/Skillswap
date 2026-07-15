export default function SkillRow({dataType, dataVal}) {
    const pillClass = dataType === 'interests' ? 'pill-interest' : 'pill-skill'

    return (
        <div className="w-full my-2 flex flex-col py-3 border-b divider md:col-span-2">
            <label className='eyebrow mb-3 capitalize'>{dataType}</label>
            <div className="flex flex-wrap gap-2">
                {dataVal.map((element, key) => {
                    return <span key={key} className={pillClass}>{element.name}</span>
                })}
            </div>
        </div>
    )
}