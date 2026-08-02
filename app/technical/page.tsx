import Link from "next/link";
import { Nav, Footer } from "../components";
import { deepDives, formatDate } from "../content";
export default function Technical(){return <main><Nav/><section className="innerHero shell"><p className="sectionLabel">Technical deep dives</p><h1>Decisions, trade-offs, and <em>working systems.</em></h1><p>Complete engineering records from Armstrong&apos;s original Markdown files.</p></section><section className="pageBody shell archiveGrid">{deepDives.map((item)=><Link className="archiveCard" href={`/technical/${item.slug}`} key={item.slug}><small>{item.meta.difficulty as string} · {formatDate(item.date)}</small><h2>{item.title}</h2><p>{item.description}</p><b>Read the complete deep dive →</b></Link>)}</section><Footer/></main>}
