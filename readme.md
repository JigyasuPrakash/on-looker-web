# On Looker Web
[![GitHub issues](https://img.shields.io/github/issues/JigyasuPrakash/on-looker)](https://github.com/JigyasuPrakash/on-looker/issues) [![GitHub forks](https://img.shields.io/github/forks/JigyasuPrakash/on-looker)](https://github.com/JigyasuPrakash/on-looker/network) [![GitHub stars](https://img.shields.io/github/stars/JigyasuPrakash/on-looker)](https://github.com/JigyasuPrakash/on-looker/stargazers) [![GitHub license](https://img.shields.io/github/license/JigyasuPrakash/on-looker)](https://github.com/JigyasuPrakash/on-looker/blob/master/LICENCE) ![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen) ![Server](https://img.shields.io/badge/Server-Express_JS-brightgreen) ![Tesseract](https://img.shields.io/badge/Image_Processing-Tesseract_JS-brightgreen)

---
### Objective
To create an image search engine which uses text keywords as input and find relevent images based on that keyword. The constraint on images is that all images are scanned documents. 

### Approach
- Create a [express] web application which allows client to upload and images.
- Uploaded images are processed using [tesseract JS] and stored onto the server.
- All the extracted data is then stored on to [MongoDB] database as image's meta data.
- Searched keyword is converted into regular expression which is evaluted with the meta data and matched images's url is send as response to the client.

### Features
- Very simple and light weight UI for Client.
- Image processing is done on server side, hence minimal load on client.

### Tech Stack
- Forntend
    - HTML
    - JavaScript
- Backend
    - JavaScript
    - Tesseract JS
    - Node JS
    - Express JS
- Database
    - MongoDB

### Installation

On Looker requires [Node.js](https://nodejs.org/) v10+ and [NPM] v4+ to run.

Install the dependencies

```sh
$ cd on-looker
$ npm install
```

Start the Express Server
```sh
$ npm start
```

Then visit [localhost]

### Versions
| Tag | Description |
|---|---|
|[init]|Repository Initialised
|[v0.1]|Image Uploading Completed|
|[v0.2]|RestFull Api Completed|
|[v0.3]|MongoDB Connected and Heroku Deploy|
|[v1]|Version 1.0 Release|

### Developer
<a href="https://itsjigyasu.me">Jigyasu Prakash</a>

### License
[MIT]

[express]: <http://expressjs.com>
[tesseract JS]: <https://tesseract.projectnaptha.com/>
[MongoDB]: <https://www.mongodb.com/>
[MIT]:  <https://github.com/JigyasuPrakash/on-looker/blob/master/LICENCE>
[init]: <https://github.com/JigyasuPrakash/on-looker/tree/5b4259acf50b967926b7e98c0e3f9dd8ef1f0f65>
[v0.1]: <https://github.com/JigyasuPrakash/on-looker/tree/704330c3df937090757de63e140337fcfa3e2925>
[v0.2]: <https://github.com/JigyasuPrakash/on-looker/tree/f68f6857d9663a53fb255cbaa4a6c9abbe12ed49>
[v0.3]: <https://github.com/JigyasuPrakash/on-looker/tree/413aaa9c991691a21c7e64c75d8dd5deffce4f2a>
[v1]: <https://github.com/JigyasuPrakash/on-looker/tree/b336ce4aa2113a9769619d506a18482435afa061>
[localhost]: <https://localhost:3000>
[NPM]:<https://www.npmjs.com/>
