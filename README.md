# mygario-server

Server for realtime multiplayer game inspired by a popular web application [agar.io](https://agar.io/).

## Table of Contents

* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

## General Information

- Server is written in [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient, reliable
  and scalable
  server-side applications.
- It uses [Socket.IO](https://socket.io/) for realtime communication between server and clients.
- The purpose of this project is to learn how to implement a websocket communication in a realtime web application.

## Technologies Used

- Node.js
- WebSockets
- Docker
- VPS
- gh-actions (CI/CD)

## Setup

Environment requirements:

* Node.js 18 or higher

```bash
# To run this project, first install its dependencies:
yarn
# Then run the server:
yarn start:dev # with hot-reload
yarn start # production mode

# by default the server runs on port 3000
```

## Usage

* The server is deployed on a VPS and runs in a docker container.
* I've set up a reverse proxy with nginx to make it visible for the outside world.
* CI/CD for this project is configured so that with each push to the main branch, the server application Docker image
  is automatically rebuilt and deployed to the VPS.

## Project Status

Project is: _in progress_ / ~~_complete_~~ / ~~_no longer being worked on_~~.

## Room for Improvement

todo: add when complete

## Acknowledgements

- This project's VPS setup with Docker was inspired by [@ablaszkiewicz](https://github.com/ablaszkiewicz).

## Contact

Created by [@bartoszswitalski](https://github.com/bartoszswitalski)