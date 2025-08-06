Hell# 🛍️ JavaScript Amazon Clone

This is a **frontend-only clone** of the Amazon website, built using **vanilla JavaScript**, **HTML**, and **CSS**. It mimics the core functionality of Amazon's shopping experience, including:

- Product listing
- Add to cart
- Checkout summary
- Order placement and history
- "Buy Again" functionality
- Tracking page

> 🔗 This project uses a third-party backend (`https://supersimplebackend.dev`) for order storage and retrieval.

---

## 📁 Project Structure

```
.
├── amazon.html         # Main shopping page
├── checkout.html       # Checkout and payment summary
├── orders.html         # Order history
├── tracking.html       # Track package page
├── data/               # Contains cart, products, deliveryOptions, orders logic
├── scripts/            # JavaScript to power UI rendering
├── styles/             # CSS styling
└── readme.md
```

---

## 🚀 How to Run

Since this is a frontend-only project using `ESM` imports, you cannot run it by simply opening `amazon.html` in a browser.

### ✅ Recommended: Use Live Server (VS Code extension)

1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
2. Right-click on `amazon.html` → **Open with Live Server**.

Alternatively, you can run a local server via:

```bash
npx serve .
# or
python3 -m http.server
```

---

## 📦 Features Implemented

- ✅ Dynamic cart rendering
- ✅ Delivery options with date calculations
- ✅ Responsive order summary
- ✅ Order tracking using URL parameters
- ✅ Product reordering
- ❌ **Search functionality not implemented**

---

## 📚 Technologies Used

- HTML5, CSS3
- JavaScript (ES6+)
- [Day.js](https://day.js.org/) for date formatting
- [SuperSimpleBackend.dev](https://supersimple.dev/projects/amazon) (provided backend)

---

## 📸 Screenshots

> Add screenshots here (optional)

---

## ✍️ Credits

This project was developed as a learning exercise by [Twin-25]. Backend support and design inspiration taken from [SuperSimple.dev](https://supersimple.dev/).

---

## 📄 License

MIT License.
