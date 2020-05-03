const express = require("express");
const app = express();
const port = 3000;

// note: express's cookie-parser middleware would take only the first value for
// each name, but other servers differ. my production app parses cookies
// similarly to the following
const parseCookies = (cookieStr) => {
  if (!cookieStr) return {};
  return cookieStr.split(";").reduce((cookies, str) => {
    const [name, value] = str.split("=").map((s) => s.trim());
    return { ...cookies, [name]: value };
  }, {});
};

app.get("/needs_cookie", (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const requiredValue = req.query.value || "bar";
  res.status(cookies.foo === requiredValue ? 200 : 400);
  res.send();
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
