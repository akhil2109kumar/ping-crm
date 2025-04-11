// // src/App.tsx
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MinimalLayout from './layouts/MinimalLayout';
// import ContactsTable from './components/ContactsTable';

// // Mock user for now – replace this with real auth data later
// const mockUser = {
//   id: '123',
//   first_name: 'John',
//   last_name: 'Doe',
//   account: {
//     name: 'Acme Inc.',
//   },
// };

// const HomePage = () => (
//   <MinimalLayout user={mockUser}>
//     <div className="text-xl font-bold">Welcome to your dashboard!</div>
//   </MinimalLayout>
// );

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/contacts" element={<ContactsTable />} />=
//       </Routes>
//     </Router>
//   );
// }

// export default App;





// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MinimalLayout from './layouts/MinimalLayout';
import ContactsTable from './components/ContactsTable';
import { Outlet } from 'react-router-dom';
import OrganizationsPage from './components/OrganizationsPage';
import CreateContactPage from './components/CreateContactPage';

// Mock user for now – replace this with real auth data later
const mockUser = {
  id: '123',
  first_name: 'John',
  last_name: 'Doe',
  account: {
    name: 'Acme Inc.',
  },
};

const HomePage = () => (
  <div className="text-xl font-bold">Welcome to your dashboard!</div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Main layout route */}
        <Route element={<MinimalLayout user={mockUser} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsTable />} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/contacts/create" element={<CreateContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
