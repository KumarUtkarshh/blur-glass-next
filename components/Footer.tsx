import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link href="/" className="wordmark" aria-label="ShyGlass home">
          <Image
            src="/app-icon.png"
            alt="ShyGlass Icon"
            width={30}
            height={30}
          />
          <span>ShyGlass</span>
        </Link>

        <span className="footer-slogan">
          Privacy that follows your attention.
        </span>

        <a
          href="https://polar.sh/aldealabs/portal"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-portal-link"
        >
          Customer Portal ↗
        </a>
      </div>
    </footer>
  );
}
