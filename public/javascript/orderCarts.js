const bag = document.getElementById("bag");
const boxCart = document.getElementById('box-cart-modal')

const showCart = (items) => {
  boxCart.innerHTML = null;

  items.forEach(({ name, price, id, quantity, imgPrimary }) => {
    /*   const existProduct = document.querySelector(`.item${id}`)
      if(existProduct){
        boxCart.removeChild(existProduct)
      } */

      const structure = `
      <tr class="item${id}">
        <td><img style="width:100px" src="/img/${imgPrimary}" alt="${name}"></td>
        <td>${name}</td>
        <td>
          <div class="d-flex">
            <button class="btn btn-sm btn-danger" onclick="removeCartItem('${id}')"><i class="fas fa-minus"></i></button>
            <input type="text" style="border: none; width:20px; text-align:center;" value="${quantity}">
            <button class="btn btn-sm btn-success" onclick="addCartItem('${id}')"><i class="fas fa-plus"></i></button>
          </div>
        </td>
        <td> ${price}</td>
        <td> ${price * quantity}</td>
        <td>
          <button class="btn btn-sm bn-danger" onclick="removeCartItemFull('${id}')"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
      `;
      boxCart.innerHTML += structure;
    });
}


const addCartItem = async (productId) => {
  console.log("#####", productId);
  try {
    let response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        productId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    if (result.ok) {
      const { items } = result.data;
      console.log(items);
      if (items?.length) {
        showCart(items)
      } else {
        boxCart.innerHTML = `<p class="alert alert-warning">Aún no has agregado productos</p>`;
      }
    }
  } catch (error) {
    console.error;
  }
};
const removeCartItem = async (productId) => {

  try {
      let response = await fetch('/api/cart',{
          method : 'DELETE',
          body : JSON.stringify({
              productId,
          }),
          headers : {
              "Content-Type" : "application/json"
          }
      });

      let result = await response.json();

     

      if(result.ok){
          const {items} = result.data;
        console.log(items);
          if (result.ok) {
            const { items } = result.data;
            console.log(items);
            if (items?.length) {
              showCart(items)
            } else {
              boxCart.innerHTML = `<p class="alert alert-warning">Aún no has agregado productos</p>`;
            }
          }
      }        

  } catch (error) {
      console.error

  }
};
const removeCartItemFull = async (productId) => {
  console.log(productId);
  try {
    let response = await fetch('/api/cart/all/' + productId,{
        method : 'DELETE',
        body : JSON.stringify({
            productId,
        }),
        headers : {
            "Content-Type" : "application/json"
        }
    });

    let result = await response.json();

   

    if(result.ok){
        const {items} = result.data;
      console.log(items);
        if (result.ok) {
          const { items } = result.data;
          console.log(items);
          if (items?.length) {
            showCart(items)
          } else {
            boxCart.innerHTML = `<p class="alert alert-warning">Aún no has agregado productos</p>`;
          }
        }
    }        

} catch (error) {
    console.error

}
}


bag.addEventListener("click", async () => {

  try {
    let response = await fetch("/api/cart");
    let result = await response.json();
    if (result.ok) {
      const { items } = result.data;
      if (items?.length) {
        showCart(items)
      } else {
        boxCart.innerHTML = `<p class="alert alert-warning">Aún no has agregado productos</p>`;
      }
    }
  } catch (error) {
    console.error;
  }
});