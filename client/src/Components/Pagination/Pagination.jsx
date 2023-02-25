import React from "react";
import s from "./Pagination.module.css"

export default function Pagination({ showPerPage, allRecipes, pagination, page }) {
    const pageNumbers = []
    const total = Math.ceil(allRecipes/showPerPage) 
    for (let i = 1; i <= total ; i++) {
        pageNumbers.push(i) // esto me da los numeros de pagina
    }
    return (
        <div>
            <button
            onClick={page > 1 ? ()=>pagination(page-1) : null}
            hidden={page === 1 ? true : false}>
                &lt;
            </button>
            {
                pageNumbers &&
                pageNumbers.map((n)=>(
                    <button
                    key={n}
                    className={page !== n ? s.btn : s.current}
                    onClick={()=> pagination(n)}>
                        {n}
                    </button>
                ))
            }
            <button
            onClick={page < total ? ()=>pagination(page+1) : null}
            hidden={page === total ? true : false}>
                &gt;
            </button>

        </div>




    )
}


