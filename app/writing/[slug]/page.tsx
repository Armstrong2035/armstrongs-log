import { notFound } from "next/navigation";
import { Nav, Footer, Markdown } from "../../components";
import { essays, projectLogs, formatDate, seriesName } from "../../content";
export default async function Essay({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=[...essays,...projectLogs].find((entry)=>entry.slug===slug);if(!item)notFound();return <main><Nav/><section className="articleHero shell"><p className="sectionLabel">{item.type==="projectLog"?`${String(item.meta.project)} · Project log`:seriesName(item)} · {formatDate(item.date)}</p><h1>{item.title}</h1>{item.description&&<p>{item.description}</p>}</section><article className="articleBody shell"><Markdown>{item.body}</Markdown></article><Footer/></main>}
