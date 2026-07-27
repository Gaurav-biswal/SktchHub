import Image from "next/image";

export const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Glow */}
      <div className="absolute w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Logo */}
      <div className="relative animate-bounce">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={90}
          height={90}
          className="drop-shadow-xl"
        />
      </div>

      {/* Loading Text */}
      <p className="mt-8 text-lg font-medium text-gray-700 tracking-wide animate-pulse">
        Loading...
      </p>

      {/* Progress Dots */}
      <div className="mt-4 flex gap-2">
        <span className="h-2 w-2 rounded-full bg-black animate-bounce [animation-delay:-0.3s]" />
        <span className="h-2 w-2 rounded-full bg-black animate-bounce [animation-delay:-0.15s]" />
        <span className="h-2 w-2 rounded-full bg-black animate-bounce" />
      </div>
    </div>
  );
};