export default function DataRow({ dataType, dataVal, preSaveUserData, setPreSaveUserData }) {
    function handleChange(event) {
        setPreSaveUserData({
            ...preSaveUserData,
            [dataType]: event.target.value
        })
    }

    return (
        <div className={`w-full flex flex-col gap-2 ${dataType === 'bio' ? 'md:col-span-2' : ''}`}>
            <label className='field-label capitalize'>{dataType}</label>
            {dataType === 'bio' ?
                <textarea className='field-input min-h-36' value={preSaveUserData[dataType]} onChange={handleChange} />
                :
                <input className='field-input' value={preSaveUserData[dataType]} onChange={handleChange} />
            }
        </div>
    )
}