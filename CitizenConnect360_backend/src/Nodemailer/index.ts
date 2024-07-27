import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import ejs from 'ejs';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Step 1: Create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

// Step 2: Send Email

// Function to send registration email
export async function sendRegistrationEmail(email: string, name: string) {
  try {
    const emailTemplatePath = path.resolve(__dirname, '../../Templates/register.ejs');
    const renderedHtml = await ejs.renderFile(emailTemplatePath, { name });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome to CitizenConnect360',
      html: renderedHtml
    };

    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully.');
  } catch (error) {
    console.error('Error sending registration email:', error);
  }
}

// Function to send incident report confirmation email
export async function sendIncidentReportConfirmationEmail(email: string, incidentTitle: string) {
  try {
    const emailTemplatePath = path.resolve(__dirname, '../../Templates/incidentReportConfirmation.ejs');
    const renderedHtml = await ejs.renderFile(emailTemplatePath, { incidentTitle });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Incident Report Confirmation',
      html: renderedHtml
    };

    await transporter.sendMail(mailOptions);
    console.log('Incident report confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending incident report confirmation email:', error);
  }
}

// Function to send password reset email
export async function sendPasswordResetEmail(email: string, resetLink: string) {
  try {
    const emailTemplatePath = path.resolve(__dirname, '../../Templates/passwordReset.ejs');
    const renderedHtml = await ejs.renderFile(emailTemplatePath, { resetLink });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset Request',
      html: renderedHtml
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully.');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
}
