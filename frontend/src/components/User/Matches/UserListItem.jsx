import maleAvatar from '../../../assets/avatar/male-default-avatar.png'
import { useNavigate, useParams } from 'react-router-dom'

export default function UserListItem({user}) {

    const navigate = useNavigate()

    function handleClick() {
        navigate(`/${user.username}`)
    }

    return (
        <li className="px-3 py-3 cursor-pointer transition-all duration-200 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-xl group">
            <div className="flex items-center space-x-4" onClick={handleClick}>
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-sm font-grotesk font-bold shadow">
                        {user.username?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate dark:text-white">{user.name}</p>
                    <p className="text-sm text-slate-500 truncate dark:text-slate-400">{`@${user.username}`}</p>
                </div>
                <span className="text-slate-300 dark:text-slate-600 group-hover:text-brand-500 group-hover:translate-x-1 transition-all duration-200">→</span>
                {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {user.amount}
                </div> */}
            </div>
        </li>
    )
}