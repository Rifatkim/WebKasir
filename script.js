function validateLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "12345") {
    window.location.href = "Kasir.html";
  } else {
    document.getElementById("error-message").style.display = "block";
  }
}

const menuItems = [
  { name: "Ayam Dada", price: 16000, quantity: 0 },
  { name: "Ayam Paha", price: 16000, quantity: 0 },
  { name: "Nila Goreng", price: 16000, quantity: 0 },
  { name: "Bebek Goreng", price: 25000, quantity: 0 },
  { name: "Lele Terbang", price: 12000, quantity: 0 },
  { name: "Ati Ampela", price: 7000, quantity: 0 },
  { name: "Sate Usus/Kulit", price: 5000, quantity: 0 },
  { name: "Tahu", price: 2000, quantity: 0 },
  { name: "Tempe", price: 1000, quantity: 0 },
  { name: "Kol Goreng", price: 2000, quantity: 0 },
  { name: "Terong", price: 5000, quantity: 0 },
  { name: "Ceker", price: 2000, quantity: 0 },
  { name: "Kepala Bebek", price: 5000, quantity: 0 },
  { name: "Kepala Ayam", price: 1000, quantity: 0 },
  { name: "Nasi Biasa", price: 5000, quantity: 0 },
  { name: "Nasi Liwet", price: 6000, quantity: 0 },
  { name: "Sambel Extra", price: 3000, quantity: 0 },
  { name: "Teh Manis", price: 3000, quantity: 0 },
  { name: "Es Teh Manis", price: 4000, quantity: 0 },
  { name: "Es Jeruk", price: 6000, quantity: 0 },
];

const menuList = document.getElementById("menuList");
const totalItemsElement = document.getElementById("totalItems");
const totalPriceElement = document.getElementById("totalPrice");

let totalItems = 0;
let totalPrice = 0;

function updateSummary() {
  totalItemsElement.textContent = totalItems;
  totalPriceElement.textContent = totalPrice;
}

function getOrderType() {
  const orderType = document.querySelector(
    'input[name="orderType"]:checked'
  ).value;
  return orderType;
}

function printReceipt() {
  const orderType = getOrderType(); 

  const receiptContent = `
    <h1>Struk Pembelian</h1>
    <p>Jenis Pesanan: ${orderType === "dineIn" ? "Dine In" : "Take Away"}</p>
    <p>Menu Pesanan:</p>
    <ul>
        ${menuItems
          .filter((item) => item.quantity > 0)
          .map(
            (item) =>
              `<li>${item.name}: ${item.quantity} x Rp. ${item.price} = Rp. ${
                item.quantity * item.price
              }</li>`
          )
          .join("")}
    </ul>
    <p>Total Item: ${totalItems}</p>
    <p>Total Harga: Rp. ${totalPrice}</p>
  `;
  const win = window.open("", "", "height=500,width=500");
  win.document.write(receiptContent);
  win.document.close();
  win.print();
}

function createMenu() {
  menuItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${item.name} - Rp. ${item.price}</span>
            <button onclick="updateQuantity(${index}, -1)">-</button>
            <span id="quantity${index}">${item.quantity}</span>
            <button onclick="updateQuantity(${index}, 1)">+</button>
        `;
    menuList.appendChild(li);
  });
}

function updateQuantity(index, delta) {
  const item = menuItems[index];
  const quantityElement = document.getElementById(`quantity${index}`);

  // Update quantity
  item.quantity = Math.max(0, (item.quantity || 0) + delta);

  quantityElement.textContent = item.quantity;

  totalItems = menuItems.reduce((sum, item) => sum + item.quantity, 0);
  totalPrice = menuItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  updateSummary();
}

document.getElementById("currentDate").textContent =
  new Date().toLocaleDateString();

createMenu();
