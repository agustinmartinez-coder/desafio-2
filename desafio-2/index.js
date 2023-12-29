const fs = require ('node:fs')

class ProductManager{

    constructor(){
        this.products = []
        this.id = 1
        this.path = './products.json'
    }
    addProduct(product) {

        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.error('Todos los campos son obligatorios.')
            return 
        }

        
        if(this.products.some(p => p.code === product.code)){
            console.error('No se debe repetir el código del producto.')
            return
        }


        product.id = this.id++
        this.products.push(product)
        console.log(`Se añadió el producto con código ${product.code}`)


        this.saveProducts()
    }

    getProducts(){
        try {
            const data = fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(data)

            return this.products
        } catch(err){
            console.log('Error al cargar productos')
        }
    }

    getProductById(id){
        try {
            const data =  fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(data)
            
            
            const product = this.products.find(p => p.id === id)
            
    
            if(!product){
                console.error('No se encontró producto')
            }else {
                return product     
            }

        } catch(err){
            console.log('Error al cargar productos')
        }
    }
    
    saveProducts() {
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
            console.log('Productos guardados en el archivo:', this.path)
        } catch(err){
            console.error('Error al guardar productos')
        }
    }
    
    updateProduct(id, updatedProduct) {
        try{
            const data = fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(data)

            const index = this.products.findIndex(p => p.id === id)

            if (index === -1) {
                console.error('No se encontró producto con ID:', id)
                return
            }

            this.products[index] = { ...this.products[index], ...updatedProduct }

            this.saveProducts()

            console.log(`Producto con ID ${id} actualizado correctamente`)
        } catch(err){
            console.error('Error al actualizar producto')
        }
    }

    deleteProduct(id){
        try{
            const data = fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(data)

        
            this.products = this.products.filter(p => p.id !== id)

            this.saveProducts()

            console.log(`Producto con ID ${id} eliminado correctamente`)
        } catch(err){
            console.error('Error al eliminar producto');
        }
    }
}
