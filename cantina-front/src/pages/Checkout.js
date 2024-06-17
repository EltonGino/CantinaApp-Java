import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
import { v4 as uuidv4 } from 'uuid';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const [orderNumber, setOrderNumber] = useState('');

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    useEffect(() => {
        setTotal(calculateTotal());
        setOrderNumber(`ORD-${uuidv4().slice(0, 8).toUpperCase()}`);
    }, [cart]);

    const handleWhatsAppClick = () => {
        const message = `Por Favor, envie o comprovante de pagamento. Valor total: R$ ${total}, Número do pedido: ${orderNumber}`;
        const phoneNumber = '5588999999999'; // Example number, you can set a default number or use a form input
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.text('Confirmação do pedido', 10, 10);
        doc.text(`Número do pedido: ${orderNumber}`, 10, 20);
        doc.text('Produtos:', 10, 30);
        doc.text('Nome           Descrição        Quantidade  Preço', 10, 40);
        cart.forEach((item, index) => {
            doc.text(`${item.name}  ${item.description}  ${item.quantity}  $${item.price}`, 10, 50 + (index * 10));
        });
        doc.text(`Total: R$${total}`, 10, 60 + (cart.length * 10));
        doc.addPage();
        doc.text('QR Code para pagamento', 10, 10);
        doc.addImage(document.querySelector('canvas').toDataURL(), 'PNG', 10, 20);
        doc.save(`order-confirmation-${orderNumber}.pdf`);
    };

    const handleCompleteOrder = () => {
        handleGeneratePDF();
        clearCart();
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Checkout</h1>
            {cart.map(item => (
                <div key={item.id} className="card mb-3" style={{ width: '18rem' }}>
                    <img
                        src={item.pictureUrl}
                        className="card-img-top"
                        alt={item.name}
                        style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description}</p>
                        <p className="card-text font-weight-bold">${item.price} x {item.quantity}</p>
                    </div>
                </div>
            ))}
            <h2>Total: R${total}</h2>
            <QRCode value={`Total: $${total}`} />
            <button onClick={handleWhatsAppClick} className="btn btn-info mt-2">Enviar o comprovante via WhatsApp</button>
            <button onClick={handleCompleteOrder} className="btn btn-success mt-2">Gerar o PDF e completar o pedido</button>
        </div>
    );
};

export default Checkout;
