import React from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Amount from "../amount";

describe("Amount", () => {
  describe("render", () => {
    it("with positive amount", () => {
      render(<Amount amount={670707} />);

      expect(screen.getByText("+ "));
      expect(screen.getByDisplayValue("31-May-2021")).toBeInTheDocument();
      expect(screen.getByTestId("date-picker-icon")).toBeInTheDocument();

      // disabled datepickers don't pop up the datepicker popover
      fireEvent.click(screen.getByTestId("date-picker-icon"));
      expect(screen.queryByText("May 2021")).not.toBeInTheDocument();

      const [sign, space, dollars, dot, cents] = amount.props.children;
      expect(sign.props.children).toEqual("+");
      expect(space).toEqual(" ");
      expect(dollars.props.children).toEqual("6,707");
      expect(dot).toEqual(".");
      expect(cents.props.children).toEqual("07");
    });

    it("with negative amount", () => {
      const amount = shallowRenderer(<Amount amount={-670707} />);

      const [sign, space, dollars, dot, cents] = amount.props.children;
      expect(sign.props.children).toEqual("-");
      expect(space).toEqual(" ");
      expect(dollars.props.children).toEqual("6,707");
      expect(dot).toEqual(".");
      expect(cents.props.children).toEqual("07");
    });

    it("with zero amount", () => {
      const amount = shallowRenderer(<Amount amount={0} />);

      const [sign, space, dollars, dot, cents] = amount.props.children;
      expect(sign).toBeUndefined();
      expect(space).toEqual(" ");
      expect(dollars.props.children).toEqual("0");
      expect(dot).toEqual(".");
      expect(cents.props.children).toEqual("00");
    });
  });
});
