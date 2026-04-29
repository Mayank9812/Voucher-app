import Login from './Component/Login'
import AuthProvider, { useAuth } from './Component/AuthContext'
import DashBoard from './Component/DashBoard'
import Vouchers from './Component/Vouchers'
import VoucherForm from './Component/VoucherForm'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function PrivateRoute({ children }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/" />

  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />

          <Route
            path="/vouchers"
            element={
              <PrivateRoute>
                <Vouchers />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-voucher"
            element={
              <PrivateRoute>
                <VoucherForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-voucher/:id"
            element={
              <PrivateRoute>
                <VoucherForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}