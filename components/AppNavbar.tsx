// components/app-navbar.tsx

export default function AppNavbar() {
  return (
    <header
      className="
      fixed
      top-0
      left-0
      right-0
      z-40
      h-14
      bg-brand-black/80
      backdrop-blur
      border-b
      border-white/10
      flex
      items-center
      px-4
    "
    >
      <div className="text-brand-white font-medium">
        <img
          src="/images/logo/logoOrange.svg"
          alt="Logo"
          className="h-10 w-auto"
        />
      </div>

      <div className="ml-auto">{/* profile / actions */}</div>
    </header>
  );
}
