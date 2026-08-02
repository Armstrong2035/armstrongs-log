import Link from "next/link";
import { Nav, Footer, Markdown } from "../components";
import { systemPages } from "../content";
export default function About(){const page=systemPages.find((item)=>item.slug==="about");return <main><Nav/><section className="innerHero shell"><p className="sectionLabel">About</p><h1>Armstrong Olusoji</h1><p>Applied AI engineer, builder, and writer.</p></section><article className="articleBody shell">{page&&<Markdown>{page.body}</Markdown>}<p className="aboutLink"><Link href="/about/how-to-use">How this website works →</Link></p></article><Footer/></main>}
