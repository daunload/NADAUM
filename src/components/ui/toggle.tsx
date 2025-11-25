export default function Toggle({
    active,
    onClick
}: { active: boolean, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) {

	return (
        <button
            onClick={onClick}
            className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                active
                    ? 'bg-accent border-accent'
                    : 'border-border-strong hover:border-accent'
            }`}
        >
            {active && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-3.5 h-3.5 text-text-inverse"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                    />
                </svg>
            )}
        </button>
	)
}