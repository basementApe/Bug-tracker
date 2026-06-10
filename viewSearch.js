
function displayErrorsHtml()
{
  let html = "";
  const filter = model.inputs.filterBy;
  let search = model.inputs.searchField;
  if (!search)
    return "";

  for (let error of model.inputs.sortedErrors)
  {
    const title = error.title.toLowerCase();
    const desc  = error.description.toLowerCase();
    const person = model.data.persons.find((p) => p.id == error.personId);
    if (filter !== "all" && filter !== error.status)
      continue;
    if (title.includes(search) || desc.includes(search))
      html += errorCard(error,person);
  }
  return html;
}

function searchErrorsHtml() {
  let html = /*HTML*/ `
    <h2>Søk</h2>
    <div id="filterSortControls">${filterSortHtml()}</div>
    <input 
      type="text" 
      placeholder="Søk etter feil..." 
      value="${model.inputs.searchField || ''}"
      oninput="updateSearchField(this.value)"
    />
    <div id="searchResults"></div>
  `;
  return html;
}

