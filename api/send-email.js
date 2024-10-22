// api/send-email.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
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
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email enviado' });
    } catch (error) {
        console.error('Error al enviar el email:', error);
        return res.status(500).json({ message: 'Error al enviar el email', error });
    }
    
}
