const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should encapsulate the variables and functions within a Rectangle', async function () {
        const rectangle = await page.evaluate(() => new Rectangle(1, 1) );

        expect(rectangle).toBeDefined();
  });

  it('should pass the variables into the Rectangle as constructor arguments', async function () {
      const rectangle = await page.evaluate(() => new Rectangle(1, 1) );
    
      expect(rectangle.height).toBe(1);
      expect(rectangle.length).toBe(1);
  });

  it('should have a `calculateArea` method that takes no arguments', async function () {
      const area = await page.evaluate(() => {
        const rectangle = new Rectangle(5, 5);
        return rectangle.calculateArea();
      });

      expect(area).toBe(25);
  });
});

