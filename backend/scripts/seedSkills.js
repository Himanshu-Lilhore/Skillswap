/**
 * Seed a broad catalogue of skills/interests into the SkillSwap database.
 *
 * SAFE TO RE-RUN: it only inserts names that don't already exist
 * (case-insensitive), so existing Skill documents — and every User that
 * references them — are left completely untouched. No deletes, no updates.
 *
 * Usage (from the backend/ folder, where .env lives):
 *     node scripts/seedSkills.js
 */

require('dotenv').config()
const mongoose = require('mongoose')
const Skill = require('../models/skillModel')

// The catalogue. Grouped only for readability — order/casing here is what
// users will see in the dropdown, so keep it clean and title-cased.
const SKILLS = [
    // ── Programming & Software ─────────────────────────────
    'Web Development', 'Frontend Development', 'Backend Development', 'Full Stack Development',
    'Mobile App Development', 'iOS Development', 'Android Development', 'Game Development',
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP',
    'Swift', 'Kotlin', 'SQL', 'HTML & CSS',
    'React', 'Angular', 'Vue.js', 'Node.js', 'Next.js', 'Django', 'Flask', 'Spring Boot',
    'DevOps', 'Docker', 'Kubernetes', 'AWS', 'Cloud Computing', 'Linux', 'Cybersecurity',
    'Blockchain', 'Web3', 'Smart Contracts', 'Solidity',
    'API Development', 'Databases', 'Data Structures & Algorithms', 'System Design',
    'Git & Version Control', 'Software Testing',

    // ── AI & Data ──────────────────────────────────────────
    'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Data Science',
    'Data Analysis', 'Data Engineering', 'Computer Vision', 'Natural Language Processing',
    'Statistics', 'Excel', 'Power BI', 'Tableau', 'R Programming',

    // ── Design & Creative ──────────────────────────────────
    'UI Design', 'UX Design', 'Graphic Design', 'Product Design', 'Web Design',
    'Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Motion Graphics', '3D Modeling',
    'Animation', 'Video Editing', 'Photography', 'Illustration', 'Logo Design', 'Branding',
    'Interior Design', 'Fashion Design',

    // ── Business & Marketing ───────────────────────────────
    'Digital Marketing', 'SEO', 'Content Marketing', 'Social Media Marketing',
    'Email Marketing', 'Copywriting', 'Content Writing', 'Technical Writing',
    'Public Speaking', 'Sales', 'Entrepreneurship', 'Product Management',
    'Project Management', 'Business Analysis', 'Finance', 'Accounting', 'Investing',
    'Stock Trading', 'Economics', 'Leadership', 'Negotiation', 'Public Relations',

    // ── Languages ──────────────────────────────────────────
    'English', 'Spanish', 'French', 'German', 'Hindi', 'Mandarin Chinese', 'Japanese',
    'Korean', 'Arabic', 'Portuguese', 'Italian', 'Russian', 'Sign Language',

    // ── Music & Performing Arts ────────────────────────────
    'Guitar', 'Piano', 'Singing', 'Music Production', 'DJing', 'Violin', 'Drums',
    'Songwriting', 'Acting', 'Dance',

    // ── Art & Writing ──────────────────────────────────────
    'Painting', 'Drawing', 'Calligraphy', 'Creative Writing', 'Poetry',

    // ── Lifestyle & Practical ──────────────────────────────
    'Cooking', 'Baking', 'Nutrition', 'Fitness Training', 'Yoga', 'Meditation',
    'Personal Finance', 'Gardening', 'Woodworking', 'Chess', 'Time Management',
    'Resume Building', 'Interview Preparation',
]

async function main() {
    if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
        console.error('Missing DB_USERNAME / DB_PASSWORD in backend/.env')
        process.exit(1)
    }

    const DB_NAME = 'SkillSwapDB'
    const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jspv37k.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

    await mongoose.connect(DB_URI)
    console.log('Connected to', DB_NAME)

    // De-dupe against what's already there (case-insensitive).
    const existing = await Skill.find({}, 'name').lean()
    const existingLower = new Set(existing.map(s => (s.name || '').trim().toLowerCase()))

    // De-dupe within our own list too, then drop anything already present.
    const seen = new Set()
    const toInsert = []
    for (const name of SKILLS) {
        const key = name.trim().toLowerCase()
        if (seen.has(key) || existingLower.has(key)) continue
        seen.add(key)
        toInsert.push({ name })
    }

    console.log(`Already in DB : ${existing.length}`)
    console.log(`New to add    : ${toInsert.length}`)
    console.log(`Skipped (dupes): ${SKILLS.length - toInsert.length}`)

    if (toInsert.length > 0) {
        await Skill.insertMany(toInsert)
        console.log('\nAdded:')
        toInsert.forEach(s => console.log('  +', s.name))
    } else {
        console.log('\nNothing new to add — everything already exists.')
    }

    await mongoose.disconnect()
    console.log('\nDone.')
}

main().catch(async (err) => {
    console.error('Seed failed:', err.message)
    try { await mongoose.disconnect() } catch {}
    process.exit(1)
})
