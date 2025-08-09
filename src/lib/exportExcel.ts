import * as XLSX from "xlsx";
import { Person } from "@/lib/types";

export function exportPeopleToExcel(people: Person[], filename = "referrals.xlsx") {
  const rows = people.map((p) => ({
    Name: p.name,
    Title: p.title ?? "",
    Company: p.company ?? "",
    Headline: p.headline ?? "",
    URL: p.url ?? "",
  }));
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Referrals");
  const arrayBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
  const blob = new Blob([arrayBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
