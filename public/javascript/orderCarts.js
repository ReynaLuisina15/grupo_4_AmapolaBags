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
      console.log("items",items);
      if (items.length) {
        boxCart.innerHTML = null;
        items.forEach(({ name, price, id, quantity,imgPrimary }) => {
          boxCart.innerHTML += `
                <tr>
                  <td><img style="width:100px" src="/img/${
                    imgPrimary
                  }" alt="${name}"></td>  
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
        });
      } else {
        boxCart.innerHTML += `<p class="alert alert-warning">Aún no has agregado productos</p>`;
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
