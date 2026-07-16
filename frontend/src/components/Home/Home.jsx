import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetStartedBtn from './GetStartedBtn'
import { defaultUser } from '../utils/defaultUser'
import Axios from 'axios'
import { useAlert } from '../utils/AlertProvider'
import { checkToken } from '../utils/checkToken'
import { useUser } from '../utils/UserProvider'
import { useLoading } from '../utils/LoadingProvider'
import RegtdUsers from './RegtdUsers'

// A static replica of the real swipe card — shows the product at a glance.
function PreviewCard() {
    return (
        <div className="relative mx-auto w-full max-w-sm">
            {/* card peeking behind for depth */}
            <div aria-hidden="true" className="absolute inset-0 translate-x-5 translate-y-5 rotate-6 rounded-2xl border border-brand-500/20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm"></div>

            <div className="card relative overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500 bg-200 animate-gradient-x"></div>
                <div className="px-6 pb-6 -mt-10">
                    <div className="w-20 h-20 rounded-2xl ring-4 ring-white dark:ring-slate-900 bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-2xl font-grotesk font-bold shadow-lg">A</div>
                    <h3 className="mt-3 font-grotesk font-bold text-lg text-slate-900 dark:text-white">Aisha Rao</h3>
                    <p className="text-brand-600 dark:text-brand-400 text-sm">@aisha.makes</p>

                    <div className="mt-5">
                        <span className="eyebrow">Can teach</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="pill-skill">Guitar</span>
                            <span className="pill-skill">Music Production</span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <span className="eyebrow">Want to learn</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="pill-interest">Web Development</span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <div className="btn-secondary flex-1 pointer-events-none">✕ Pass</div>
                        <div className="btn-primary flex-1 pointer-events-none">⇄ Swap</div>
                    </div>
                </div>
            </div>

            {/* floating match tag */}
            <div className="absolute -top-3 -right-2 sm:-right-4 rotate-[8deg] rounded-full bg-accent-500 text-white text-xs font-grotesk font-bold px-3 py-1.5 shadow-lg">
                It's a match!
            </div>
        </div>
    )
}

// A step in the connected stepper — number circle, no card box.
function Step({ n, title, children }) {
    return (
        <div className="relative flex flex-col items-center text-center px-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white text-xl font-grotesk font-bold flex items-center justify-center shadow-glow ring-4 ring-sky-50 dark:ring-slate-950">{n}</div>
            <h3 className="mt-5 font-grotesk font-semibold text-lg text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-[16rem]">{children}</p>
        </div>
    )
}

// ── Why SkillSwap ──────────────────────────────────────────
// Boxed card, icon to the LEFT of the text — distinct from the stepper above.
function Feature({ icon, title, children }) {
    return (
        <div className="card p-6 flex gap-4 items-start text-left">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white flex items-center justify-center shadow-md">
                {icon}
            </div>
            <div>
                <h3 className="font-grotesk font-semibold text-lg text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{children}</p>
            </div>
        </div>
    )
}

const iconProps = {
    className: 'w-6 h-6', viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
}

// ── Popular skills cloud ───────────────────────────────────
const CLOUD_SKILLS = [
    'Web Development', 'Guitar', 'Spanish', 'UI Design', 'Photography', 'Python',
    'Public Speaking', 'Cooking', 'Machine Learning', 'Digital Marketing', 'Piano',
    'Video Editing', 'Yoga', 'Blockchain', 'French', 'Chess', 'Data Science',
    'Singing', 'Copywriting', 'Figma', 'Woodworking', 'Japanese', '3D Modeling',
    'Personal Finance', 'Drawing', 'Fitness Training', 'Content Writing', 'Baking',
    'JavaScript', 'React', 'Illustration', 'Meditation', 'SEO', 'Songwriting',
    'German', 'Mandarin Chinese', 'Product Management', 'Animation', 'Calligraphy',
    'Excel', 'Investing', 'Graphic Design', 'Node.js', 'Motion Graphics', 'DJing',
    'Cybersecurity', 'Negotiation', 'Interior Design', 'Korean', 'Nutrition',
    'Painting', 'Sales', 'Violin', 'Gardening', 'Branding', 'iOS Development',
    'Public Relations', 'Acting', 'Dance', 'Statistics', 'Fashion Design', 'Drums',
    'Technical Writing', 'Leadership', 'Adobe Photoshop', 'Time Management', 'Poetry',
    'Cloud Computing', 'Arabic', 'Video Production', 'Resume Building', 'Sign Language',
]

