import React, { type ReactNode } from "react";

interface CountCard {
  children: ReactNode;
  title: string;
  count: number;
}

function CountCard({ children, title, count }: CountCard) {
  return (
    <div className='w-full flex items-center justify-between bg-light-blue px-6 py-4 rounded-lg'>
      <div>
        <h3 className='text-gray-400'>{title}</h3>
        <h1 className='text-4xl font-bold'>{String(count)}</h1>
      </div>
      <div className='bg-blue-400 p-2 rounded-lg'>{children}</div>
    </div>
  );
}

export default CountCard;
