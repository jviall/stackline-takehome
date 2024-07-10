import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Product } from "../../types/Product";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import "./SalesTable.css";

function SalesTable() {
  const sales = useSelector((state: RootState) => state.product.sales);

  const columnHelper = createColumnHelper<Product["sales"][number]>();
  const [sorting, setSorting] = useState<SortingState>([
    { id: "weekEnding", desc: false },
  ]);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("weekEnding", {
        header: "Week Ending",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("retailSales", {
        header: "Retail Sales",
        cell: (info) => `$${info.getValue().toLocaleString()}`,
      }),
      columnHelper.accessor("wholesaleSales", {
        header: "Wholesale Sales",
        cell: (info) => `$${info.getValue().toLocaleString()}`,
      }),
      columnHelper.accessor("unitsSold", {
        header: "Units Sold",
        cell: (info) => info.getValue().toLocaleString(),
      }),
      columnHelper.accessor("retailerMargin", {
        header: "Retailer Margin",
        cell: (info) => `$${info.getValue().toLocaleString()}`,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: sales,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    enableMultiSort: false,
    state: {
      sorting,
    },
    initialState: {
      sorting: [],
    },
  });

  return (
    <div className="salesTable">
      <h3>Weekly Sales Data</h3>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      <div></div>
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
