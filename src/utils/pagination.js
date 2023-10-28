const paginateData = (items, currenPage) => {
    //? Cantidad de items por pagina
    const ITEMS_PER_PAGE = 20

    //? Los item de la pagina actual
    const sliceEnd = currenPage * ITEMS_PER_PAGE
    const sliceStart = sliceEnd - ITEMS_PER_PAGE
    const itemsInCurrentPage = items.slice(sliceStart, sliceEnd)

    //? Ultima pagina o la cantidad de paginas
    const lastPage = Math.ceil(items.length / ITEMS_PER_PAGE)

    //? Bloque actual
    const PAGES_PER_BLOCK = 5
    const actualBlock = Math.ceil(currenPage / PAGES_PER_BLOCK)

    //? Paginas que se van a mostrar en el bloque actual
    const pagesInCurrentBlock = []
    const maxPage = actualBlock * PAGES_PER_BLOCK
    const minPage = (maxPage - PAGES_PER_BLOCK) + 1
    for(let i = minPage; i<= maxPage; i++){
        if(i <= lastPage){
            pagesInCurrentBlock.push(i)
        }
    }

    return{
        itemsInCurrentPage,
        pagesInCurrentBlock,
        lastPage,
    }
}

export {
    paginateData
}