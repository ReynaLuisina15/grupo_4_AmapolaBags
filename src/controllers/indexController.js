module.exports = {
    index : (req,res) => {
        return res.render("index",{
            title : "Home"})
      },
      sobreNosotros : (req,res) => {
        return res.render("location",{
            title : "Nosotros"})
      },
     
}