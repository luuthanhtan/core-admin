import { useState } from "react";

export default function Pagination({links}) {
    const [page, setPage] = useState()

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
            <div style={{ paddingTop:30 }}>
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
                        return (
                            <a className={ getClassNamePaginate(page.active) } href={page.url}>
                                { index === 0 ? "<<" : (index + 1) ===  links.length ? ">>" : page.label }
                            </a>
                        )
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