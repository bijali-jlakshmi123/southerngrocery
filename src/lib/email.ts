import nodemailer from "nodemailer";

export async function sendOrderEmails(orderData: any, orderId: number) {
  // Define the transporter
  // We use Gmail SMTP but user needs to set EMAIL_USER and EMAIL_PASS in .env
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "southernspicesmarketing@gmail.com",
      pass: process.env.EMAIL_PASS || "", // User needs to generate an App Password in Gmail
    },
  });

  const adminEmail = "southernspicesmarketing@gmail.com";
  const customerEmail = orderData.billing?.email;
  const customerName = orderData.billing?.first_name || "Customer";

  // Create an HTML template for the email
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #4CAF50;">Order Confirmation - #${orderId}</h2>
      <p>Thank you for your order! We have received it and it's now being processed.</p>
      
      <h3>Order Details</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f9f9f9; text-align: left;">
            <th style="padding: 10px; border-bottom: 2px solid #ddd;">Item</th>
            <th style="padding: 10px; border-bottom: 2px solid #ddd;">Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${orderData.line_items.map((item: any) => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">Product ID: ${item.product_id}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h3>Shipping Information</h3>
      <p>
        ${orderData.shipping?.first_name} ${orderData.shipping?.last_name}<br>
        ${orderData.shipping?.address_1}<br>
        ${orderData.shipping?.city}, ${orderData.shipping?.state} ${orderData.shipping?.postcode}<br>
        ${orderData.shipping?.country}
      </p>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
        <p>Southern Spices</p>
      </div>
    </div>
  `;

  // Send to Admin
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "southernspicesmarketing@gmail.com",
      to: adminEmail,
      subject: `New Order Received - #${orderId}`,
      html: htmlContent,
    });
    console.log("Admin alert email sent successfully");
  } catch (error) {
    console.error("Failed to send admin email:", error);
  }

  // Send to Customer
  if (customerEmail) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "southernspicesmarketing@gmail.com",
        to: customerEmail,
        subject: `Your Order Confirmation - #${orderId} - Southern Spices`,
        html: `
          <p>Hi ${customerName},</p>
          ${htmlContent}
        `,
      });
      console.log("Customer email sent successfully");
    } catch (error) {
      console.error("Failed to send customer email:", error);
    }
  }
}
