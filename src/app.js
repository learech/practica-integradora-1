
import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import messageService from './dao/services/message.service.js';



import productRouter from './routers/products.router.js';
import cartRouter from './routers/carts.router.js';
import messageRouter from './routers/messages.router.js';

const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.engine('handlebars', handlebars.engine());
app.set('views', 'views/'); 
app.set('view engine', 'handlebars');


app.use ('/api/carts', cartRouter);
app.use('/api/products', productRouter);
app.use('/', messageRouter); 


mongoose.connect('mongodb+srv://learech:12345ca@cluster0.iczjpqz.mongodb.net/ecommerce');



const webServer = app.listen(8080, ()=>{
    console.log('Listening on port 8080');
})

const io = new Server(webServer);

io.on('connection', async (socket)=>{
    socket.emit('messages', await messageService.getMessages());


    socket.on('message', async (msj)=>{
        console.log(msj);
        await messageService.addMessage(msj);
        io.emit('messages', await messageService.getMessages())
    });
   
});

