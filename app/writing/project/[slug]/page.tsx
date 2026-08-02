import { notFound } from "next/navigation";
import { Nav, Footer, Markdown } from "../../../components";
import { projectLogs, formatDate } from "../../../content";
export default async function ProjectLog({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=projectLogs.find((entry)=>entry.slug===slug);if(!item)notFound();return <main><Nav/><section className="articleHero shell"><p className="sectionLabel">{String(item.meta.project)} · Project log · {formatDate(item.date)}</p><h1>{item.title}</h1>{item.description&&<p>{item.description}</p>}</section><article className="articleBody shell"><Markdown>{item.body}</Markdown></article><Footer/></main>}
