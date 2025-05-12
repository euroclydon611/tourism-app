import React from "react";

interface AdinkraIconProps {
  className?: string;
  color?: string;
  size?: number;
}

export const AdinkraIcon: React.FC<AdinkraIconProps> = ({ 
  className = "", 
  color = "#000", 
  size = 50
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g fill="none" fillRule="evenodd">
        <g fill={color} fillOpacity="0.1">
          <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z" />
        </g>
      </g>
    </svg>
  );
};

// Additional Adinkra symbols can be added as needed
export const SankofahAdinkra: React.FC<AdinkraIconProps> = ({ 
  className = "", 
  color = "#000", 
  size = 24 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g fill="none" fillRule="evenodd">
        <g fill={color} fillOpacity="0.15">
          <path d="M30 0c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0zm0 5C16.193 5 5 16.193 5 30s11.193 25 25 25 25-11.193 25-25S43.807 5 30 5zm0 5c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20S18.954 10 30 10zm0 5c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15zm0 5c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z" />
        </g>
      </g>
    </svg>
  );
};

// Dwennimmen (Strength) Adinkra symbol
export const DwennimmenAdinkra: React.FC<AdinkraIconProps> = ({ 
  className = "", 
  color = "#E5B25D", 
  size = 24 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g fill="none" fillRule="evenodd">
        <g fill={color} fillOpacity="0.15">
          <path d="M5 5h50v10H45v30h10v10H5v-10h10V15H5V5zm5 5v25h10V10H10zm30 0v25h10V10H40z" />
        </g>
      </g>
    </svg>
  );
};

export default AdinkraIcon;
