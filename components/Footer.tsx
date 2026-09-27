import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link href="/" className="wordmark" aria-label="BlurGlass home">
          <Image
            src="/app-icon.png"
            alt="BlurGlass Icon"
            width={28}
            height={28}
          />
          <span style={{ fontSize: "17px", fontWeight: "650" }}>BlurGlass</span>
        </Link>

        <span className="footer-slogan">
          The privacy screen that knows when you are looking.
        </span>

        <div className="footer-links">
          <a
            href="https://buy.polar.sh/polar_cl_eXbMk6MFQGpY3czW4xuZaFpYgRfg0YXdZxz5u1tOWjl"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-portal-link"
          >
            Buy BlurGlass ($4.99) ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
