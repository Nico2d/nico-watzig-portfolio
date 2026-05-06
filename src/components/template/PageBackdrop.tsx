export function PageBackdrop() {
	return (
		<div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
			{/* primary blob — top-left */}
			<div className="absolute top-[6%] -left-32 w-[520px] h-[520px] rounded-full bg-primary/15 blur-3xl" />
			{/* accent blob — middle-right */}
			<div className="absolute top-[40%] -right-32 w-[560px] h-[560px] rounded-full bg-brand-purple/15 blur-3xl" />
			{/* tertiary blob — bottom-left, cooler tone */}
			<div className="absolute -bottom-40 left-[20%] w-[480px] h-[480px] rounded-full bg-blue-light/10 blur-3xl" />
			{/* subtle dot grid, fades at top and bottom */}
			<div
				className="absolute inset-0 opacity-[0.18] dark:opacity-[0.10]"
				style={{
					backgroundImage:
						'radial-gradient(currentColor 1px, transparent 1px)',
					backgroundSize: '22px 22px',
					color: '#888',
					maskImage:
						'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
					WebkitMaskImage:
						'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
				}}
			/>
		</div>
	)
}
