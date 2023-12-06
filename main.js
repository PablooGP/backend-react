import dotenv from "dotenv/config"
import express from "express"
import cors from "cors"
import path from "path"

import { __dirname } from "./src/utils.js"
import products from "./src/products.js"
import { searchProducts, getProductId } from "./src/functions.js"

const PORT = process.env.PORT
const server = express()

server.use(cors())
server.use(express.json())

server.use(express.static(path.join(__dirname, "public")))

server.get("/api/products", (req, res, next) => {
    try {
        const query = req.query.search
        const productsrequest = searchProducts(query)

        return res.status(200).json({
            success: true,
            status: 200,
            response: productsrequest
        })
    } catch (err) {
        next(err.message)
    }
})

server.get("/api/products/:id", (req, res, next) => {
    try {
        const { id } = req.params
        const product = getProductId(id)

        if (!product) throw new Error("Product null")
        return res.status(200).json({
            success: true,
            status: 200,
            response: product
        })
    } catch (err) {
        next(err.message)
    }
})

server.get("/api/category/:id", (req, res, next) => {
    try {
        
        const { id } = req.params

        if (id == 1) {
            return res.status(200).json({
                success: true,
                status: 200,
                response: searchProducts()
            })
        } else if (id == 2) {
            const search = products.filter(element => {
                if (element.discount>0) {
                    return element
                }
            })
    
            return res.status(200).json({
                success: true,
                status: 200,
                response: search
            })
        } else if (id == 3) {
            return res.status(200).json({
                success: true,
                status: 200,
                response: searchProducts("procesador")
            })
        } else if (id == 4) {
            return res.status(200).json({
                success: true,
                status: 200,
                response: searchProducts("monitor")
            })
        } else if (id == 5) {
            return res.status(200).json({
                success: true,
                status: 200,
                response: searchProducts("grafica")
            })
        }
        
    } catch (err) {
        next(err.message)
    }
})

server.use((req, res, err) => {
    try {
        if (err==null) throw new Error("idk")

        return res.status(500).json({
            success: false,
            status: 500,
            message: err
        })
    } catch(err) { // Esto no va a causar error con este pequeño intento de servidor pero cuando escale esto y meta custom errors seguramente si.
        return res.status(500).json({
            success: false,
            status: 500,
            message: "unhandler error"
        })
    }
})

server.listen(PORT, () => {
    console.log(`Servidor escuchando en: http://localhost:${PORT}/`)
})