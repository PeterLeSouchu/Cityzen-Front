# Cityzen-front

The Cityzen project is a web and mobile web application that allows you to search for activities based on a city. This one is divided into two parts, the front and back, on this repository you will find the front.

To launch the application you need to run the rest back first, and then launch the front, if not already done here is the link of the back repository:
https://github.com/PeterLeSouchu/Cityzen-Back

Once the back is launched, you have 2 choices to launch the front, either you use pnpm if it is already installed, or you use Docker.

### For the 1st method run the following script: :

```bash
pnpm dev
```

### If you do not have pnpm follow these instructions :

1 - Make sure you are on the main branch :

```bash
git checkout main
```

2 - Install Docker on your machine : https://docs.docker.com/get-docker/

3 - Create image with dockerfile :

```bash
docker build -t cityzen-image .
```

4 - Create container with image :

```bash
docker run -d -p 5173:5173 --name cityzen-container cityzen-image
```

5 - Go to the browser on run : localhost:5173

The application runs on a container, in order to allow everyone to launch the front no matter their environment, it is just necessary to install docker

If you want you can see Cityzen here :
https://cityzen-2024-225cd2496173.herokuapp.com/
