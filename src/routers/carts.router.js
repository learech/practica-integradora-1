import { Router } from "express";
import cartService from "../dao/services/cart.service.js";
const cartRouter = Router();


cartRouter.post('/', async (req, res)=>{
const cart = req.body;
const cartAdded = await cartService.addCart(cart);
try {
    res.status(201).send(cartAdded);
    
} catch (err) {
    res.status(500).send({ERROR: err});
}
});



cartRouter.post('/:cid', async (req, res)=>{
const cid = req.params.cid;
const pid = req.body.pid;
const cartAdded = await cartService.addProdInCart(pid, cid);

    try {
        res.status(201).send(cartAdded);
        
    } catch (err) {
        res.status(500).send({ERROR: err});
    }
    });

cartRouter.get('/', async (req, res)=>{
const carts = await cartService.getCarts()
    try {
        res.send(carts);
        
    } catch (err) {
        res.status(404).send({ERROR: err});
    }
    });



cartRouter.delete('/:cid', async (req, res)=>{
    const cid = req.params.cid;
    const carts = await cartService.deleteCart(cid);
        try {
            res.status(204).send(carts);
            
        } catch (err) {
            res.status(404).send({ERROR: err});
        }
        });


export default cartRouter;