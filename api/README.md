# Laravel API Installation

Go to `api` directory

```bash
cd api
```

Rename `.env.example` file to `.env`. All variables are already configured, no changes needed.

Run composer command to install the Laravel framework and its dependencies.

```bash
composer install
```

Rename `Homestead.yaml.example` file to `Homestead.yaml`

Open the `Homestead.yaml` file and set the path to the PixyBlox folder.

```yaml
folders:
    -
        map: ~/path/to/pixyblox
        to: /home/vagrant/code
```

Run Homestead development server.

```bash
vagrant up
```

Run migrations

```bash
php artisan migrate
```

PixyBlox uses `public` disk to store files so you need to create a symbolic link in order for the uploaded files to be accessible from the web. More info [here](https://laravel.com/docs/7.x/filesystem#the-public-disk "The Public Disk")

```bash
php artisan storage:link
```