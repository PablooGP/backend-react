import products from "./products.js"

const searchProducts = (query) => {

    if (!query) return products

    const list = query.split(" ").map(e => e.toLowerCase())

    const finded = products.filter(element => {
        const nameList = element.name.toLowerCase().split(" ")
        const isin = element.tags.some(tagElement => list.includes(tagElement))
        const namein = nameList.some(tagElement => list.includes(tagElement))

        if (isin||namein) return element
    })

    return finded
}

const getProductId = (id) => {
    if (!id) return null
    return products.find(e => e.id == id)
}


export { searchProducts, getProductId }