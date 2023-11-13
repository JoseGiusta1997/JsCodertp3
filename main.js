const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const productos = [
  {
    id: 1,
    nombre: "Chomba",
    escuela: "Misericordia",
    talle: "L",
    precio: 160,
    img:
    "https://verdemasweb.com.ar/wp-content/uploads/CHOMBA-DIVINA-1-500x500.jpg",
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "Chomba",
    precio: 140,
    escuela: "Misericordia",
    talle: "M",
    img:
    "https://verdemasweb.com.ar/wp-content/uploads/CHOMBA-DIVINA-1-500x500.jpg",
    cantidad: 1,
  },
  {
    id: 3,
    nombre: "Short",
    escuela: "Misericordia",
    talle: "M",
    precio: 250,
    img:
    "https://http2.mlstatic.com/D_NQ_NP_618517-MLA48486821458_122021-O.webp",
    cantidad: 1,
  },
  {
    id: 4,
    nombre: "Short", 
    escuela: "Misericordia",
    talle: "S",
    precio: 220,
    img:
    "https://http2.mlstatic.com/D_NQ_NP_618517-MLA48486821458_122021-O.webp",
    cantidad: 1,
  },
  {
    id: 5,
    nombre: "Uniforme", 
    escuela: "San José",
    talle: "L",
    precio: 520,
    img:
    "https://i.pinimg.com/236x/c9/7c/d3/c97cd32745b4104cba9ad81fef18f116.jpg",
    cantidad: 1,
  }, 
];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <h3>${product.escuela}</h3>
    <h3>${product.talle}</h3>
    <p class="price">${product.precio} $</p>
  `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
    Swal.fire({
      position: "top-end",
      imageUrl: product.img,
      imageWidth: 250,
      imageHeight: 250,
      icon: "success",
      title: "agregado al carrito",
      showConfirmButton: false,
      timer: 1000,
    });

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        escuela: product.escuela,
        talle: product.talle,
        precio: product.precio,
        cantidad: product.cantidad,
      });
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
    }
  });
});

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-header-title">Carrito.</h1>
    `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${product.img}"> 
        <h3>${product.nombre}</h3>
        <h3>${product.escuela}</h3>
        <h3>${product.talle}</h3>
        <p>${product.precio} $</p>
        <span class="restar"> - </span>
        <p>${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${product.cantidad * product.precio} $</p>
        <span class="delete-product"></span>
      `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      saveLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: ${total} $`;
  modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  console.log(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  carritoCounter();
  saveLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength")); 
};

carritoCounter();
