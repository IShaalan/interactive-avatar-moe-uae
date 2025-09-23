import React from "react";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
  }
> = ({ children, className, onClick, variant = 'primary', size = 'md', ...props }) => {
  const baseClasses = "font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-fit";
  
  const variantClasses = {
    primary: "bg-[#003399] hover:bg-[#1A2A53] text-white shadow-edusofx hover:shadow-edusofx-medium",
    secondary: "bg-[#33AA77] hover:bg-[#2A8A66] text-white shadow-edusofx hover:shadow-edusofx-medium",
    outline: "border-2 border-[#003399] text-[#003399] hover:bg-[#003399] hover:text-white",
    ghost: "text-[#003399] hover:bg-[#EAEAEC] hover:text-[#1A2A53]"
  };
  
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5 rounded-md",
    md: "text-sm px-6 py-2 rounded-lg",
    lg: "text-base px-8 py-3 rounded-xl"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={props.disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </button>
  );
};
