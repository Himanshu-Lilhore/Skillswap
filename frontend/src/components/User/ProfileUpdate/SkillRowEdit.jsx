import Axios from 'axios'
import { useState, useEffect } from 'react'
import SearchableDropdown from './SearchableDropdown'
import CloseIcon from '../../../assets/CloseIcon.jsx'

export default function SkillRowEdit({ dataType, dataVal, preSaveUserData, setPreSaveUserData }) {
    const [includedSkills, setIncludedSkills] = useState([...(dataVal || [])])
    const [excludedSkills, setExcludedSkills] = useState()

    useEffect(() => {
        const fetchSkills = async () => {
            const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}skills`)
            const dataValIds = (dataVal || []).map(skill => skill._id)
            let otherSkills = response.data.filter(thisSkill => !dataValIds.includes(thisSkill._id))
            console.log(dataType, otherSkills)
            setExcludedSkills(otherSkills)
        }

        fetchSkills()
    }, [])


    useEffect(() => {
        setPreSaveUserData({ ...preSaveUserData, [dataType]: [...includedSkills] })
    }, [excludedSkills])


    const handleSkillRemove = (skill) => {
        setExcludedSkills([...excludedSkills, skill])
        setIncludedSkills(prevList => prevList.filter(thisSkill => thisSkill._id !== skill._id))
        console.log(`Removed ${skill.name}`)
    }


    const handleSkillAdd = (skill) => {
        setExcludedSkills(prevList => prevList.filter(thisSkill => thisSkill._id !== skill._id))
        setIncludedSkills([...includedSkills, skill])
        console.log(`Added ${skill.name}`)
    }


    const pillClass = dataType === 'interests' ? 'pill-interest' : 'pill-skill'

    return (
        <div className="w-full md:col-span-2 flex flex-col gap-3 pt-2 border-t divider">
            <label className='field-label'>{dataType === 'interests' ? 'Want to learn' : 'Can teach'}</label>

            <div className="flex flex-wrap items-center gap-2">
                {includedSkills.map((element, key) => {
                    return (
                        <span key={key} skillid={element._id} className={`${pillClass} pr-2`}>
                            {element.name}
                            <button onClick={() => handleSkillRemove(element)} className="ml-1 opacity-60 hover:opacity-100 transition-opacity">
                                <CloseIcon />
                            </button>
                        </span>
                    );
                })}

                <SearchableDropdown options={excludedSkills} onSelect={handleSkillAdd} />
            </div>
        </div>
    )
}