import { TableHead, TableHeader, TableRow } from "@shared/ui/table";

const tableHeader = [
  "Last name",
  "First name",
  "Second name",
  "Balance",
  "Status",
  "Edit info.",
  "Delete client",
];

export const Header = () => (
  <TableHeader>
    <TableRow>
      {tableHeader.map((item, index) => (
        <TableHead className="text-center" key={index}>
          {item}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>
);
