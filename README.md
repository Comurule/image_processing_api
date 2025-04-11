# Image Processing Service

### Description ###

#### Quick summary:
An image processing service for the CMS in our casino platform. The service will process images uploaded by operators before they are sent to the CDN. Key functionality includes image conversion to WebP format, generating type-specific image variations, and providing a cropping endpoint.

### How to Setup? ###

To run this application, you'll need 
- [Git](https://git-scm.com)  
- [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.
- [Yarn](https://yarnpkg.com/getting-started/install)  

* Clone the repository using this command(in your Command Line)
```bash
git clone https://github.com/Comurule/image_processing_api.git
```

* Go into the repository
```bash
cd image_processing_api
```

* Create .env file for environmental variables in your root directory like the __.env.example__ file and provide the necessary details.

* Install dependencies
```bash
yarn install
```

* Run the server
```bash
yarn start:dev # For dev mode
```
```bash
yarn build && yarn start:prod # For prod mode
```
* Check the port on the specified port on the env or 3000

### API End Points ###
The Endpoints documentation can be gotten in [this Postman documentation](https://documenter.getpostman.com/view/11194465/2sB2cYcKzz).
More image types can be added in the [Image Type Config File](./src/modules/image-processor/image-type.config.ts), with the necessary configurations.

### Recommended Improvements
- API unit and integration testing

### Author
Chibuike Umechukwu