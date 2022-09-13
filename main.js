document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const setStatusClosed = (id) => {
	const issues = JSON.parse(localStorage.getItem('issues'));
	const currentIssue = issues.find((issue) => issue.id === id.toString());
	currentIssue.status = 'Closed';
	localStorage.setItem('issues', JSON.stringify(issues));
	fetchIssues();
};

const deleteIssue = id => {
  console.log(id);
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id !== id.toString())
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  issueCounter();
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML += `
    <div class="well">
      <h6>Issue ID: ${id} </h6>
      <p><span class="label ${status === 'Open' ? 'label-info' : 'label-warning'}"> ${status} </span></p>
      <h3> ${status === 'Open' ? description : `<del style="color:gray">${description}</del>`} </h3>
      <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
      <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
      <button onclick="setStatusClosed(${id})" class="btn btn-warning" ${status === 'Closed' && 'disabled'}>Close</button>
      <button onclick="deleteIssue(${id})" class="btn btn-danger" ${status === 'Open' && 'disabled'}>Delete</button>
    </div>
    `;
  }
}

const issueCounter = () => {
  const issueCounter = document.getElementById('issue-counter');
  const issues = JSON.parse(localStorage.getItem('issues'));
  issueCounter.innerText = issues.length;
  issueVariant('issue-open','Open');
  issueVariant('issue-closed','Closed');
}

const issueVariant = (elementId,status) => {
  const issueElement = document.getElementById(elementId);
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issueCount = issues.filter(issue => issue.status === status)
  issueElement.innerText = issueCount.length;
}