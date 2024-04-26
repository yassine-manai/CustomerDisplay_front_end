import fs from 'fs';
import { WebSocket } from 'websocket';


const configUrl = '/Config/config.json';

export function fetchDataFromWebSocket() {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://127.0.0.1:8200/locationData');

        ws.on('open', () => {
            console.log('WebSocket connection established.');
        });

        ws.on('message', (message) => {
            const jsonData = JSON.parse(message.utf8Data);
            writeConfig(jsonData); // Write data to JSON file
            resolve(jsonData);
            ws.close();
        });

        ws.on('error', (error) => {
            console.error('Error fetching data:', error);
            reject(error);
        });
    });
}


// Function to read data from the JSON file
export function readDataFromJSONFile() {
    try {
        const configFile = fs.readFileSync('./Config/config.json', 'utf8');
        const configData = JSON.parse(configFile);
        return configData;
    } catch (error) {
        console.error('Error reading data from config file:', error);
        return null;
    }
}

export function jsonData() {
    return new Promise((resolve, reject) => {
        fs.readFile('./Config/config.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                reject(err);
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseError) {
                    console.error('Error parsing JSON data:', parseError);
                    reject(parseError);
                }
            }
        });
    });
}

export async function readData() {
    try {
        const data = await jsonData();
        return data;
    } catch (error) {
        console.error('Error reading data from config:', error);
        return null;
    }
}



export function writeConfig(data) {
    try {
        fs.writeFileSync('./Config/config.json', JSON.stringify(data, null, 2));
        console.log('Config file updated successfully.');
    } catch (error) {
        console.error('Error writing to config file:', error);
    }
}



export async function updateConfig() {
    try {
        const newData = await fetchDataFromWebSocket();
        const existingData = readDataFromJSONFile();

        if (!existingData || JSON.stringify(newData) !== JSON.stringify(existingData)) {
            console.log('Data from endpoint is different:', newData);
        } else {
            console.log('Data from endpoint is the same as the config.');
        }
    } catch (error) {
        console.error('Error updating config:', error);
    }
}



// Function to continuously update config (you can set an interval)
/* async function main()
{
  await updateConfig();
  setInterval(updateConfig, 60000); // Update every minute, adjust as needed
}
*/
/* // JSON data structure
const jsonData = {
    "iconSrc": "pumc",
    "name": "CarPark",
    "exit": "Exit 74"
}; */
