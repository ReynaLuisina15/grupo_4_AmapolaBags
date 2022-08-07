module.exports = {
    productCart : (req,res) => {
        return res.render("productCart", {title:"Carrito"})
      },
    productDetail : (req,res) => {
        return res.render("productDetail", {title:"Detalle"})
      },
    productGeneral : (req,res) => {
        return res.render("productGeneral", {title:"Prodectos"})
      },   
    productAdd : (req,res) => {
        return res.render("productAdd", {title:"Prodectos"})
      },
    productEdit : (req,res) => {
       
        return res.render('productEdit',{title:"Editar" })
      }, 
    
}