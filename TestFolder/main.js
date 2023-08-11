const { app, BrowserWindow, ipcMain } = require('electron');
//const mysql = require('mysql');
const mysql = require('mysql');
const menuTemplate = require('./menu.js');
const path = require('path');
//const { ipcMain } = require('electron');
const { dialog } = require('electron');


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      
    },
  });

  mainWindow.loadFile('register.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

// Database configuration


const db = mysql.createConnection({
 host: '127.0.0.1',
 port: '3306',
  user: 'root',
  password:'ngong653256226MARINUS',
  database: 'ferdsilink'
});

try {
  db.connect();
  console.log('Connected to MySQL database with ID ' + db.threadId);
} catch (error) {
  console.error('Error connecting to MySQL database: ' + error.stack);
} finally {
  // Don't forget to close the connection when you're done
  //connection.end();
}

 // Handle form submission from renderer process
ipcMain.on('form-submission', (event, data) => {
  const { tableName, rowData } = data;

  // Insert data into the appropriate table
  switch (tableName) {
    case 'AEmployees':
      const {employee_id, firstName, lastName, address, phoneNumber, email, dateOfBirth, gender } = rowData;
      db.query(`INSERT INTO AEmployees (employee_id, first_name, last_name, address, phone_number, email, date_of_birth, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [employee_id, firstName, lastName, address, phoneNumber, email, dateOfBirth, gender],
        (err, results) => {
          if (err) {
            console.error(err.message);
            event.reply('form-submission-response', { success: false, message: 'Failed to submit form data.' });
          } else {
            dialog.showMessageBox({
              type: 'warning',
              title: 'Alert',
              message: 'Inserted new employee record with ID: results.insertId',
              buttons: ['OK']
            })
            
            console.log('Inserted new employee record with ID:', results.insertId);
            event.reply('form-submission-response', { success: true, message: 'Form data submitted successfully.' });
          }
        });
      break;

    case 'BJob_titles':
      const {job_title_id, jobTitleName, jobDescription, requiredQualifications } = rowData;
      db.query(`INSERT INTO BJob_titles (job_title_id, job_title_name, job_description, required_qualifications) VALUES (?, ?, ?, ?)`,
        [job_title_id, jobTitleName, jobDescription, requiredQualifications],
        (err, results) => {
          if (err) {
            console.error(err.message);
            event.reply('form-submission-response', { success: false, message: 'Failed to submit form data.' });
          } else {
            console.log('Inserted new job title record with ID:', results.insertId);
            event.reply('form-submission-response', { success: true, message: 'Form data submitted successfully.' });
          }
        });
      break;

    case 'CDepartments':
      const {department_id, departmentName, departmentHead } = rowData;
      db.query(`INSERT INTO CDepartments (department_id, department_name, department_head) VALUES (?, ?, ?)`,
        [department_id, departmentName, departmentHead],
        (err, results) => {
          if (err) {
            console.error(err.message);
            event.reply('form-submission-response', { success: false, message: 'Failed to submit form data.' });
          } else {
            console.log('Inserted new department record with ID:', results.insertId);
            event.reply('form-submission-response', { success: true, message: 'Form data submitted successfully.' });
          }
        });
      break;

    case 'Employee_employment_history':
      const {employee_id1, jobTitleId, departmentId, startDate, endDate, salary } = rowData;
      db.query(`INSERT INTO Employee_employment_history (employee_id1, job_title_id, department_id, start_date, end_date, salary) VALUES (?, ?, ?, ?, ?, ?)`,
        [employee_id1, jobTitleId, departmentId, startDate, endDate, salary],
        (err, results) => {
          if (err) {
            console.error(err.message);
            event.reply('form-submission-response', { success: false, message: 'Failed to submit form data.' });
          } else {
            console.log('Inserted new employment history record with ID:', results.insertId);
            event.reply('form-submission-response', { success: true, message: 'Form data submitted successfully.' });
          }
        });
      break;

      case 'Customers':
      const { first_name, last_name, Email, phone_number, address_line, city, country, service } = rowData;
      db.query(`INSERT INTO Customers (first_name, last_name, Email, phone_number, address_line,  city, country, service) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, Email, phone_number, address_line, city, country, service],
        (err, results) => {
          if (err) {
            console.error(err.message);
            event.reply('form-submission-response', { success: false, message: 'Failed to submit form data.' });
          } else {
            console.log('Inserted new customer record with ID:', results.insertId);
            event.reply('form-submission-response', { success: true, message: 'Form data submitted successfully.' });
          }
        });
      break;

    case 'FBenefits':
      const {employee_Id, healthInsurance, retirementPlan, vacationDays, sickDays } = rowData;
      db.query(`INSERT INTO FBenefits (employee_Id, health_insurance, retirement_plan, vacation_days, sick_days) VALUES (?, ?, ?, ?, ?)`,
        [employee_Id, healthInsurance, retirementPlan, vacationDays, sickDays],
        (err, results) => {
          if (err) {
            console.error(err.message);
            event.reply('form-submission-response', { success: false, message: 'Failed to submit form data.' });
          } else {
            console.log('Inserted new benefits record with ID:', results.insertId);
            event.reply('form-submission-response', { success: true, message: 'Form data submitted successfully.' });
          }
        });
      break;

    case 'Performance_reviews':
      const {employee_iid, reviewDate, reviewScore, reviewerName } = rowData;
      db.query(`INSERT INTO Performance_reviews (employee_iid, review_date, review_score, reviewer_name) VALUES (?, ?, ?, ?)`,
        [employee_iid, reviewDate, reviewScore, reviewerName],
        (err, results) => {
          if (err) {
            console.error(err.message);
            event.reply('form-submission-response', { success: false, message: 'Failed to submit form data.' });
          } else {
            console.log('Inserted new performance review record with ID:', results.insertId);
            event.reply('form-submission-response', { success: true, message: 'Form data submitted successfully.' });
          }
        });
      break;

    case 'Training_records':
      const {employeeId, trainingCourseName, trainingDate, trainerName } = rowData;
      db.query(`INSERT INTO Training_records (employee_id, training_course_name, training_date, trainer_name) VALUES (?, ?, ?, ?)`,
        [employeeId , trainingCourseName, trainingDate, trainerName],
        (err, results) => {
          if (err) {
            console.error(err.message);
            event.reply('form-submission-response', { success: false, message: 'Failed to submit form data.' });
          } else {
            console.log('Inserted new training record with ID:', results.insertId);
            event.reply('form-submission-response', { success: true, message: 'Form data submitted successfully.' });
          }
        });
      break;

    case 'Payroll':
      const {employeeId1, payRate, payPeriod, taxes, deductions } = rowData;
      db.query(`INSERT INTO Payroll (employee_id, pay_rate, pay_period, taxes, deductions) VALUES (?, ?, ?, ?, ?)`,
        [employeeId1 , payRate, payPeriod, taxes, deductions],
        (err, results) => {
          if (err) {
            console.error(err.message);
            event.reply('form-submission-response', { success: false, message: 'Failed to submit form data.' });
          } else {
            console.log('Inserted new payroll record with ID:', results.insertId);
            event.reply('form-submission-response', { success: true, message: 'Form data submitted successfully.' });
          }
        });
      break;

    default:
      event.reply('form-submission-response', { success: false, message: 'Invalid table name.' });
  }
});


