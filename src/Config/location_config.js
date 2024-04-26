import fs from 'fs'
import { WebSocket } from 'websocket';

// Function to fetch data from the endpoint
export function fetchData() {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket('ws://127.0.0.1:8200/locationData');
  
      ws.on('open', () => {
        console.log('WebSocket connection established.');
      });
  
      ws.on('message', (message) => {
        resolve(JSON.parse(message.utf8Data));
        ws.close();
      });
  
      ws.on('error', (error) => {
        console.error('Error fetching data:', error);
        reject(error);
      });
    });
  }

// Function to read data from the config file
export default function readConfig() {
  try {
    const configFile = fs.readFileSync('./Config/config.json');
    return JSON.parse(configFile);
  } 
  catch (error) 
  {
    console.error('Error reading config file:', error);
    return null;
  }
}

// Function to write data to the config file
export function writeConfig(data) {
  try {
    fs.writeFileSync('config.json', JSON.stringify(data, null, 2));
    console.log('Config file updated successfully.');
  } catch (error) {
    console.error('Error writing to config file:', error);
  }
}

// Function to compare and update config if data is different
export async function updateConfig() {
  try {
    const newData = await fetchData();
    const existingData = readConfig();

    if (!existingData || JSON.stringify(newData) !== JSON.stringify(existingData)) {
      writeConfig(newData);
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

