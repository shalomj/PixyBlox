# PixyBlox

PixyBlox is a Photo Tile Maker app made with React and Laravel. Users can choose a layout and upload an image file to each block or tile on the layout. Users can drag and zoom on the images to customize the tile and save it to generate a tiled image.

### Screenshots

![Full layout collage](/screenshots/layout-1.png "Layout 1")
![Two column layout collage](/screenshots/layout-2.png "Layout 2")
![Tile layout collage](/screenshots/layout-3.png "Layout 3")

## Installation

Clone the repository.

```bash
git clone https://shalom2315@bitbucket.org/shalom2315/pixyblox.git
```

Go to the directory.

```bash
cd pixyblox
```

## Project folder structure

The project is separated into two directories: `api` (Laravel framework) and `client` (React).

### Laravel API Installation

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
        map: ~/path/to/pixyblox/api/folder
        to: /home/vagrant/code
```

Add `pixyblox.test` to the `hosts` file on your machine.

```
192.168.10.10 pixyblox.test
```

Run Homestead development server.

```bash
vagrant up
```

Run migrations

```bash
php artisan migrate
```

PixyBlox uses `public` disk to store files so you need to create a symbolic link in order for the uploaded files to be accessible from the web. More info [here](https://laravel.com/docs/7.x/filesystem#the-public-disk "The Public Disk").

```bash
php artisan storage:link
```

***

### React Installation

Go to `client` directory

```bash
cd client
```

Install React and its dependencies

```bash
npm install
```

Run development web server

```bash
npm start
```

Production build

```bash
npm run build
```

Run build with a static server

```bash
serve -s build
```

Open link provided (e.g) http://localhost:5000