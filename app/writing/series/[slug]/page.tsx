import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav, Footer } from "../../../components";
import { writingGroups, formatDate } from "../../../content";
const slugify=(value:string)=>value.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
export default async function Series({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const group=Object.keys(writingGroups).find((name)=>slugify(name)===slug);if(!group)notFound();return <main><Nav/><section className="innerHero shell"><p className="sectionLabel">Essay collection</p><h1>{group}</h1><p>{writingGroups[group].length} complete essays from Armstrong&apos;s original archive.</p></section><section className="pageBody shell seriesList">{writingGroups[group].map((item,i)=><Link href={`/writing/${item.slug}`} key={item.slug}><span>{String(i+1).padStart(2,"0")}</span><div><h2>{item.title}</h2><p>{item.description}</p><small>{formatDate(item.date)}</small></div><b>↗</b></Link>)}</section><Footer/></main>}
