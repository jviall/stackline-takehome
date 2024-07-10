import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { parseISO } from "date-fns";

const selectSales = (state: RootState) => state.product.sales;

export const selectRetailSalesData = createSelector([selectSales], (sales) =>
  sales.map((sale) => ({
    x: parseISO(sale.weekEnding),
    y: sale.retailSales,
  }))
);

export const selectWholesaleSalesData = createSelector([selectSales], (sales) =>
  sales.map((sale) => ({
    x: parseISO(sale.weekEnding),
    y: sale.wholesaleSales,
  }))
);

export const selectRetailerMarginData= createSelector([selectSales], (sales) =>
  sales.map((sale) => ({
    x: parseISO(sale.weekEnding),
    y: sale.retailerMargin,
  }))
);

export const selectUnitsSoldData = createSelector([selectSales], (sales) =>
  sales.map((sale) => ({
    x: parseISO(sale.weekEnding),
    y: sale.unitsSold,
  }))
);

export const selectWeekEndingDates = createSelector([selectSales], (sales) =>
  sales.map((sale) => parseISO(sale.weekEnding))
);
