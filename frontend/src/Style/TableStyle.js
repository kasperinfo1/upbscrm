
export const rowHeadStyle = (darkMode) => ({
  verticalAlign: "middle",
  whiteSpace: "pre",
  background: darkMode ? "#E2E1F9" : "#484848" ,
  color: darkMode
    ? "black"
    : "white",
  border: "none",
  position: "sticky",
  top: "0rem",
  zIndex: "5",
});

export const rowBodyStyle = (darkMode) => ({
  verticalAlign: "middle",
  whiteSpace: "pre",
  background: darkMode
    ? "var(--secondaryDashMenuColor)"
    : "var(--secondaryDashColorDark)",
  color: darkMode
    ? "var(--secondaryDashColorDark)"
    : "var(--primaryDashMenuColor)",
  borderBottom: '1px solid rgba(0,0,0,.08)',
});
