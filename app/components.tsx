import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Nav() {
  return <nav className="nav shell" aria-label="Main navigation"><Link className="brand" href="/">AO<span>.</span></Link><div className="navLinks"><Link href="/projects">Projects</Link><Link href="/technical">Technical</Link><Link href="/writing">Writing</Link><a className="navCta" href="mailto:armstrongolusoji9@gmail.com">Start a conversation ↗</a></div></nav>;
}

export function Footer() {
  return <footer className="footer shell"><div><Link className="brand" href="/">AO<span>.</span></Link><p>Building the infrastructure for domain-specific intelligence.</p></div><div className="footerLinks"><Link href="/projects">Projects</Link><Link href="/technical">Technical</Link><Link href="/writing">Writing</Link><Link href="/about">About</Link></div><div><a href="mailto:armstrongolusoji9@gmail.com">armstrongolusoji9@gmail.com</a><p>© 2026 Armstrong Olusoji</p></div></footer>;
}

export function Markdown({ children }: { children: string }) {
  return <div className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{iframe: (props) => <iframe {...props} loading="lazy" />}}>{children}</ReactMarkdown></div>;
}