// When the app is ready, create the window and retrieve the table content
app.on('ready', () => {
  createWindow();
  retrieveTableContent();
});

// Retrieve the content of the "Job Titles List" table
function retrieveTableContent() {
  db.query('SELECT * FROM bjob_titles', (error, results) => {
    if (error) throw error;

    // Send the table content to the window renderer
    mainWindow.webContents.send('table-content', results);
  });
}

// When the renderer process sends an update request, update the table content
//const { ipcMain } = require('electron');

ipcMain.on('update-table-content', (event, updatedContent) => {
  db.query(
    'UPDATE bjob_titles SET job_title_name = ?, job_description = ?, required_qualifications = ? WHERE `Job Title ID` = ?',
    [updatedContent.job_title_name, updatedContent.job_description, updatedContent.required_qualifications, updatedContent['Job Title ID']],
    (error, results) => {
      if (error) throw error;

      // Display a notification when the update is successful
      mainWindow.webContents.send('update-success-notification');
    }
  );
});

// Define the empdata-retrieval endpoint
ipcMain.handle('data-retrieval', async (event, customers, customerId) => {
  try {
    // Retrieve the employee data from the database
    const query = `SELECT * FROM ${customers} WHERE customer_id = ?`;
    const results = await executeQuery(db, query, [customerId]);
    const customerData = results[0];

    // Return the employee data
    return {
      success: true,
      data: customerData
    };
  } catch (error) {
    // Handle the error
    console.error(error);
    return {
      success: false,
      message: error.message
    };
  }
});

