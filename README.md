## Employee Pairs App

A React + TypeScript + Vite application that calculates and displays pairs of employees who worked together on common projects during overlapping time periods.

Upload a CSV file with employee/project data, and the app will display the results in a sortable, paginated table.

## Getting Started

npm install

npm run dev

Open http://localhost:5173 in your browser.

CSV Format:

Input data:

A CSV file with data in the following format:
EmpID, ProjectID, DateFrom, DateTo

Sample data:
143, 12, 2013-11-01, 2014-01-05
218, 10, 2012-05-16, NULL
143, 10, 2009-01-01, 2011-04-27
...
