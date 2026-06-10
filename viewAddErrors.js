
function addErrorsHtml() {
  return /*HTML*/ `
    <h2>Legg til en feil</h2>
    <div class="add-error-form">
      <input type="text" placeholder="Tittel" oninput="updateErrorTitle(this.value)"/>
      <textarea style="resize:none" placeholder="Beskriv feilen" oninput="updateErrorDescription(this.value)"></textarea>
      <label>Alvorlighetsgrad:</label>
      <select id="addErrorSeverity">
        <option value="">-- Velg --</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>Prioritet:</label>
      <select id="addErrorPriority">
        <option value="">-- Velg --</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>Ansvarlig:</label>
      <select id="addErrorPerson">
        <option value="">-- Ikke satt --</option>
        ${model.data.persons.map((p) => `<option value="${p.id}">${p.name}</option>`).join("")}
      </select>
      <button onclick="saveNewErrorCard()">Lagre</button>
    </div>
  `;
}

