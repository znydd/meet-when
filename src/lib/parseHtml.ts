import { isDay, isTime, type EachDay, type User } from "../types/type";

export async function parseHtml(htmlString: string): Promise<User> {
  const parser = new DOMParser();
  const doc: Document = parser.parseFromString(htmlString, "text/html");
  const tableNodes: NodeListOf<HTMLTableElement> =
    doc.querySelectorAll("table");
  const headerCells: NodeListOf<HTMLTableCellElement> =
    tableNodes[0].querySelectorAll("th");
  const rowNodes: NodeListOf<HTMLTableRowElement> =
    tableNodes[0].querySelectorAll("tbody tr");

  const headers = Array.from(headerCells).map(
    (th) => th.textContent?.trim() ?? "",
  );

  const tableData = Array.from(rowNodes).map((row) => {
    const rowObject: Record<string, string> = {};
    const cellNodes = row.querySelectorAll("td");

    // Assign each cell's text to the corresponding header key.
    headers.forEach((header, index) => {
      const cell = cellNodes[index];
      rowObject[header] = cell?.textContent?.trim() ?? "";
    });

    return rowObject;
  });

  const routine: EachDay = {
    SATURDAY: [],
    SUNDAY: [],
    MONDAY: [],
    TUESDAY: [],
    WEDNESDAY: [],
    THURSDAY: [],
  };

  tableData.forEach((row) => {
    let rowTime = row["Time/Day"].replace(/\s|AM|PM/gi, "");
    let [left, right] = rowTime.split("-");
    console.log(right.length);
    if (left.length === 4) {
      left = "0" + left;
    }
    if (right.length === 4) {
      right = "0" + right;
    }
    rowTime = left + "-" + right;

    Object.keys(routine).forEach((key) => {
      if (row[key]) {
        if (isDay(key) && isTime(rowTime)) {
          routine[key].push([row[key], rowTime]);
        }
      }
    });
  });
  // console.log(routine);
  const user: User = {
    userName: "Self",
    routine: routine,
  };

  return user;
}
