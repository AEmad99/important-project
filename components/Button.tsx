import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyles = "px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform shadow-lg focus:outline-none focus:ring-4";
  
  const variants = {
    primary: "bg-green-500 hover:bg-green-600 text-white shadow-green-200 focus:ring-green-300 hover:scale-110 active:scale-95",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-red-200 focus:ring-red-300" // Note: movement logic handles scale/position for danger
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;