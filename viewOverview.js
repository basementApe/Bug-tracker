function overViewHtml()
{
  const filter = model.inputs.filterBy;
  let html = /*HTML*/ `
    <h2>Oversikt</h2>
    <div id="filterSortControls">${filterSortHtml()}</div>
  `;

  for (let error of model.inputs.sortedErrors)
  {
    const person = model.data.persons.find((p) => p.id == error.personId);
    if (filter !== "all" && filter !== error.status)
      continue;
    html += errorCard(error,person);
  }

  return html;
}


