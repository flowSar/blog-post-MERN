import { twMerge } from "tailwind-merge";

interface MenuIconProps {
  w?: string;
  h?: string;
  onClick?: () => void;
}

function MenuIcon({ w = "16", h = "16", onClick }: MenuIconProps) {
  return (
    <svg
      onClick={onClick}
      className={twMerge(
        " cursor-pointer hover:scale-110 transition-transform duration-200 flex md:hidden",
        `w-${w} h-${h}`
      )}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 6H20M4 12H20M4 18H20'
        className='stroke-gray-800 dark:stroke-gray-100'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}

export default MenuIcon;
