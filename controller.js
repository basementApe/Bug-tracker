
// ---------- Common ----------- //

function selectPage(page) {
  model.app.page = page;
  updateApp();
}

/* Erik */
function updateApp()
{
  buildSortedErrors();
  updateView();
  doEventListeners();
}


function doEventListeners()
{
  switch(model.app.page)
  {
    case "addErrors": updateErrorSeverity(); updateErrorPriority(); updateErrorPerson(); break;
    default: break;
  }
}


// --------- sorting and filtering ----------- //

function changeFilter(filter)
{
  model.inputs.filterBy = filter;
  if (model.app.page === "search")
    refreshSortedFiltered();
  else
    updateApp();
}


function buildSortedErrors() 
{
  const rank = { high: 3, medium: 2, low: 1 };
  const primary = model.inputs.sortBy === "severity" ? "severity" : "priority";
  const secondary = primary === "priority" ? "severity" : "priority";
  model.inputs.sortedErrors = [...model.data.errors].sort((a, b) =>
    (rank[b[primary]] - rank[a[primary]]) || (rank[b[secondary]] - rank[a[secondary]])
  );
}


function refreshSortedFiltered()
{
  buildSortedErrors();
  document.getElementById('filterSortControls').innerHTML = filterSortHtml();
  if (model.app.page === 'search')
    document.getElementById('searchResults').innerHTML = displayErrorsHtml();
  else
    updateApp();
}


// ------------ Add/save new error card (addError page) ------------- //

function checkErrorCardValidity()
{
  return (model.inputs.addError.title && model.inputs.addError.description && model.inputs.addError.severity && model.inputs.addError.priority && model.inputs.addError.personId)
}

function saveNewErrorCard()
{
  if (!checkErrorCardValidity())
  {
    alert("Kunne ikke legge til feil. Sjekk at alle feltene er fylt ut.");
    return;
  }

  let temp = 
  {
    id: model.data.errors.length + 1,     // A bit hacky perhaps. Depends on pushing or otherwise appending to the end of the array
    title: model.inputs.addError.title,
    description: model.inputs.addError.description,
    severity: model.inputs.addError.severity,
    priority: model.inputs.addError.priority,
    status: "open",
    personId: model.inputs.addError.personId,
  }

  model.data.errors.push(temp);

  // reset
  model.inputs.addError.title = model.inputs.addError.description = model.inputs.addError.severity = model.inputs.addError.priority = "";
  model.inputs.addError.personId = null;

  alert("Feilen ble lagt til.");
  model.app.page = "overview";
  updateApp();
}


// -------- error card button functionality ---------- //

function toggleStatus(errorId)
{
  const error = model.data.errors.find(e => e.id === errorId);
  if (!error) return;
  error.status = error.status === "open" ? "closed" : "open";
  updateApp();
}


function deleteError(errorId)
{
  const index = model.data.errors.findIndex(e => e.id === errorId);
  if (index === -1) return;

  const error = model.data.errors[index];
  if (error.status === "open")
  {
    alert("Kan ikke slette feilen. Bare feil med status 'closed' kan slettes.");
    return;
  }
  model.data.errors.splice(index, 1);
  updateApp();
}



// --------- event listeners -------- //

function updateErrorSeverity()
{
  const sel = document.getElementById('addErrorSeverity');
  sel.addEventListener('change', (e) => {
    model.inputs.addError.severity = e.target.value;
  });
}

function updateErrorPriority()
{
  const sel = document.getElementById('addErrorPriority');
  sel.addEventListener('change', (e) => {
    model.inputs.addError.priority = e.target.value;
  });
}

function updateErrorPerson()
{
  const sel = document.getElementById('addErrorPerson');
  sel.addEventListener('change', (e) => {
    model.inputs.addError.personId = e.target.value;
  });
}


// ----------- transfer user inputs to model ------------- //

function updateSearchField(input)
{
  model.inputs.searchField = input;
  document.getElementById("searchResults").innerHTML = displayErrorsHtml();
}

function updateErrorTitle(input)
{
  model.inputs.addError.title = input;
}

function updateErrorDescription(input)
{
  model.inputs.addError.description = input;
}


