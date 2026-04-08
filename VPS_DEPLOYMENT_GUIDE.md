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
   southernspicesdb
   app*user
   StrongPassword123!
   Inside the MySQL prompt:*
   ```sql
   CREATE DATABASE southern_spices_db;
   CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';
   GRANT ALL PRIVILEGES ON southern_spices_db.* TO 'app_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

---

## Step 4: Install WordPress & WooCommerce (Headless CMS)

If you are hosting your WordPress backend on this same VPS, you need to install PHP and configure a dedicated Nginx block for it.

1. **Create a MySQL Database for WordPress:**
   ```bash
   sudo mysql -u root -p
   ```

```sql
CREATE DATABASE wp_southern_spices;
CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'WpStrongPassword123!';
GRANT ALL PRIVILEGES ON wp_southern_spices.* TO 'wp_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

2. **Install PHP and Extensions:**

   ```bash
   sudo apt install php-fpm php-mysql php-xml php-curl php-gd php-mbstring php-zip -y
   ```

3. **Download and Extract WordPress:**

   ```bash
   mkdir -p /var/www/wordpress
   cd /var/www/wordpress
   wget https://wordpress.org/latest.tar.gz
   tar -xzvf latest.tar.gz --strip-components=1
   sudo chown -R www-data:www-data /var/www/wordpress
   sudo chmod -R 755 /var/www/wordpress
   ```

4. **Configure Nginx for WordPress:**
   Create a new server block for your WordPress site (e.g., `api.yourdomain.com` for the headless backend).

   ```bash
   sudo nano /etc/nginx/sites-available/wordpress
   ```

   _Paste the following:_

   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com; # Use a subdomain for the backend
       root /var/www/wordpress;
       index index.php index.html index.htm;

       location / {
           try_files $uri $uri/ /index.php?$args;
       }

       location ~ \.php$ {
           include snippets/fastcgi-php.conf;
           fastcgi_pass unix:/var/run/php/php8.1-fpm.sock; # Adjust PHP version depending on what was installed (e.g., php8.1 or php8.3)
       }
   }
   ```

   _Enable the site:_

   ```bash
   sudo ln -s /etc/nginx/sites-available/wordpress /etc/nginx/sites-enabled/
   ```

5. **Complete WordPress Setup:**
   Navigate to `http://api.yourdomain.com` in your browser to run the 5-minute install. Provide the database details (`wp_southern_spices`, `wp_user`). Once logged in, install the **WooCommerce** plugin and generate your REST API Keys from WooCommerce Settings > Advanced > REST API.

---

## Step 5: Clone and Setup Your Next.js Project

1. **Clone your repository** (assuming you pushed your code to GitHub/GitLab). Alternatively, you can use FTP/SCP to upload the files.
   ```bash
   mkdir -p /var/www/
   cd /var/www/
   git clone https://github.com/yourusername/your-repo-name.git southernspices
   cd southernspices
   ```
2. **Create the Environment File:**
   ```bash
   nano .env
   ```
   _Paste your environment variables, including the Database URL and WooCommerce API keys you just generated._
   ```env
   DATABASE_URL="mysql://app_user:StrongPassword123!@localhost:3306/southern_spices_db"
   NEXT_PUBLIC_WORDPRESS_URL="https://your-wordpress-site.com"
   WC_API_URL="https://your-wordpress-site.com"
   WC_CONSUMER_KEY="ck_..."
   WC_CONSUMER_SECRET="cs_..."
   ```
   _Press `Ctrl+X`, `Y`, and `Enter` to save._

---

## Step 6: Build and Start the Application

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

## Step 7: Setup Nginx as a Reverse Proxy for Next.js

We need Nginx to map port 80 (HTTP) and 443 (HTTPS) to your Next.js app running on port 3000.

1. **Make sure Nginx is installed** (already installed in Step 4, but verify).
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
   sudo systemctl reload nginx
   ```

---

## Step 8: Secure Your Domains with Free SSL (Let's Encrypt)

1. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```
2. **Generate the SSL certificates** (for both your Next.js frontend and WordPress backend):
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
   ```
   _Follow the prompts (enter your email, agree to the terms)._

Certbot will automatically update your Nginx configuration to force HTTPS for both apps and set up automatic renewals.

---

## Conclusion

Your decoupled application is successfully deployed!

- Headless WordPress & WooCommerce run securely on `api.yourdomain.com`.
- Next.js is managed by PM2 on port 3000 and served via `yourdomain.com`.
- Traffic is securely managed through Nginx and Let's Encrypt SSL.
- Prisma correctly connects to your MySQL databases.
