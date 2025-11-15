// Data menu
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

// Menampilkan tanggal saat ini
const dateEl = document.getElementById("currentDate");
if (dateEl) dateEl.textContent = new Date().toLocaleDateString();

// Elemen untuk menampilkan menu
const menuList = document.getElementById("menuList");
const totalItemsElement = document.getElementById("totalItems");
const totalPriceElement = document.getElementById("totalPrice");

// Menambahkan variabel untuk nomor antrian
let queueNumber = 1;

// Menghitung total items dan total harga
let totalItems = 0;
let totalPrice = 0;

// Fungsi untuk memperbarui ringkasan total
function updateSummary() {
  totalItems = menuItems.reduce((sum, item) => sum + item.quantity, 0);
  totalPrice = menuItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // Update tampilan total item dan harga
  totalItemsElement.textContent = totalItems;
  totalPriceElement.textContent = `Rp ${totalPrice.toLocaleString()}`;

  // Update Order Summary
  const summaryList = document.getElementById("summaryList");
  summaryList.innerHTML = "";

  menuItems.forEach((item) => {
    if (item.quantity > 0) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="item-name">${item.name}</span>
        <span class="item-qty">x ${item.quantity}</span>
        <span class="item-price">Rp ${item.price * item.quantity}</span>
      `;
      summaryList.appendChild(li);
    }
  });

  // Update tampilan subtotal
  const totalsBox = document.getElementById("totalsBox");
  totalsBox.innerHTML = `
    <div class="totals">
      <div class="row total">
        <span>Total</span>
        <span>Rp ${totalPrice.toLocaleString()}</span>
      </div>
  `;
}

// Fungsi untuk menambah item menu baru
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

// Fungsi untuk merender menu
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

// Fungsi untuk memperbarui kuantitas item menu
function updateQuantity(index, delta) {
  const item = menuItems[index];
  item.quantity = Math.max(0, (item.quantity || 0) + delta);
  renderMenu(); // Memperbarui menu
  updateSummary(); // Memperbarui order summary
}

// Fungsi untuk mengedit item menu
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

// Fungsi untuk menghapus item menu
function deleteMenuItem(index) {
  if (
    confirm(`Apakah Anda yakin ingin menghapus menu ${menuItems[index].name}?`)
  ) {
    menuItems.splice(index, 1);
    renderMenu();
  }
}

// Fungsi untuk menangani proses checkout dan menambah nomor antrian
// Fungsi untuk mencetak struk
function printReceipt() {
  // Mendapatkan nomor antrian
  const queueNumber = document.getElementById("queueNumber").textContent;

  // Menampilkan informasi struk
  const receipt = `
    <pre>
    Ayam Gepuk Raos
    ----------------------------
    Waktu Penjualan: ${new Date().toLocaleString()}
    Nomor Antrian: ${queueNumber}

    Item
    ----------------------------
    ${menuItems
      .map((item) =>
        item.quantity > 0
          ? `${item.name} ${
              item.quantity
            } x ${item.price.toLocaleString()} = ${(
              item.quantity * item.price
            ).toLocaleString()}`
          : ""
      )
      .join("\n")}

    ----------------------------
    Subtotal: Rp ${totalPrice.toLocaleString()}
    Grand Total: Rp ${(totalPrice * 1.1).toLocaleString()}
    Cash: Rp ${(totalPrice * 1.1).toLocaleString()}
    Kembalian: Rp 0

    ----------------------------
    Selamat Menikmati
    Powered by Tim Raos
    </pre>
  `;

  // Membuka jendela baru untuk mencetak struk
  const printWindow = window.open();
  printWindow.document.write(`<pre>${receipt}</pre>`);
  printWindow.document.close();
  printWindow.print();

  // Increment nomor antrian
  queueNumber++;
  document.getElementById("queueNumber").textContent = queueNumber;

  // Reset kuantitas item menu setelah checkout
  menuItems.forEach((item) => (item.quantity = 0));
  renderMenu();
  updateSummary();
}

// Panggil renderMenu agar menu tampil
renderMenu();

// Panggil updateSummary pertama kali
updateSummary();
