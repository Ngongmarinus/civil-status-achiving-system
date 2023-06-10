/*/ main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow,ipcMain } = require('electron');
const path = require('path');
//const fs = require('fs');
const mysql= require('mysql');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'advance_db',
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to database!');
});

ipcMain.handle('birth_certificates', (event, newBorn) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO birth_certificates SET ?', newBorn, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
});*/

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mysql = require('mysql2/promise');

// Create the browser window.
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
      contextIsolation:false,
      enableRemoteModule:false,
    }
  });

  mainWindow.loadFile('index.html');
};

// Connect to the database.
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'advance_db'
    });
    console.log('Connected to database!');
    return connection;
  } catch (error) {
    console.error(error);
    return null;
  }
};


// Handle the 'birth_certificates' event from the renderer process.
const handleBirthCertificatesEvent = async (event, newBorn) => {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      throw new Error('Failed to connect to database');
    }

    const sql = 'INSERT INTO birth_certificates (first_name, last_name, date_of_birth, Place_of_Birth, gender, father_name, born_at1, born_on1, ProfessionF, Mother_Name, born_at2, born_on2, ProfessionM) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

const values = [
  newBorn.first_name,
  newBorn.last_name,
  newBorn.date_of_birth,
  newBorn.place_of_birth,
  newBorn.gender,
  newBorn.father_name,
  newBorn.born_at1,
  newBorn.born_on1,
  newBorn.ProfessionF ?? null,
  newBorn.mother_name,
  newBorn.born_at2,
  newBorn.born_on2,
  newBorn.ProfessionM ?? null
];

    const [result] = await connection.execute(sql, values);
    console.log(`Inserted ${result.affectedRows} row(s)`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Handle the 'divorce_certificates' event from the renderer process.
const handleDivorceCertificatesEvent = async (event, divorceAgain) => {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      throw new Error('Failed to connect to database');
    }

    const result = await connection.execute('INSERT INTO divorce_certificates SET ?', { divorceAgain });
    console.log(`Inserted ${result.affectedRows} row(s)`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

async function handleLoginEvent(event, { username, password }) {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      throw new Error('Failed to connect to database');
    }

    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    if (rows.length > 0) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

// When the app is ready, create the window and listen for events.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.handle('birth_certificates', handleBirthCertificatesEvent);
  ipcMain.handle('divorce_certificates', handleDivorceCertificatesEvent);
  ipcMain.handle('login', handleLoginEvent);
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});