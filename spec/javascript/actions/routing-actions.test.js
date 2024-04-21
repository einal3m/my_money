// import reactRouterDom from "react-router-dom";
import {
  routeToTransactions,
  routeToImportTransactions,
  routeToImportHistory,
  routeToCategoryReport,
  routeToSubcategoryReport,
  routeToLoanReport,
} from "actions/routing-actions";
import * as accountActions from "actions/account-actions";
import * as categoryActions from "actions/category-actions";

const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => ({ push: mockPush }),
}));

describe("RoutingActions", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe("routeToTransactions", () => {
    it("sets the current account and routes to the transaction page", () => {
      jest
        .spyOn(accountActions, "setCurrentAccount")
        .mockImplementation(() => {});

      routeToTransactions(22);

      expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
      expect(mockPush).toHaveBeenCalledWith("/transactions");
    });

    it("does not set current account if not provided", () => {
      jest
        .spyOn(accountActions, "setCurrentAccount")
        .mockImplementation(() => {});

      routeToTransactions();

      expect(accountActions.setCurrentAccount).not.toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/transactions");
    });
  });

  describe("routeToImportTransactions", () => {
    it("routes to the import component", () => {
      routeToImportTransactions();
      expect(mockPush).toHaveBeenCalledWith("/import");
    });
  });

  describe("routeToImportHistory", () => {
    it("routes to the import history page", () => {
      jest
        .spyOn(accountActions, "setCurrentAccount")
        .mockImplementation(() => {});
      routeToImportHistory(22);
      expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
      expect(mockPush).toHaveBeenCalledWith("/import-history");
    });
  });

  describe("routeToLoanReport", () => {
    it("routes to the loan report page", () => {
      jest
        .spyOn(accountActions, "setCurrentAccount")
        .mockImplementation(() => {});
      routeToLoanReport(22);
      expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
      expect(mockPush).toHaveBeenCalledWith("/reports/loanReport");
    });
  });

  describe("routeToCategoryReport", () => {
    it("sets the current category and routes to the report", () => {
      jest
        .spyOn(categoryActions, "setCurrentCategory")
        .mockImplementation(() => {});

      routeToCategoryReport(45);

      expect(categoryActions.setCurrentCategory).toHaveBeenCalledWith(45);
      expect(mockPush).toHaveBeenCalledWith("/reports/categoryReport");
    });
  });

  describe("routeToSubcategoryReport", () => {
    it("sets the current category and subcategory and routes to the report", () => {
      jest
        .spyOn(categoryActions, "setCurrentCategory")
        .mockImplementation(() => {});
      jest
        .spyOn(categoryActions, "setCurrentSubcategory")
        .mockImplementation(() => {});

      routeToSubcategoryReport(45, 12);

      expect(categoryActions.setCurrentCategory).toHaveBeenCalledWith(45);
      expect(categoryActions.setCurrentSubcategory).toHaveBeenCalledWith(12);
      expect(mockPush).toHaveBeenCalledWith("/reports/subcategoryReport");
    });
  });
});
