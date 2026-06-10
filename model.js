const model = {
  app: {
    page: "overview",
  },

  inputs:
  {
    searchField: "",
    sortBy: "priority",     // Used in both 'overview' and 'search' pages
    filterBy: "all",        // -"-
    sortedErrors: [],       // List sorting errors by severity, priority, and search matching
    // Pages
    addError:
    {
      title: "",
      description: "",
      priority: "",
      severity: "",
      personId: null,
    },
  },
  //

  data: {
    persons: [
      { id: 1, name: "Per" },
      { id: 2, name: "Pål" },
      { id: 3, name: "Espen" },
    ],
    errors: [
      {
        id: 1,
        title: "Login bug",
        description: "Error når du sender inn pålogging skjema",
        severity: "medium",
        priority: "high",
        status: "open",
        personId: 1,
      },
      {
        id: 2,
        title: "Layout på mobilen",
        description: "Layout funker ikke på mobilen",
        severity: "low",
        priority: "medium",
        status: "closed",
        personId: 2,
      },
      {
        id: 3,
        title: "en bug",
        description: "hjelp",
        severity: "low",
        priority: "low",
        status: "closed",
        personId: 2,
      },
      {
        id: 4,
        title: "Tilbake-knappen på innloggingssiden",
        description: "Tilbake-knappen responderer ikke",
        severity: "medium",
        priority: "low",
        status: "open",
        personId: 3,
      },
    ],
  },
};
