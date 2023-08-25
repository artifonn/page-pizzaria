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
    document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    document.querySelector('.pizzaInfo--desc').innerText = pizzaJson[key].description;
    document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

  // adicionar img
    document.querySelector('.pizzaWindowArea').style.opacity = 0;
    document.querySelector('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      document.querySelector('.pizzaWindowArea').style.opacity = 1;
    }, 200);
  });

  document.querySelector('.pizza-area').append(pizzaItem);
});
