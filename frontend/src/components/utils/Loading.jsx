import { bouncy } from 'ldrs'
import { useLoading } from './LoadingProvider'

export default function Loading() {
    const { isLoading, setIsLoading } = useLoading()

    bouncy.register()

    const blurStyle = {
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(15, 23, 42, 0.35)'
    }

    return (
        <>
            {isLoading &&
                <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
                    {/* blur screen */}
                    <div aria-hidden="true" className="absolute inset-0" style={blurStyle}></div>

                    <div className="relative flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-card ring-1 ring-inset ring-brand-500/20">
                        <l-bouncy
                            size="55"
                            speed="1.75"
                            color="#2563eb"
                        ></l-bouncy>
                        <span className="text-sm font-grotesk font-medium text-slate-500 dark:text-slate-300">Loading…</span>
                    </div>
                </div>
            }
        </>
    )
}