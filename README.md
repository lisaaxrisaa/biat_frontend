# 📌 Pack Ahead: Full-Stack Travel Planning Application

Pack Ahead is a full-stack travel planning application that helps users organize their trips effortlessly. Whether you're planning a solo adventure or a family vacation, Pack Ahead offers tools to manage itineraries, track expenses, create packing lists, check the weather, and more—all in one place!

🎉 **Live Demo**  
Try Pack Ahead live here 👉 **[Pack Ahead](https://pack-ahead.vercel.app/)** <br>
Video demo here 👉**[Pack Ahead Video](https://drive.google.com/file/d/1aQiJKIflm1yaHNNoZb5qU6uyeR1JXvuJ/view?usp=drive_link)**

Pack Ahead is deployed on **Vercel**. Log in to test itinerary management, budget tracking, and more!

<img src="https://i.imgur.com/H66DXN7.png" width="900">

## 🚀 Features

### 🗓️ Itinerary Planner

Add and manage detailed trip itineraries.

### 📌 Destination Generator

Get travel inspiration with randomly suggested destinations.

### 🧳 Packing List

Ensure you never forget essentials for your trip.

### 💰 Budget Tracker

Keep track of expenses and manage your travel budget.

### 🌦️ Weather Integration

Check real-time weather updates for your destination.

### ✈️ Flight Lookup

Search and track flights to plan your journey.

### 📝 Travel Journal

Document and reflect on your travel experiences.

### ⏳ Countdown Timer

Track the days left until your next trip!

## 🛠 Tech Stack

### **Frontend**

- [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
- [![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
- [![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
- [![RTK Query](https://img.shields.io/badge/RTK%20Query-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/rtk-query/overview)
- [![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

### **Backend**

- [![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
- [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
- [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
- [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

### **Authentication**

- [![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

### **Database Management**

- [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
- [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

### Database Schema

Below is the database schema, designed to store itinerary details, user preferences, and more.
<img src="https://i.imgur.com/VfipRin.png" width="900">

---

## 📂 Project Structure

```sh
vite-project/
│── src/
│ ├── assets/
│ ├── separate components by features/
│ ├── store/ # Redux slices and API calls
│ ├── pages/ # Main pages (Home, Login, Profile, etc.)
│ ├── App.jsx # Main application component
│ ├── main.jsx # React entry point
│ ├── index.css # Global styles
│── public/ # Static assets
│── package.json # Dependencies
│── README.md # Project documentation
│── vite.config.js # Vite configuration
```

🏗️ Installation & Setup

- **Clone the repository**

  ```sh
  git clone https://github.com/lisaaxrisaa/biat_frontend.git
  ```

- **Navigate into the project directory**

  ```sh
  cd biat_frontend
  ```

  - **Navigate into the `vite-project` subdirectory**

  ```sh
  cd vite-project
  ```

- **Install dependencies**

  ```sh
  npm install
  ```

- **Running the Project**

  ```sh
  npm run dev
  ```

## 🔑 Backend & API Setup

✅ **No backend setup required!**  
The backend is already deployed on Render.com, and all API endpoints are configured in the frontend.
**You do not need to generate API keys or set up a local backend.**

### 🌍 API Base URL

- **All API requests are automatically routed to:**

```sh
https://pack-ahead.onrender.com
```

⚠️ _ Note: If you encounter any API issues, please check that the frontend is correctly pointing to the deployed backend URL instead of localhost._

### 🔎 Want to check out the backend?

The backend source code is available on GitHub:
👉 [**Pack Ahead Backend Repository**](https://github.com/lisaaxrisaa/biat_backend.git)

## 🤝 Contributing

Contributions make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are greatly appreciated!

If you have a suggestion to improve this project, feel free to fork the repo and submit a pull request. You can also open an issue with the tag "enhancement". Don't forget to star the project if you find it useful! ⭐

- **Fork the repository**

  ```sh
  git clone https://github.com/lisaaxrisaa/biat_frontend.git
  ```

- **Create a new feature branch**

  ```sh
  git checkout -b feature/AmazingFeature
  ```

- **Make your changes and commit**

  ```sh
  git commit -m "Add some AmazingFeature"
  ```

- **Push the changes**

  ```sh
  git push origin feature/AmazingFeature
  ```

## 📬 Contact

If you have any questions, suggestions, or feedback, feel free to reach out!

**Lisa Fujita**  
[LinkedIn](https://www.linkedin.com/in/lisa-fujita/) | 📧 lisafujita90@gmail.com

**Nicole Riera**  
[LinkedIn](https://www.linkedin.com/in/nicole-riera-0780bb32a/) | 📧 Nrperez135@gmail.com

**Jonah Wilson**  
[LinkedIn](https://www.linkedin.com/in/jonah-wilson-584094353/) | 📧 jdbw13@hotmail.com

## 📜 License

This project is open-source and available under the **MIT License**.  
📖 See the full license details in the [LICENSE](./LICENSE) file.
