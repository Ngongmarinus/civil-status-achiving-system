$(document).ready(function() {
    // Load the add_employee.html page
    $('#add_employee').load('add_employee.html');
  
    // Show the add_employee.html page when the "Add Employee" button is clicked
    $('#add_employee_btn').click(function() {
      $('#add_employee').show();
    });
  
    // Hide the add_employee.html page when the "Close" button is clicked
    $('#add_employee_close').click(function() {
      $('#add_employee').hide();
    });
  });