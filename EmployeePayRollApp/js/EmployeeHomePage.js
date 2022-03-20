let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
  empPayrollList = getEmployeeDataFromStorage();
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
   localStorage.removeItem('editEmp');
});
const getEmployeeDataFromStorage = () => {
  return localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
};

let createInnerHtml = () => {
  let headerHTML =
    "<tr> <th></th> <th>Name</th> <th>Gender</th> <th>Department</th> <th>Salary</th> <th>StartDate</th><th>Actions</th> </tr>";
  let innerHTML = `${headerHTML}`;
  for (const empPayrollData of empPayrollList) {
    innerHTML = `
        ${innerHTML}
    <tr>
    <td>
        <img class="profile" src="${empPayrollData._profilePic}">
    
    </td>
    <td> 
       ${empPayrollData._name}
    </td>
    <td>${empPayrollData._gender}</td>
    <td>
        ${getDeptHtml(empPayrollData._department)}
    </td>
    <td>${empPayrollData._salary}</td>
    <td>${stringifyDate(empPayrollData._startDate)}</td>
    <td>
        <img id = "${empPayrollData._id}" onclick = "remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
        <img   id = "${empPayrollData._id}" onclick = "update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
    </td>
      </tr>  `;
  }

  document.querySelector("#display").innerHTML = innerHTML;
};

const getDeptHtml = (deptList) => {
  let deptHtml = "";
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class = 'dept-label'>${dept}</div>`;
  }
  return deptHtml;
};



const remove = (node) => {
  let employeePayrollData = empPayrollList.find(employeeData => employeeData._id == node.id);
  if (!employeePayrollData) return;
  const index = empPayrollList.map(employeeData => employeeData._id).indexOf(employeePayrollData._id);
  empPayrollList.splice(index, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
};


const update = (node) => {
  let employeePayrollData = empPayrollList.find(employeeData => employeeData._id == node.id);
  if (!employeePayrollData) return;
  localStorage.setItem("editEmp", JSON.stringify(employeePayrollData));
  window.location.replace(site_properties.add_emp_payroll_page);
};


const createEmployeePayrollJSON = () => {
  let empPayrollDB = [
    {
      _id: 1,
      _name: "Prashanth Phad",
      _gender: "male",
      _department: ["Engineer", "Other"],
      _salary: "498700",
      _startDate: "16 Oct 2021",
      _note: "All In One",
      _profilePic: "../assets/profile-images/Ellipse-3.png",
    },
    {
      _id: 5,
      _name: "Jyothi",
      _gender: "female",
      _department: ["Sales", "Finance"],
      _salary: "400000",
      _startDate: "12 Oct 2019",
      _note: "",
      _profilePic: "../assets/profile-images/Ellipse -1.png",
      id: 3,
    },
  ];
  return empPayrollDB;
};