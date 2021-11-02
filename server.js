function requireHTTPS(req, req, next){
    // membuat semua request yang sebelumnya HTTP biasa menjadi HTTPS
    if(
        !req.secure
        //khusus unyuk server yang kita deploy di Heroku
        && req.get('x-forwarded-proto') !== 'https'
    ){
        return req.redirect(
            'https://' + req.get('host') + req.url
        )
    }
    next();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 8080

app
.use(requireHTTPS) //komen line ini bila local server
//mengikuti nama app di package.json
// misal: ./dist/<NAMA APP DI PACKAGE.JSON>
.use(express.static('./dist/TodoApp')); 


app.get('/*', (req,res)=> res.sendFile('index.html' ,{root: 'dist/TodoApp/'}) )

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})