import { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
	children: ReactNode;
	className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
	name: string;
	className?: string;
	background?: ReactNode;
	icon: string;
	description: string;
	href: string;
	cta: string;
	external?: boolean;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
	return (
		<div
			className={cn(
				"grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

const BentoCard = ({
	name,
	className,
	background,
	icon,
	description,
	href,
	cta,
	external = false,
	...props
}: BentoCardProps) => (
	<div
		key={name}
		className={cn(
			"group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
			// light styles
			"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
			// dark styles
			"dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
			className
		)}
		{...props}
	>
		<div>{background}</div>
		<div className="p-6">
			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 transition-all duration-300 lg:group-hover:-translate-y-10">
				<img
					src={icon}
					alt={name}
					className="h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75"
				/>
				<h3 className="text-xl font-heading font-bold text-kbth-primary">
					{name}
				</h3>
				<p className="max-w-lg text-gray-600 font-body">{description}</p>
			</div>

			<div
				className={cn(
					"pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
				)}
			>
				<InteractiveHoverButton
					href={href}
					external={external}
					text={cta}
					className="pointer-events-auto mt-4 border-kbth-primary/30 px-4 py-2 text-kbth-primary"
				>
					{cta}
				</InteractiveHoverButton>
			</div>
		</div>

		<div
			className={cn(
				"pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
			)}
		>
			<InteractiveHoverButton
				href={href}
				external={external}
				text={cta}
				className="pointer-events-auto mt-4 border-kbth-primary/30 px-4 py-2 text-kbth-primary"
			>
				{cta}
			</InteractiveHoverButton>
		</div>

		<div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-kbth-primary/3 group-hover:dark:bg-neutral-800/10" />
	</div>
);

export { BentoCard, BentoGrid };
