//import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentInformation from '@/pages/Order/PaymentInformation';
import OrderDetailCustomer from "@/pages/Order/OrderDetailCustomer";
import OrderDetailAdmin from "@/pages/Order/OrderDetailAdmin";

import List from '@/pages/Order/OrderList';

const OrderRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/paymentInfo" element={<PaymentInformation />} />
            <Route path="/orderdetail/customer/:orderId" element={<OrderDetailCustomer />} />
            <Route path="/orderdetail/admin/:orderId" element={<OrderDetailAdmin />} />
        </Routes>
    );
}

export default OrderRoute;