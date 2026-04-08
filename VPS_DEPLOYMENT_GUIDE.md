# Deploying Next.js + Prisma + MySQL to Hostinger VPS

This guide walks you through deploying your Next.js application (configured with Prisma, MySQL, and WooCommerce API connections) onto an unmanaged Hostinger VPS running Ubuntu.

## Prerequisites
- A Hostinger VPS plan (Ubuntu 22.04 or 24.04 recommended).
- A registered Domain Name pointing your A record to the VPS IP address.
- SSH access to your Hostinger VPS.

---

## Step 1: Connect to Your VPS and Update System

1. Open your terminal and connect to the VPS via SSH:
   ```bash
   ssh root@your_vps_ip_address
   ```
2. Update the system packages:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

## Step 2: Install Node.js, NPM, and PM2

We will use Node Version Manager (NVM) to install Node.js.

1. **Install NVM:**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   source ~/.bashrc
   ```
2. **Install the latest LTS version of Node.js:**
   ```bash
   nvm install --lts
   ```
3. **Install PM2 (Process Manager) globally**: PM2 keeps your Next.js app running in the background and restarts it if it crashes.
   ```bash
   npm install -g pm2
   ```

---

## Step 3: Install and Configure MySQL

If you are hosting the database on the same VPS:

1. **Install MySQL Server:**
   ```bash
   sudo apt install mysql-server -y
   ```
2. **Secure the installation** (follow the prompts to set up a root password):
   ```bash
   sudo mysql_secure_installation
   ```
3. **Log into MySQL and create your database & user:**
   ```bash
   sudo mysql -u root -p
   ```
   *Inside the MySQL prompt:*
   ```sql
   CREATE DATABASE southern_spices_db;
   CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';
   GRANT ALL PRIVILEGES ON southern_spices_db.* TO 'app_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

---

## Step 4: Clone and Setup Your Project

1. **Clone your repository** (assuming you pushed your code to GitHub/GitLab). Alternatively, you can use FTP/SCP to upload the files.
   ```bash
   mkdir /var/www/
   cd /var/www/
   git clone https://github.com/yourusername/your-repo-name.git southernspices
   cd southernspices
   ```
2. **Create the Environment File:**
   ```bash
   nano .env
   ```
   *Paste your environment variables, including the new Database URL. Remember to add your WooCommerce API keys.*
   ```env
   DATABASE_URL="mysql://app_user:StrongPassword123!@localhost:3306/southern_spices_db"
   NEXT_PUBLIC_WOOCOMMERCE_URL="https://your-wordpress-site.com"
   WOOCOMMERCE_CONSUMER_KEY="ck_..."
   WOOCOMMERCE_CONSUMER_SECRET="cs_..."
   ```
   *Press `Ctrl+X`, `Y`, and `Enter` to save.*

---

## Step 5: Build and Start the Application

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Generate Prisma Client & Sync Database:**
   ```bash
   npx prisma generate
   npx prisma db push  # Or `npx prisma migrate deploy` if using migrations
   ```
3. **Build the Next.js Production App:**
   ```bash
   npm run build
   ```
4. **Start the app with PM2:**
   ```bash
   pm2 start npm --name "southernspices" -- start
   ```
5. **Ensure PM2 restarts the app on server reboot:**
   ```bash
   pm2 startup
   pm2 save
   ```

---

## Step 6: Setup Nginx as a Reverse Proxy

We need Nginx to map port 80 (HTTP) and 443 (HTTPS) to your Next.js app running on port 3000.

1. **Install Nginx:**
   ```bash
   sudo apt install nginx -y
   ```
2. **Create a Server Block Configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/southernspices
   ```
3. **Paste the following configuration** (replace `yourdomain.com` with your actual domain):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
4. **Enable the site and restart Nginx:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/southernspices /etc/nginx/sites-enabled/
   sudo nginx -t     # Test to ensure no syntax errors
   sudo systemctl restart nginx
   ```

---

## Step 7: Secure Your Domain with Free SSL (Let's Encrypt)

1. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```
2. **Generate the SSL certificate:**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```
   *Follow the prompts (enter your email, agree to the terms).*

Certbot will automatically update your Nginx configuration to force HTTPS and set up automatic renewals.

---

## Conclusion
Your application is successfully deployed!
- Next.js is managed by PM2 on port 3000.
- Nginx intercepts web traffic securely and delegates it to Next.js.
- Your MySQL Database runs alongside it reliably configured with Prisma.
