console.log("orderCart success!!!");

const bag = document.getElementById("bag");

bag.addEventListener("click", async () => {
    try {
        let response = await fetch("/api/carts");
        let result = await response.json();

        if (result.ok) {
            const {products} = result.data;
            if (products.length) {
                products.forEach(product => {
                    bag.innerHTML = `<P class="alert alert-warning" >${product.name}</P>`
                });
            }else{
                bag.innerHTML = `<P class="alert alert-warning" >aun no has agregado productos</P>`
            }
        }

        console.log(result);
    } catch (error) {
        console.error
    }
})