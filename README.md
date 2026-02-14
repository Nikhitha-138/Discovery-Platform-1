This project started with a simple idea: finding the right cannabis product shouldn’t feel overwhelming.
There are so many strains, effects, and potency levels out there. Instead of endless scrolling and confusing lists, I wanted to build something clean, intuitive, and genuinely helpful  a platform that makes product discovery simple and enjoyable.
That’s how this Cannabis Product Discovery Platform was created.

The Project Does:
Browse  curated collection of products
Filter products by  categories, or THC ranges
View detailed product information
Save favorites to a personal wishlist
Enjoy a smooth, responsive experience on both desktop and mobile

Also for Admin Side:
Admin is responsible for adding products
Admin is also responsible for adding categories
Admin can view users loggedin

Both admin and users use the same login page.

The admin account is manually added to the database, so there is no signup option for admin. Once logged in, the admin has access to a separate dashboard that is not visible to normal users,normal users have another dashboard.

Tech Stack
This project was built using the MERN Stack, which provides a full JavaScript ecosystem from frontend to backend.
Frontend: React.js
Backend: Node.js & Express
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
Styling: Custom CSS with a glassmorphism-inspired design

Cannabis Product Discovery Platform/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│
├── server/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   └── server.js

client/ handles the React frontend
server/ manages the backend API and database logic

Clone the Repository
git clone https://github.com/Nikhitha-138/Discovery-Platform-1

cd Cannabis Product Discovery Platform

Start the Backend
cd server
npm install
npm run dev

Start the Frontend
cd client
npm install
npm run dev

Environment Variables
PORT=8001
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN=your_super_secret_key
REFRESH_TOKEN=your_super_secret_key

License
This project is open-source under the MIT License.
Feel free to explore it, modify it, and build on top of it.

Final Note
This project was built as a learning experience and a passion project. It helped strengthen my understanding of full-stack development, authentication, role-based access control, and responsive UI design.

If you’re checking this out — thank you for taking the time.
