import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import BadgeList from "./BadgeList";

jest.mock("../SmallBadge/SmallBadge", () => (props) => (
  <div data-testid="mock-badge" {...props}>
    {props.children}
  </div>
));

jest.mock("@mui/material", () => {
  const original = jest.requireActual("@mui/material");
  return {
    ...original,
    Stack: ({ children, ...rest }) => (
      <div data-testid="mock-stack" {...rest}>
        {children}
      </div>
    ),
  };
});

describe("BadgeList", () => {
  test("não renderiza nada quando items está vazio", () => {
    const { container } = render(<BadgeList items={[]} />);
    expect(container).toBeEmptyDOMElement(); // sem node access
  });

  test("não renderiza quando items não é array", () => {
    const { container } = render(<BadgeList items={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renderiza cada item dentro de SmallBadge mockado", () => {
    const items = ["A", "B", "C"];

    render(<BadgeList items={items} />);

    const badges = screen.getAllByTestId("mock-badge");
    expect(badges).toHaveLength(3);

    // verifica que cada badge renderizou o item certo
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("passa badgeProps para cada SmallBadge", () => {
    const items = ["X"];
    const badgeProps = { "data-test-prop": "ok" };

    render(<BadgeList items={items} badgeProps={badgeProps} />);

    const badge = screen.getByTestId("mock-badge");
    expect(badge).toHaveAttribute("data-test-prop", "ok");
  });

  test("passa stackProps para o Stack mockado", () => {
    const stackProps = { "data-stack": "123" };

    render(<BadgeList items={["A"]} stackProps={stackProps} />);

    const stack = screen.getByTestId("mock-stack");

    expect(stack).toHaveAttribute("data-stack", "123");
  });

  test("usa getKey customizado", () => {
    const items = ["A", "B"];
    const getKey = jest.fn((item, idx) => `custom-${idx}`);

    render(<BadgeList items={items} getKey={getKey} />);

    // getKey deve ser chamado para cada item
    expect(getKey).toHaveBeenCalledTimes(2);
    expect(getKey).toHaveBeenCalledWith("A", 0);
    expect(getKey).toHaveBeenCalledWith("B", 1);
  });
});
