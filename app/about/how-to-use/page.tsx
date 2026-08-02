import { Nav, Footer, Markdown } from "../../components";
import { systemPages } from "../../content";
export default function HowToUse(){const page=systemPages.find((item)=>item.slug==="how-to-use");return <main><Nav/><section className="articleHero shell"><p className="sectionLabel">About this site</p><h1>{page?.title}</h1><p>{page?.description}</p></section><article className="articleBody shell">{page&&<Markdown>{page.body}</Markdown>}</article><Footer/></main>}
