const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const winston = require('winston');

dotenv.config();

const { OPERATOR_ID, SAVE_PATH, SERVER_IP, SERVER_PORT, ZR_ID } = process.env;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logfile.log' })
    ]
});

const getImageExtension = (imageData) => {
    if (imageData.startsWith("data:image/jpeg")) {
        return "jpeg";
    } else if (imageData.startsWith("data:image/png")) {
        return "png";
    } else {
        return "jpg";
    }
};

const saveImages = async (imageData, prefix) => {
    const imagesPath = path.join(__dirname, 'images');
    await fs.ensureDir(imagesPath);

    const existingFiles = new Set(await fs.readdir(imagesPath));
    const newFiles = new Set();
    let counter = 1;

    for (const image of imageData) {
        const extension = getImageExtension(image);
        const imagePath = path.join(imagesPath, `${prefix}_${counter}.${extension}`);
        newFiles.add(`${prefix}_${counter}.${extension}`);

        const base64Data = image.split(",")[1];
        await fs.writeFile(imagePath, base64Data, 'base64');

        counter += 1;
    }

    const filesToRemove = [...existingFiles].filter(file => {
        return file.startsWith(prefix) && !newFiles.has(file);
    });

    for (const file of filesToRemove) {
        await fs.remove(path.join(imagesPath, file));
    }
};

const processImages = (apiResponse) => {
    if (apiResponse.success) {
        const data = apiResponse.data || {};

        // Process bannerImages
        const bannerImages = data.bannerImages || [];
        if (bannerImages.length > 0) {
            logger.info("Processing banner images");
            saveImages(bannerImages, 'banner');
        }

        // Process mainScreenImages
        const mainScreenImages = data.mainScreenimages || [];
        if (mainScreenImages.length > 0) {
            logger.info("Processing main screen images");
            saveImages(mainScreenImages, 'main');
        }
    } else {
        logger.error("API call was not successful");
    }
};

const fetchAndSaveImages = async () => 
    {
    const url = `http://demo.asteroidea.co:8092/internal/api/getAds?operator_id=99700&zr_id=7077`;

    try {
        const response = await axios.get(url);

        if (response.status === 200) {
            const data = response.data;

            if (data.success) {
                const bannerChangeTime = data.data.bannerChangeTime || "N/A";
                const mainScreenChangeTime = data.data.mainScreenChangeTime || "N/A";

                logger.info(`Banner Change Time: ${bannerChangeTime}`);
                logger.info(`Main Screen Change Time: ${mainScreenChangeTime}`);

                processImages(data);

                logger.info("Images processed successfully");
            } else {
                logger.error(`API error: ${data.error}`);
            }
        } else {
            logger.error(`Request failed with status code: ${response.status}`);
        }
    } catch (error) {
        logger.error(`Exception occurred: ${error}`);
    }
};

fetchAndSaveImages();
