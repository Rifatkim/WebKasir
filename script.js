function showSignupForm() {
  document.getElementById("form-title").textContent = "BUAT AKUN BARU";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
  document.getElementById("create-account-link").style.display = "none";
  document.getElementById("back-to-login").style.display = "block";
}

function showLoginForm() {
  document.getElementById("form-title").textContent = "LOGIN KASIR";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("create-account-link").style.display = "block";
  document.getElementById("back-to-login").style.display = "none";
}

// === LOGIN (kirim ke backend Express/MySQL) ===
function validateLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Login berhasil") {
        alert("Login Berhasil!");
        window.location.href = "Kasir.html"; // Arahkan ke halaman kasir
      } else {
        document.getElementById("error-message").style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Gagal terhubung ke server!");
    });
}

// === REGISTRASI (kirim ke backend Express/MySQL) ===
function validateSignup(event) {
  event.preventDefault();

  let newUsername = document.getElementById("newUsername").value;
  let newPassword = document.getElementById("newPassword").value;

  fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: newUsername,
      password: newPassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      if (data.message === "Akun berhasil dibuat") {
        showLoginForm();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Gagal membuat akun, periksa koneksi server.");
    });
}

// === BAGIAN MENU (tidak diubah) ===
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

function addMenuItem() {
  const itemName = prompt("Masukkan nama item menu:");
  const itemPrice = parseInt(prompt("Masukkan harga item menu:"));

  if (itemName && !isNaN(itemPrice) && itemPrice > 0) {
    const newItem = { name: itemName, price: itemPrice, quantity: 0 };
    menuItems.push(newItem);
    renderMenu();
  } else {
    alert("Input tidak valid! Pastikan nama dan harga item benar.");
  }
}

function editMenuItem(index) {
  const newName = prompt(
    "Masukkan nama baru item menu:",
    menuItems[index].name
  );
  const newPrice = parseInt(
    prompt("Masukkan harga baru item menu:", menuItems[index].price)
  );

  if (newName && !isNaN(newPrice) && newPrice > 0) {
    menuItems[index].name = newName;
    menuItems[index].price = newPrice;
    renderMenu();
  } else {
    alert("Input tidak valid!");
  }
}

function deleteMenuItem(index) {
  if (
    confirm(`Apakah Anda yakin ingin menghapus menu ${menuItems[index].name}?`)
  ) {
    menuItems.splice(index, 1);
    renderMenu();
  }
}

function updateQuantity(index, delta) {
  const item = menuItems[index];
  const quantityElement = document.getElementById(`quantity${index}`);
  item.quantity = Math.max(0, (item.quantity || 0) + delta);
  quantityElement.textContent = item.quantity;

  totalItems = menuItems.reduce((sum, item) => sum + item.quantity, 0);
  totalPrice = menuItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  updateSummary();
}

function renderMenu() {
  if (!menuList) return;
  menuList.innerHTML = "";
  menuItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} - Rp. ${item.price}</span>
      <button onclick="updateQuantity(${index}, -1)">-</button>
      <span id="quantity${index}">${item.quantity}</span>
      <button onclick="updateQuantity(${index}, 1)">+</button>
      <button onclick="editMenuItem(${index})"><i class="fas fa-pencil-alt"></i></button>
      <button onclick="deleteMenuItem(${index})"><i class="fas fa-trash"></i></button>
    `;
    menuList.appendChild(li);
  });
}

// Menampilkan tanggal saat ini
const dateEl = document.getElementById("currentDate");
if (dateEl) dateEl.textContent = new Date().toLocaleDateString();

// Panggil renderMenu agar menu tampil
renderMenu();
