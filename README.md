# Cannabis Product Discovery Platform 🌿

Welcome! This is a passion project designed to make discovering cannabis products easier, more transparent, and engaging. We built this platform to connect users with the right products through detailed information, smart filtering, and a beautiful, modern interface.

Whether you're exploring different strains for their effects or looking for specific CBD/THC ratios, this app helps you find your perfect match.

## What is this?

Think of it as your digital guide to cannabis. Instead of overwhelming lists, we provide a clean, glassmorphism-styled interface where you can:
- **Explore** a curated catalog of products.
- **Filter** by exactly what matters to you (like "Relaxing" effects or specific THC levels).
- **Save** your favorites to a wishlist for later.
- **Manage** everything easily if you're an admin.

## Key Features

✨ **For Users:**
- **Smart Discovery**: Don't just scroll—filter. Find products by category, potency range, or effect.
- **Visual Details**: Get the full picture with detailed breakdowns of THC/CBD percentages and pricing.
- **Personal Wishlist**: A dedicated space to keep track of products you love or want to try.
- **Smooth Experience**: A responsive design that looks great on your phone or laptop.

🛡️ **For Admins:**
- **Dashboard Hub**: Get a bird's-eye view of your platform's activity, user counts, and product stats.
- **Total Control**: Easily add, edit, or remove products and categories without touching a line of code.
- **User Management**: Keep track of who is joining your community.

## Under The Hood (Tech Stack)

We used the **MERN Stack** to build this because it offers a flexible, full-stack JavaScript environment that's perfect for modern web apps.

*   **Frontend**: React.js for a snappy UI, styled with custom CSS (no heavy frame-works, just pure creativity!).
*   **Backend**: Node.js & Express to handle all the logic and API requests.
*   **Database**: MongoDB for storing all our flexible data structures.
*   **Security**: JSON Web Tokens (JWT) to keep user sessions safe and secure.

## Project Structure

Here's a quick look at how we organized the code, so you don't get lost:

```
Cannabis Product Discovery Platform/
├── client/                 # Where the React magic happens
│   ├── src/
│   │   ├── components/     # Building blocks like Navbar, Modals
│   │   ├── context/        # Handling user login state
│   │   ├── pages/          # The main views (Discovery, Login, etc.)
│   │   └── App.jsx         # The main entry point
│
├── server/                 # The brain of the operation
│   ├── db/                 # Database connections & models
│   ├── middleware/         # Safety checks (Auth tokens)
│   ├── routes/             # API endpoints (Where the frontend talks to the backend)
│   └── server.js           # Server startup file
```

## How to Run It Locally

Want to take it for a spin? Follow these steps:

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/cannabis-product-discovery.git
cd Cannabis Product Discovery Platform
```

**2. Get the Backend Running**
Head into the server folder and install the dependencies:
```bash
cd server
npm install
npm run dev
```
*Your server should now be humming on `http://localhost:8001`*

**3. Fire up the Frontend**
Open a new terminal, go to the client folder, and start the UI:
```bash
cd ../client
npm install
npm run dev
```
*Visit `http://localhost:5173` in your browser to see it in action!*

## Environment Config

You'll need a `.env` file in your `server` folder to keep secrets safe. It should look something like this:

```env
PORT=8001
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN=your_super_secret_key
```

## License

This project is open-source and available under the MIT License. Feel free to use it, break it, and fix it!

---
*Built with 💚 and code.*
