# ClassX LMS Frontend

The frontend of ClassX LMS is developed using React and is designed to provide an intuitive and user-friendly interface for managing and participating in courses, assignments, and virtual classrooms.
## About the Project

This frontend project is developed as a part of the Database Management System (DBMS) course by **Sandesh Dhital (THA078BEI034)** and **Saroj Nagarkoti (THA078BEI039)**.

## Features
- **Interactive UI**: Rich user interface components for smooth navigation and interaction.
- **State Management**: Efficient state management using modern React features.
- **API Integration**: Communicates with the backend through RESTful API endpoints.
- **Virtual Classrooms**: Real-time collaboration features integrated using the Stream Video API (incomplete).

## Installation and Usage

### Prerequisites

- Node.js and npm installed on your system.

### Installation Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/sandesh034/classX_Frontend.git
   cd classX_LMS_frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the project root and configure it with the following:

   ```
   VITE_API_BASE_URL='http://localhost:8000/api/v1'
   VITE_STREAM_API_KEY=your stream api key
   VITE_STREAM_API_SECRET=your stream api secret
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Access the application at `http://localhost:5173`.

## Deployment
   - This frontend is hosted on vercel [Link](https://class-x-frontend.vercel.app/).
   - Some of the feature may not work in free version of hosting



## Contributing

We welcome contributions to enhance the ClassX LMS frontend. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License.