// Define the data-update1 endpoint
ipcMain.handle('data-update', async (event, customers, customerId, data) => {
  try {
    // Update the employee data in the database
    const query = `UPDATE ${customers} SET ? WHERE customer_id = ?`;
    const result = await executeQuery(db, query, [data, customerId]);

    // Check if the update was successful
    if (result.affectedRows === 1) {
      return {
        success: true
      };
    } else {
      throw new Error(`Failed to update data for customer with ID ${customerId}`);
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    return {
      success: false,
      message: error.message
    };
  }
});

// Helper function to execute a SQL query using a database connection
function executeQuery(db, query, queryParams) {
  return new Promise((resolve, reject) => {
    db.query(query, queryParams, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

 

//.........................................................................................................

// Define the empdata-retrieval endpoint
ipcMain.handle('empdata-retrieval', async (event, AEmployees, employeeId) => {
  try {
    // Retrieve the employee data from the database
    const query = `SELECT * FROM ${AEmployees} WHERE employee_id = ?`;
    const results = await executeQuery(db, query, [employeeId]);
    const employeeData = results[0];

    // Return the employee data
    return {
      success: true,
      data: employeeData
    };
  } catch (error) {
    // Handle the error
    console.error(error);
    return {
      success: false,
      message: error.message
    };
  }
});

// Define the data-update1 endpoint
ipcMain.handle('data-update1', async (event, AEmployees, employeeId, data) => {
  try {
    // Update the employee data in the database
    const query = `UPDATE ${AEmployees} SET ? WHERE employee_id = ?`;
    const result = await executeQuery(db, query, [data, employeeId]);

    // Check if the update was successful
    if (result.affectedRows === 1) {
      return {
        success: true
      };
    } else {
      throw new Error(`Failed to update data for employee with ID ${employeeId}`);
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    return {
      success: false,
      message: error.message
    };
  }
});

// Helper function to execute a SQL query using a database connection
function executeQuery(db, query, queryParams) {
  return new Promise((resolve, reject) => {
    db.query(query, queryParams, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

//...............................................................................................................
ipcMain.handle('bdata-retrieval', async (event, fbenefits, benefitId) => {
  try {
    // Retrieve the employee data from the database
    const query = `SELECT * FROM ${fbenefits} WHERE benefit_id = ?`;
    const results = await executeQuery(db, query, [benefitId]);
    const BenefitData = results[0];

    // Return the employee data
    return {
      success: true,
      data: BenefitData
    };
  } catch (error) {
    // Handle the error
    console.error(error);
    return {
      success: false,
      message: error.message
    };
  }
});

// Define the data-update1 endpoint
ipcMain.handle('bdata-update', async (event, fbenefits, benefitId, data) => {
  try {
    // Update the employee data in the database
    const query = `UPDATE ${fbenefits} SET ? WHERE benefit_id = ?`;
    const result = await executeQuery(db, query, [data, benefitId]);

    // Check if the update was successful
    if (result.affectedRows === 1) {
      return {
        success: true
      };
    } else {
      throw new Error(`Failed to update data for benefit with ID ${benefitId}`);
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    return {
      success: false,
      message: error.message
    };
  }
});

// Helper function to execute a SQL query using a database connection
function executeQuery(db, query, queryParams) {
  return new Promise((resolve, reject) => {
    db.query(query, queryParams, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

 //..............................................................................................................

// Define the job-title-data-retrieval endpoint
ipcMain.handle('retrieve-job-title-data', async (event, bjob_titles, jobTitleId) => {
  try {
    // Retrieve the job title data from the database
    const query = `SELECT * FROM ${bjob_titles} WHERE job_title_id = ?`;
    const results = await executeQuery(db, query, [jobTitleId]);
    const jobData = results[0];

    // Return the job title data
    return {
      success: true,
      data: jobData
    };
  } catch (error) {
    // Handle the error
    console.error(error);
    return {
      success: false,
      message: error.message
    };
  }
});

// Define the job-title-data-update endpoint
ipcMain.handle('update-job-title-data', async (event, bjob_titles, jobTitleId, data) => {
  try {
    // Update the job title data in the database
    const query = `UPDATE ${bjob_titles} SET ? WHERE job_title_id = ?`;
    const result = await executeQuery(db, query, [data, jobTitleId]);

    // Check if the update was successful
    if (result.affectedRows === 1) {
      return {
        success: true
      };
    } else {
      throw new Error(`Failed to update data for job title with ID ${jobTitleId}`);
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    return {
      success: false,
      message: error.message
    };
  }
});

// Helper function to execute a SQL query using a database connection
function executeQuery(db, query, queryParams) {
  return new Promise((resolve, reject) => {
    db.query(query, queryParams, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Close the database connection when the app is about to quit
app.on('before-quit', () => {
  db.end((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the ferdsilinks database connection.');
  });
}); 
