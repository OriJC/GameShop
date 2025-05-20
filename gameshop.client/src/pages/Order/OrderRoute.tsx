//import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentInformation from '@/pages/Order/PaymentInformation';
import OrderDetail from "@/pages/Order/OrderDetail";
import List from '@/pages/Order/OrderList';

const OrderRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/paymentInfo" element={<PaymentInformation />} />
            <Route path="/orderdetail/:orderId" element={<OrderDetail />} />
        </Routes>
    );
}

export default OrderRoute;