import React from "react";
import { render, screen } from "@testing-library/react";
import ApprovalPercent from "./ApprovalPercent";

describe("ApprovalPercent component", () => {
  test("renderiza corretamente o texto da porcentagem", () => {
    render(<ApprovalPercent votePercent={80} degree={80 * 3.6} />);

    // Verifica se o texto "80%" está presente
    const percentageText = screen.getByText("80%");
    expect(percentageText).toBeInTheDocument();
  });
});
