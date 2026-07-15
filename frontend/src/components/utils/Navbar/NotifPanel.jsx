import NotificationItem from "./NotificationItem";

export default function NotificationPanel({ userData, handleClick }) {

    const blurStyle = {
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(15, 23, 42, 0.35)'
    }


    return (
        <>
            {/* blur screen */}
            <div aria-hidden="true" onClick={handleClick} className="fixed z-40 w-screen h-screen top-0 left-0" style={blurStyle}></div>

            {/* panel */}
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
                <div className="relative w-full max-w-md animate-scale-in">
                    <div className="relative panel !bg-white dark:!bg-slate-900">

                        <div className="flex items-center justify-between p-5 border-b divider">
                            {/* Heading */}
                            <h3 className="text-lg font-grotesk font-semibold text-slate-900 dark:text-white">
                                Notifications
                            </h3>
                            {/* Close button */}
                            <button onClick={handleClick} className="text-slate-400 bg-transparent hover:bg-slate-200/70 hover:text-slate-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-slate-700 dark:hover:text-white transition-colors">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5 max-h-[60vh] overflow-y-auto">
                            {userData.notifications && userData.notifications.length > 0 ? (
                                <ul className="space-y-2">
                                    {userData.notifications.map((item, index) => (
                                        <NotificationItem key={index} item={item} />
                                    )).reverse()}
                                </ul>
                            ) : (
                                <div className="flex flex-col items-center text-center py-10 text-slate-500 dark:text-slate-400">
                                    <span className="text-3xl mb-2">🔔</span>
                                    <span className="text-sm">You're all caught up</span>
                                </div>
                            )}
                            {/* <div>
                            <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                                <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                How do I turn off notifications
                            </a>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
