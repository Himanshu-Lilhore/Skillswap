export default function PageHeading({children}) {
    return (
        <>
            <h1 className="page-heading py-5 mb-4 text-4xl md:text-5xl lg:text-6xl animate-fade-in-up">
                <span className="text-gradient">{children}</span>
            </h1>
        </>
    )
}