import { cartModel } from "../models/cart.model.js";
import productService from "./product.service.js";

class CartService{
    constructor(){
        this.model = cartModel;
    }

async addCart(cart){
    cart.products =[];
    console.log(cart);
    return await this.model.create(cart);
}

async addProdInCart(pid, cid){
    const cart = await this.model.findOne({ _id: cid }); 
    const product = await productService.getProductById(pid); 
    cart.products.push(product); 
    return await cart.save(); 
}

// R: Read
async getCarts(){
    return await this.model.find();
}

// D: Delete
async deleteCart(cid){
    return await this.model.deleteOne({ _id:cid })
}
}

 const cartService = new CartService();
 export default cartService;