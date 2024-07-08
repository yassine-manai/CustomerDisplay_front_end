const fs = require('fs-extra');
const path = require('path');
const http = require('http');
const https = require('https');

const {
    REACT_APP_SUPABASE_URL_WS: wsip,
    REACT_APP_SUPABASE_URL_PORT: wsport,
  } = process.env;

  
const BANNER_API_URL = `http://${wsip}:${wsport}/get_banner`;
const MAIN_SCREEN_API_URL = `http://${wsip}:${wsport}/get_mainScreen`;



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
        const extension = getImageExtension(image.base64);
        const imagePath = path.join(imagesPath, `${prefix}_${counter}.${extension}`);
        newFiles.add(`${prefix}_${counter}.${extension}`);

        const base64Data = image.base64.split(",")[1];
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

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        protocol.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`Request failed with status code: ${res.statusCode}`));
                }
            });

        }).on('error', (err) => {
            reject(err);
        });
    });
};

const processImages = async (apiResponse, prefix) => {
    if (Array.isArray(apiResponse)) {
        await saveImages(apiResponse, prefix);
        console.log(`${prefix} images processed successfully`);
    } else {
        console.log(`API call was not successful for ${prefix}`);
    }
};

const fetchAndSaveImages = async function () {
    try {
        const [bannerResponse, mainScreenResponse] = await Promise.all([
            fetchData(BANNER_API_URL),
            fetchData(MAIN_SCREEN_API_URL)
        ]);

        await processImages(bannerResponse, 'banner');
        await processImages(mainScreenResponse, 'main_screen');
    } catch (error) {
        console.log(`Exception occurred: ${error.message}`);
    }
};


fetchAndSaveImages();