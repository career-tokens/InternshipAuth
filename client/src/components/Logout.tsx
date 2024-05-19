import React from 'react';

interface LogoutProps {
  user: {
    name: string;
  } | null;
  handleLogOut: () => void;
}

const Logout: React.FC<LogoutProps> = ({ user, handleLogOut }) => {
  return (
    <div className="absolute top-6 left-5 z-[1000]">
      <button
        onClick={handleLogOut}
        className="dark:text-gray-950 dark:bg-neon w-fit text-base group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-accent px-4 py-1.5 font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:accentDark"
        aria-label={`Logout ${user?.name ?? ''}`}
      >
        <span className="border-r-2 border-white dark:border-gray-950 px-2">
          {user?.name}
        </span>
        <span className="px-2">Logout</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20" />
        </div>
      </button>
    </div>
  );
};

export default Logout;
