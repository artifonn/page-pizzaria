
let qtdPedidos = 1;

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

    document.querySelector('.pizzaBig img').src = item.img;
    document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    document.querySelector('.pizzaInfo--desc').innerText = pizzaJson[key].description;
    document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
    document.querySelectorAll('.pizzaInfo--size').forEach((size, index) => {
      if(index == 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = `${pizzaJson[key].sizes[index]}`; 
    });

    document.querySelector('.pizzaInfo--qt').innerHTML = qtdPedidos;

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
  qtdPedidos++;
  document.querySelector('.pizzaInfo--qt').innerHTML = qtdPedidos;
});

document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {
  if(qtdPedidos != 1) {
    qtdPedidos--; 
  }
  document.querySelector('.pizzaInfo--qt').innerHTML = qtdPedidos;
});

document.querySelectorAll('.pizzaInfo--size').forEach((sizeSelected, index) => {
  sizeSelected.addEventListener('click', (event) => {
    document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
    sizeSelected.classList.add('selected');
  });
});