export default function NotificationItem({ item, isNew }) {
    return (
        <li>
            <div className="flex items-center gap-3 p-3 text-sm font-medium text-slate-700 rounded-xl bg-slate-100/70 hover:bg-brand-50 group transition-colors dark:bg-slate-800/60 dark:hover:bg-brand-500/10 dark:text-slate-200">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-500"></span>
                <span className="flex-1 whitespace-normal break-words">{item}</span>
                {isNew &&
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold text-brand-700 bg-brand-100 rounded-full dark:bg-brand-500/20 dark:text-brand-300">New</span>
                }
            </div>
        </li>
    )
}