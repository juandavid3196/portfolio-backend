// api/send-email.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Configuración de CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://jdrr-portfolio.vercel.app'); // Permitir solicitudes desde esta URL
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Cabeceras permitidas

    // Manejo de la solicitud OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Respuesta vacía para solicitudes OPTIONS
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { name, email, message } = req.body;

    // Configuración del transportador de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_LOCAL,
        subject: `Nuevo mensaje de ${name}`,
        text: `email: ${email} - message: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email enviado' });
    } catch (error) {
        console.error('Error al enviar el email:', error);
        return res.status(500).json({ message: 'Error al enviar el email', error });
    }
}
