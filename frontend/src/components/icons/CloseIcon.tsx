import { twMerge } from "tailwind-merge";

interface CloseIconProps {
  w?: string;
  h?: string;
  onClick?: () => void;
}

function CloseIcon({ w = "16", h = "16", onClick }: CloseIconProps) {
  return (
    <svg
      onClick={onClick}
      className={twMerge(
        "flex md:hidden  cursor-pointer hover:scale-110 hover:rotate-90 transition-all duration-200",
        `w-${w} h-${h}`
      )}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M18 6L6 18M6 6L18 18'
        className='stroke-gray-800 dark:stroke-gray-100'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}

export default CloseIcon;
