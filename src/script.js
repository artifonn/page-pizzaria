
let modalQt = 1;
let cart = [];
let pizzaModal = 0;

pizzaJson.map((item, index) => {
  const pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

  pizzaItem.setAttribute('index-Key', index);
  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--desc').innerText = item.description;
  pizzaItem.querySelector('a').addEventListener('click', (event) => {
    event.preventDefault();
    let key = event.target.closest('.pizza-item').getAttribute('index-Key')
    pizzaModal = key;
    modalQt = 1;

    document.querySelector('.pizzaBig img').src = item.img;
    document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    document.querySelector('.pizzaInfo--desc').innerText = pizzaJson[key].description;
    document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
    document.querySelectorAll('.pizzaInfo--size').forEach((size, index) => {
      if (index == 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = `${pizzaJson[key].sizes[index]}`;
    });

    document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;

    document.querySelector('.pizzaWindowArea').style.opacity = 0;
    document.querySelector('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      document.querySelector('.pizzaWindowArea').style.opacity = 1;
    }, 200);
  });

  document.querySelector('.pizza-area').append(pizzaItem);
});

const fechaModal = () => {
  document.querySelector('.pizzaWindowArea').style.opacity = 0;
  setTimeout(() => {
    document.querySelector('.pizzaWindowArea').style.display = 'none';
  }, 500)
};

document.querySelectorAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item) => {
  item.addEventListener('click', fechaModal);
});

document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
  modalQt++;
  document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
});

document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {
  if (modalQt != 1) {
    modalQt--;
  }
  document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
});

document.querySelectorAll('.pizzaInfo--size').forEach((sizeSelected) => {
  sizeSelected.addEventListener('click', () => {
    document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
    sizeSelected.classList.add('selected');
  });
});

document.querySelector('.pizzaInfo--addButton').addEventListener('click', () => {
  let size = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'));

  let identificador = pizzaJson[pizzaModal].id + '@' + size;
  let key = cart.findIndex((item) => {
    return item.identificador == identificador;
  });

  if (key > -1) {
    cart[key].qt += modalQt;
  } else {
    cart.push({
      identificador,
      id: pizzaJson[pizzaModal].id,
      size,
      qt: modalQt
    });
  }
  updateCart();
  fechaModal();
});

document.querySelector('.menu-openner').addEventListener('click', () => {
  if(cart.length > 0) {
    document.querySelector('aside').style.left = '0';
  }
});

document.querySelector('.menu-closer').addEventListener('click', () => {
  document.querySelector('aside').style.left = '100vw';
})

let updateCart = () => {
document.querySelector('.menu-openner span').innerHTML = cart.length;

  if (cart.length > 0) {
    document.querySelector('aside').classList.add('show');
    document.querySelector('.cart').innerHTML = '';

    let subtotal = 0;
    let valorDesconto = 0.1;
    let desconto = 0;
    let total = 0;
    
    for(let i in cart) {

      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      subtotal += pizzaItem.price * cart[i].qt;

      let cartItem = document.querySelector('.models .cart--item').cloneNode(true);
      let pizzaSizeName;

      switch(cart[i].size) {
        case 0:
          pizzaSizeName = 'P';
          break;
        case 1:
          pizzaSizeName = 'M';
          break;
        case 2:
          pizzaSizeName = 'G';
          break;
      }

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector('img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () =>{
        if(cart[i].qt > 1) {
          cart[i].qt--;
        } else {
          cart.splice(i, 1);
        }
        
        updateCart();
      });
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
        cart[i].qt++;
        updateCart();
      });

      document.querySelector('.cart').append(cartItem);
    }
    
    desconto = subtotal * valorDesconto;
    console.log(desconto);
    total = subtotal - desconto;

    document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
    document.querySelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
    document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    

  } else {
    document.querySelector('aside').classList.remove('show');
    document.querySelector('aside').style.left = '100vw';
  }
}