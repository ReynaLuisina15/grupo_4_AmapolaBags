console.log("orderCart success!!!");

const bag = document.getElementById("bag");
const boxCart = document.getElementById("box-cart");

bag.addEventListener("click", async () => {
  try {
    let response = await fetch("/api/cart");
    let result = await response.json();
    console.log(result);
    if (result.ok) {
      const { items } = result.data;
      if (items.length) {
        items.forEach(
          ({ product: { name, price, id, images },quantity }) => {
            boxCart.innerHTML = `        <tr>
                  <td><img style="width:100px" src="/img/${images[0].file}" alt="${name}"></td>  
                  <td>${name}</td>
                  <td>
                    <div class="d-flex">
                  <button class="btn btn-sm btn-danger" onclick="removeCartItem('${id}')"><i class="fas fa-minus"></i></button>
                  <input type="text" style="border: none; width:20px; text-align:center;" value="${quantity}">
                  <button class="btn btn-sm btn-success" onclick="addCartItem('${id}')"><i class="fas fa-plus"></i></button>
                    </div>
                    </td>
                    <td> ${price}</td>
                    <td> ${price * quantity }</td>
                    <td>
                      <button class="btn btn-sm bn-danger" onclick="removeCartItemFull('${id}')"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>`;
          }
        );
      } else {
        boxCart.innerHTML += `<P class="alert alert-warning" >aún no has agregado productos</P>`;
      }
    }

    console.log(result);
  } catch (error) {
    console.error;
  }
});

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
    console.log(result);
  } catch (error) {
    console.error;
  }
};

