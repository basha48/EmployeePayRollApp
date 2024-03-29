let isUpdate = false;
let employeePayRollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
  salaryOutput();
  validateName();
  validateDate();
  checkForUpdate();

});

function salaryOutput() {
  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function() {
      output.textContent = salary.value;

  });
}

function validateName() {
  let name = document.querySelector('#name');
  let textError = document.querySelector('.text-error');
  name.addEventListener('input', function() {
    if(name.value.length == 0 ){
      textError.textContent = "";
      return;
    }
    try{
      (new EmployeePayrollData().name = name.value);
      textError.textContent = "";
    }catch(e){
      textError.textContent = e;
    }
    
  });
}

function validateDate() {
  let day = document.querySelector('#day');
  let month = document.querySelector('#month');
  let year = document.querySelector('#year');
  day.addEventListener('input', checkDate);
  month.addEventListener('input', checkDate);
  year.addEventListener('input', checkDate);
}

function checkDate() {
  let dateError = document.querySelector('.date-error');
  let date = day.value + " " + month.value + " " + year.value;
  try {
      checkStartDate(new Date(Date.parse(date)));
      dateError.textContent = "";
  } catch (e) {
      dateError.textContent = e;
  }

}

function checkStartDate(startDate) {
  let currentDate = new Date();
  if (startDate > currentDate) {
      throw "Start date is a future date"
  }
  let differnce = Math.abs(currentDate.getTime() - startDate.getTime());
  let date = differnce / (1000 * 60 * 60 * 24) ;
  if (date > 30) {
      throw "Start date is beyond 30 days";
  }

}

function save(event) {
  event.preventDefault();
  event.stopPropagation();
  try {
    setemployeePayRollObj();
       createAndUpdateStorage();
        resetButton();
      window.location.replace("../pages/EmployeePayrollHomePage.html");
  } catch (e) {
    alert(e);
      return;
  }

}

function setemployeePayRollObj ()
{
  // employeePayRollObj._id = createEmployeeId();
  employeePayRollObj._name = getInputValueByID('#name');
  employeePayRollObj._salary = getInputValueByID('#salary');
  employeePayRollObj._notes = getInputValueByID('#notes');
  employeePayRollObj._profilePic = getSelectedValues('[name=profile]').pop();
  employeePayRollObj._gender = getSelectedValues('[name=gender]').pop();
  employeePayRollObj._department = getSelectedValues('[name=department]');
  let date = getInputValueByID('#day') + " " + getInputValueByID('#month') + " " + getInputValueByID('#year');
  employeePayRollObj._startDate = date;
}
function createEmployeePayroll() {
  let employeePayrollData = new EmployeePayrollData();
  try {
      employeePayrollData.name = getInputValueByID('#name');
      employeePayrollData.salary = getInputValueByID('#salary');
      employeePayrollData.notes = getInputValueByID('#notes');
      employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
      employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
      employeePayrollData.department = getSelectedValues('[name=department]');
  } catch (e) {
      setTextValue('.text-error', e);
  }
  try {
      let date = getInputValueByID('#day') + " " + getInputValueByID('#month') + " " + getInputValueByID('#year')
      employeePayrollData.startDate = new Date(Date.parse(date));
  } catch (e) {
      setTextValue('.date-error', e);
  }

  employeePayrollData.id = createEmployeeId();
  alert(employeePayrollData.toString());
  return employeePayrollData;
}




function getInputValueByID(id) {
  let value = document.querySelector(id).value;
  return value;
}

function setTextValue(className, value) {
  let textError = document.querySelector(className);
  textError.textContent = value;
}

function getSelectedValues(propertyValue) {
  let allItems = document.querySelectorAll(propertyValue);
  let setItems = [];
  allItems.forEach(item => {
      if (item.checked) {
          setItems.push(item.value);
      }
  });
  return setItems;
}


function setSelectedValues(propertyValue,value) {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      if (Array.isArray (value)) {
        if(value.includes(item.value))
        item.checked = true;
      }
      else if (item.value === value)
      item.checked = true;
      
  });
}

function createAndUpdateStorage() {
 
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeePayrollList) {
    let employeePayrollData = employeePayrollList.find(empData => empData._id == employeePayRollObj._id)
    if (!employeePayrollData ) {
      employeePayrollList.push(createEmployeePayrollData());
    }
      else{
        const index = employeePayrollList.map(employeeData => employeeData._id).indexOf(employeePayrollData._id);
        employeePayrollList.splice(index, 1,createEmployeePayrollData(employeePayrollData._id));
      }
    }else{
      employeePayrollList = [createEmployeePayrollData()];
    }
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
  alert(employeePayrollList.toString());
}


function createEmployeePayrollData(id){
  let employeePayrollData = new EmployeePayrollData();
  if(!id) employeePayrollData.id =  createEmployeeId();
  else
  employeePayrollData.id = id;
  setemployeePayrollData(employeePayrollData);
  return employeePayrollData;
}


function setemployeePayrollData(employeePayrollData){

  try{
    employeePayrollData.name = employeePayRollObj._name;

  }
  catch(e){
    setTextValue('.text-error',e);
    throw e;
  }
  employeePayrollData.salary =  employeePayRollObj._salary; 
  employeePayrollData.notes = employeePayRollObj._notes;
  employeePayrollData.profilePic = employeePayRollObj._profilePic;
  employeePayrollData.gender = employeePayRollObj._gender ;
  employeePayrollData.department = employeePayRollObj._department;
  try{
    employeePayrollData.startDate = new Date(Date.parse(employeePayRollObj._startDate));
  }
catch(e){
  setTextValue('.text-error',e);
    throw e;

}
alert(employeePayrollData.toString());
}
function resetButton() {
  setValue('#name', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary', '');
  setValue('#notes', '');
  setSelectedIndex('#day', 0);
  setSelectedIndex('#month', 0);
  setSelectedIndex('#year', 0);
}

function setValue(id, value) {
  let element = document.querySelector(id);
  element.value = value;
}

function unsetSelectedValues(propertyValue) {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      item.selected = false;
  });
}

const setSelectedIndex = (id,index) =>{
  const element = document.querySelectorAll(id);
  element.setSelectedIndex = index;
}
const createEmployeeId = () => {
  let employeeId = localStorage.getItem("EmployeeID");
  employeeId = !employeeId ? 1 : (parseInt(employeeId) + 1).toString();
  localStorage.setItem("EmployeeID", employeeId);
  return employeeId;
};

const checkForUpdate = () =>{
  const employeePayRollJson = localStorage.getItem('editEmp');
  isUpdate = employeePayRollJson ? true : false;
  if(!isUpdate)
    return
    employeePayRollObj =JSON.parse(employeePayRollJson);
    setForm();
}

const setForm = () =>{
  setValue('#name', employeePayRollObj._name);
  setSelectedValues('[name=profile]', employeePayRollObj._profilePic);
  setSelectedValues('[name=gender]', employeePayRollObj._gender);
  setSelectedValues('[name=department]', employeePayRollObj._department);
  setValue('#salary', employeePayRollObj._salary);
  setValue('#notes', employeePayRollObj._notes);
  let date =stringifyDate(employeePayRollObj._startDate).split(" ");
  setValue('#day', date[0]);
  setValue('#month', date[1]);
  setValue('#year', date[2]);
}