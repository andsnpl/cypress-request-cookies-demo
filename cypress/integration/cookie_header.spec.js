describe("using Cookie header in request", () => {
  beforeEach(() => {
    cy.setCookie("foo", "bar");
  });

  it("should send a different cookie", () => {
    cy.request({
      url: "/needs_cookie?value=quux",
      headers: {
        Cookie: "foo=quux",
      },
    });
  });
});
