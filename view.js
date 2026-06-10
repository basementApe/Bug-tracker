

// ------------ Common ------------- //

function updateView() {
  document.getElementById("app").innerHTML = /*HTML*/ `
        <h1>BugTracker</h1>
        ${createButtonsHtml()}
        ${renderPage()}
    `;
}

function renderPage() {
  if (model.app.page == "overview") {
    return overViewHtml();
  } else if (model.app.page == "search") {
    return searchErrorsHtml();
  } else if (model.app.page == "addErrors") {
    return addErrorsHtml();
  }
}



function errorCard(error,person)
{
  return /*html*/`
      <div class="error-card">
        <h3>${error.title}</h3>
        <p>Description: ${error.description}</p>
        <p>
          Assigned: 
          <b>${person ? person.name : "Ikke satt"}</b>
        </p>
        <p class="severity-${error.severity}">
          Severity: ${error.severity}
        </p>
        <p class="severity-${error.priority}">
          Priority: ${error.priority}
        </p>
        <p>
          Status: ${error.status}
        </p>
        <button onclick="deleteError(${error.id}); refreshSortedFiltered();">Slett</button>
        <button onclick="toggleStatus(${error.id}); refreshSortedFiltered();">
           ${error.status === "open" ? "Merk som closed" : "Merk som open"}
        </button>
      </div>
  `;
}


// ---------------- filtering and sorting buttons ---------------- //

function filterButtonsHtml(filter)
{
  return /*html*/`
    <div class="filter-group">
      <button class="${filter === 'all' ? 'active' : ''}" onclick="changeFilter('all')">Alle</button>
      <button class="${filter === 'open' ? 'active' : ''}" onclick="changeFilter('open')">Open</button>
      <button class="${filter === 'closed' ? 'active' : ''}" onclick="changeFilter('closed')">Closed</button>
    </div>
  `;
}

function sortButtonsHtml(sortBy)
{
  return /*html*/`
    <div class="filter-group">
      <button class="${sortBy === 'priority' ? 'active' : ''}" onclick="model.inputs.sortBy = 'priority'; refreshSortedFiltered();">Prioritet</button>
      <button class="${sortBy === 'severity' ? 'active' : ''}" onclick="model.inputs.sortBy = 'severity'; refreshSortedFiltered();">Alvorlighetsgrad</button>
    </div>
  `;
}

function filterSortHtml()
{
  const filter = model.inputs.filterBy;
  const sortBy = model.inputs.sortBy;
  return /*html*/`
    <label>Status:</label>
    ${filterButtonsHtml(filter)}
    <label>Sorter etter:</label>
    ${sortButtonsHtml(sortBy)}
  `;
}


// ---------------------- page buttons -------------------------- //


function createButtonsHtml() {
  return /*HTML*/ `
  <div class="nav-buttons">
    <button ${isActive("overview")} onclick="selectPage('overview')">Oversikt</button>
    <button ${isActive("search")} onclick="selectPage('search')">Søk</button>
    <button ${isActive("addErrors")} onclick="selectPage('addErrors')">Legg til</button>
  </div>
  `;
}

function isActive(currentPage) {
  return model.app.page == currentPage ? "class='active'" : "";
}

updateApp();
