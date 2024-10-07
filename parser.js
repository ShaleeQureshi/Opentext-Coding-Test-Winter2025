const puppeteer = require("puppeteer");

async function fetchProductData() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.microfocus.com/en-us/products?trial=true", {
      waitUntil: "networkidle2",
    });

    const products = await page.evaluate(() => {
      const productCards = Array.from(document.querySelectorAll(".uk-card"));
      return productCards.map((card) => {
        const productName =
          card.querySelector(".title a")?.innerText.trim() || "";
        const description =
          card.querySelector(".description p")?.innerText.trim() || "";
        const startingLetter = productName.charAt(0).toUpperCase();
        const freeTrialUrl = card.querySelector(".uk-button")?.href || "";

        let supportLinkUrl = "";
        let communityLinkUrl = "";

        // Scan for links in the footer
        const links = card.querySelectorAll(".footer .uk-link");
        links.forEach((link) => {
          const linkText = link.innerText.trim();
          if (linkText === "Community") {
            communityLinkUrl = link.href;
          } else if (linkText === "Support") {
            supportLinkUrl = link.href;
          }
        });

        return {
          productName,
          startingLetter,
          description,
          freeTrialUrl,
          supportLinkUrl,
          communityLinkUrl,
        };
      });
    });

    await browser.close();

    console.log(JSON.stringify(products, null, 2));
  } catch (error) {
    console.log(error);
  }
}

fetchProductData();
