console.log("orderCart success!!!");

const bag = document.getElementById("bag");
const boxCart = document.getElementById("box-cart");

bag.addEventListener("click", async () => {
    try {
        let response = await fetch("/api/cart");
        let result = await response.json();

        if (result.ok) {
            const {products} = result.data;
            if (products.length) {
                products.forEach(product => {
                    boxCart.innerHTML = `<P class="alert alert-warning" >${product.name}</P>`
                });
            }else{
                boxCart.innerHTML += `<P class="alert alert-warning" >aún no has agregado productos</P>`
            }
        }

        console.log(result);
    } catch (error) {
        console.error
    }
});

const addCartItem = async (productId) => {
     try {
        let response = await fetch("/api/cart",{
            method : "POST",
            body : JSON.stringify({
                productId,
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        let result = await response.json();
        console.log(result);
     } catch (error) {
        console.error
     }
}