// ── FAQ ────────────────────────────────────────────────────
const FAQS = [
    {
        q: 'Is SkillSwap really free?',
        a: "Yes. There are no fees, subscriptions, or hidden costs. The whole idea is trading skills instead of money, you pay with what you know.",
    },
    {
        q: 'What if I feel like I have nothing to teach?',
        a: "Almost everyone knows something someone else wants to learn - a language, an instrument, a tool, a hobby. List a few things and you'll be surprised what people want to swap for.",
    },
    {
        q: 'How do matches work?',
        a: "You add the skills you can teach and the ones you want to learn. As you swipe, we surface people whose skills line up with yours. When you both swipe right, it's a match.",
    },
    {
        q: 'How do the actual sessions happen?',
        a: "Once matched, you connect and arrange a session between yourselves - in person or online, whatever works. SkillSwap makes the introduction; you set the terms.",
    },
]

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="card overflow-hidden">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                aria-expanded={open}
            >
                <span className="font-grotesk font-medium text-slate-900 dark:text-white">{q}</span>
                <span className={`shrink-0 text-brand-500 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
                    <svg {...iconProps}><path d="M12 5v14M5 12h14" /></svg>
                </span>
            </button>
            <div className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{a}</p>
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    const { alert, setAlert } = useAlert()
    const { userData, setUserData } = useUser()
    const { setIsLoading } = useLoading()

    useEffect(() => {
        const logoutPrevUser = async () => {
            if (checkToken()) {
                setIsLoading(true)
                const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/logout`)
                if (response.status === 200) {
                    setUserData({ ...defaultUser })
                    console.log("Previous user logged out.")
                }
                setIsLoading(false)
            }
        }

        logoutPrevUser()
    }, [])

    return (
        <div className="max-w-screen-xl mx-auto px-6 pb-28">

            {/* Hero — fills most of the first viewport before any scroll */}
            <section className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh] py-8">

                {/* Copy */}
                <div className="text-center lg:text-left animate-fade-in-up text-5xl sm:text-6xl">
                    <h1 className="page-heading leading-[1.3]">
                        Trade <span className="text-brand-600 dark:text-brand-400 underline decoration-brand-400/50 decoration-4 underline-offset-[12px]">Skills</span>,
                        <br />
                        Build <span className="text-accent-600 dark:text-accent-400 underline decoration-accent-400/50 decoration-4 underline-offset-[12px]">Connections</span>
                    </h1>

                    <p className="mt-10 text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300 max-w-md mx-auto lg:mx-0">
                        No fees, no courses, just people swapping what they know.
                    </p>

                    <div className="mt-12 flex justify-center lg:justify-start">
                        <GetStartedBtn />
                    </div>

                    <div className="mt-12 flex justify-center lg:justify-start">
                        <RegtdUsers />
                    </div>
                </div>

                {/* Product preview */}
                <div className="animate-fade-in-up lg:pl-6" style={{ animationDelay: '120ms' }}>
                    <PreviewCard />
                </div>
            </section>

            {/* How it works */}
            <section className="mt-36 md:mt-52">
                <div className="text-center mb-10">
                    <span className="eyebrow">How it works</span>
                    <h2 className="page-heading mt-3 text-3xl sm:text-4xl">Three steps to your first swap</h2>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                    <Step n="1" title="Build your profile">
                        List what you can teach and what you want to learn.
                    </Step>
                    <Step n="2" title="Swipe to match">
                        Find people whose skills line up with yours.
                    </Step>
                    <Step n="3" title="Swap &amp; learn">
                        Match, connect, and trade a session.
                    </Step>
                </div>
            </section>

            {/* Why SkillSwap */}
            <section className="mt-36 md:mt-52">
                <div className="text-center mb-10">
                    <span className="eyebrow">Why SkillSwap</span>
                    <h2 className="page-heading mt-3 text-3xl sm:text-4xl">Learning, without the price tag</h2>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                    <Feature title="Free forever" icon={
                        <svg {...iconProps}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                    }>
                        No fees, no subscriptions, no paywalls. Your skills are the only currency.
                    </Feature>
                    <Feature title="Mutual by design" icon={
                        <svg {...iconProps}><path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path d="M4 17h16" /></svg>
                    }>
                        You only match when both sides gain — a genuine two-way trade every time.
                    </Feature>
                    <Feature title="Real people" icon={
                        <svg {...iconProps}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    }>
                        Learn hands-on from someone who actually does it — not a pre-recorded course.
                    </Feature>
                </div>
            </section>

            {/* Popular skills cloud */}
            <section className="mt-36 md:mt-52">
                <div className="text-center mb-10">
                    <span className="eyebrow">On the platform</span>
                    <h2 className="page-heading mt-3 text-3xl sm:text-4xl">Swap almost anything</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                        From code to chords to conversation — here's a taste of what people are trading.
                    </p>
                </div>

                {/* full-bleed wall — spills past the page container, faded at the edges */}
                <div className="relative left-1/2 right-1/2 -translate-x-1/2 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                    <div className="flex flex-wrap justify-center gap-3 px-6 max-w-6xl mx-auto">
                        {CLOUD_SKILLS.map((skill, i) => (
                            <span key={i} className={i % 2 === 0 ? 'pill-skill' : 'pill-interest'}>{skill}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="mt-36 md:mt-52">
                <div className="text-center mb-10">
                    <span className="eyebrow">Questions</span>
                    <h2 className="page-heading mt-3 text-3xl sm:text-4xl">Good to know</h2>
                </div>

                <div className="max-w-2xl mx-auto flex flex-col gap-3">
                    {FAQS.map((item, i) => (
                        <FaqItem key={i} q={item.q} a={item.a} />
                    ))}
                </div>
            </section>

        </div>
    )
}
