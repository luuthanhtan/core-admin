import { textAlign } from "@mui/system";
import { useState } from "react";

export default function Pagination({links}) {
    const [page, setPage] = useState()
console.log(links)
    function getClassNamePaginate(active) {
        if(active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-blue-300 focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else{
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-blue-300 focus:border-primary";
        }
    }
    return <>
        {
            links &&
            <div style={{ paddingTop:30, display:"flex" }}>
                <a
                    href={"/admin/user?page=" + page}
                    className="mr-1 mb-1 px-4 py-3 text-sm leading-4 border hover:bg-green-500 bg-green-700 text-white"
                >
                    Go to
                </a>
                <input 
                    className="px-4 py-2 border ml-3 mr-12" 
                    placeholder="Page number" 
                    value={page}
                    onChange={
                      e => setPage(e.target.value)
                    }
                /> 
                {/* { Paginate */
                    links.map((page, index) => {
                        return page.active ?
                        <div style={{ marginTop:"11px" }}>
                            {
                                index === 1 ? null : 
                                <>
                                    <a className={getClassNamePaginate(false)} href={links[0].url} key={0}>
                                        Previous
                                    </a>
                                    <a className={getClassNamePaginate(false)} href={links[index - 1].url} key={index - 1}>
                                        {links[index - 1].label}
                                    </a>
                                </>
                            }
                            <a className={getClassNamePaginate(true)} href={page.url} key={index}>
                                {page.label}
                            </a>
                            {
                                index + 1 === links.length - 1 ? null : <>
                                    <a className={getClassNamePaginate(false)} href={links[index + 1].url} key={index + 1}>
                                        {links[index + 1].label}
                                    </a>
                                    {
                                        index + 1 === links.length - 2 ? null :
                                        <>
                                            <span style={{ padding:15, textAlign:"center" }}>...</span>
                                            <a className={getClassNamePaginate(false)} href={links[links.length - 2].url} key={links.length - 2}>
                                                {links[links.length - 2].label}
                                            </a>
                                        </>
                                    }
                                    <a className={getClassNamePaginate(false)} href={links[links.length - 1].url} key={links.length - 1}>
                                        Next
                                    </a>
                                </>
                            }
                        </div>
                            
                            : null
                    })
                }

                {/* SimplePaginate
                <a className={ getClassNamePaginate(false) } href={links.first_page_url}>
                    Previous
                </a>
                <a className={ getClassNamePaginate(true) } href={links.current_page}>
                    { links.current_page }
                </a>
                <a className={ getClassNamePaginate(false) } href={links.next_page_url}>
                    Next
                </a> */}
            </div>
        }
    </>
}