import { cn } from "@/utils/cn";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition-all duration-300 shadow-input dark:shadow-none p-4 bg-slate-800/60 border border-white/[0.1] backdrop-blur-sm justify-between flex flex-col space-y-4 cursor-pointer hover:bg-slate-800/80",
        className
      )}
      onClick={onClick}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-300 space-y-2">
        {icon && (
          <div className="flex items-center space-x-2">
            {icon}
          </div>
        )}
        {title && !header && (
          <div className="font-sans font-bold text-lg text-white mb-2">
            {title}
          </div>
        )}
        {description && !header && (
          <div className="font-sans font-normal text-sm text-neutral-300 leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
