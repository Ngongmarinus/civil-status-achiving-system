const { app, Menu } = require('electron');

// Create an array of menu items for the File menu
const fileMenuTemplate = [
  {
    label: 'New',
    accelerator: 'CmdOrCtrl+N',
    click() {
      // Handle the "New" menu item click event
    }
  },
  {
    label: 'Open',
    accelerator: 'CmdOrCtrl+O',
    click() {
      // Handle the "Open" menu item click event
    }
  },
  {
    label: 'Save',
    accelerator: 'CmdOrCtrl+S',
    click() {
      // Handle the "Save" menu item click event
    }
  },
  {
    label: 'Save As',
    accelerator: 'CmdOrCtrl+Shift+S',
    click() {
      // Handle the "Save As" menu item click event
    }
  },
  { type: 'separator' },
  {
    label: 'Quit',
    accelerator: 'CmdOrCtrl+Q',
    click() {
      app.quit();
    }
  }
];

// Create an array of menu items for the Edit menu
const editMenuTemplate = [
  {
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  },
  {
    label: 'Redo',
    accelerator: 'CmdOrCtrl+Shift+Z',
    role: 'redo'
  },
  { type: 'separator' },
  {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  },
  {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  },
  {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  },
  {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectAll'
  }
];

// Create an array of menu items for the View menu
const viewMenuTemplate = [
  {
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click(item, focusedWindow) {
      if (focusedWindow) {
        // Reload the current window
        focusedWindow.reload();
      }
    }
  },
  {
    label: 'Toggle Developer Tools',
    accelerator: 'CmdOrCtrl+Shift+I',
    click(item, focusedWindow) {
      if (focusedWindow) {
        // Toggle the developer tools for the current window
        focusedWindow.toggleDevTools();
      }
    }
  }
];

// Create an array of menu items for the Window menu
const windowMenuTemplate = [
  {
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  },
  {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }
];

// Create an array of menu items for the Help menu
const helpMenuTemplate = [
  {
    label: 'Learn More',
    click() {
      // Handle the "Learn More" menu item click event
    }
  }
];

// Create the menu template
const menuTemplate = [
  {
    label: 'File',
    submenu: fileMenuTemplate
  },
  {
    label: 'Edit',
    submenu: editMenuTemplate
  },
  {
    label: 'View',
    submenu: viewMenuTemplate
  },
  {
    label: 'Window',
    submenu: windowMenuTemplate
  },
  {
    label: 'Help',
    submenu: helpMenuTemplate
  }
];

// Create the default menu from the template
const menu = Menu.buildFromTemplate(menuTemplate);

// Set the menu as the application menu
Menu.setApplicationMenu(menu);
module.exports = menuTemplate;