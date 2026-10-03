import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="max-w-content mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-graphite/75">
        <span className="flex items-center gap-2 font-display text-graphite">
          <img src={logo} alt="HV Consultancy" className="h-5 w-5" />
          HV Consultancy
        </span>
        <a
          href="mailto:contact.hvconsultancy@gmail.com"
          className="hover:text-amber-2 transition-colors"
        >
          contact.hvconsultancy@gmail.com
        </a>
        <span>&copy; {new Date().getFullYear()} HV Consultancy. All rights reserved.</span>
      </div>
    </footer>
  );
}
