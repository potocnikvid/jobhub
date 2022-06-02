(async function jobhub() {
    // Knjižnice
    const { execSync } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;
  
    // Parametri
    let aplikacijaUrl = "http://localhost:4200/";
    let apiUrl = "http://localhost:3000/api/";
    let seleniumStreznikUrl = "http://localhost:4445/wd/hub";
    let brskalnik, jwtZeton;
  
    const axios = require("axios").create({
      baseURL: apiUrl,
      timeout: 5000,
    });
  
    // Obvladovanje napak
    process.on("unhandledRejection", (napaka) => {
      console.log(napaka);
    });
  
    // Počakaj določeno število sekund na zahtevani element na strani
    let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
      await brskalnik.wait(
        () => {
          return brskalnik.findElements(By.xpath(xpath)).then((elementi) => {
            return elementi[0];
          });
        },
        casVS * 1000,
        `Stran se ni naložila v ${casVS} s.`
      );
    };
  
    try {
      before(() => {
        brskalnik = new Builder()
          .forBrowser("chrome")
          .setChromeOptions(
            new chrome.Options()
              .addArguments("start-maximized")
              .addArguments("disable-infobars")
              .addArguments("allow-insecure-localhost")
              .addArguments("allow-running-insecure-content")
          )
          .usingServer(seleniumStreznikUrl)
          .build();
      });
  
      describe("Index - število slik", function () {
        this.timeout(30 * 1000);
        before(() => {
          brskalnik.get(aplikacijaUrl);
        });
  
        it("število slik", async () => {
          await pocakajStranNalozena(brskalnik, 10, "//img");
          let grafi = await brskalnik.findElements(By.xpath("//img"));
          expect(grafi).to.be.an("array").to.have.lengthOf(2);
        });
      });


     describe("Index - število gumbov", function () {
        this.timeout(30 * 1000);
        before(() => {
          brskalnik.get(aplikacijaUrl);
        });
  
        it("število gumbov", async () => {
          await pocakajStranNalozena(brskalnik, 10, "//button");
          let gumbi = await brskalnik.findElements(By.xpath("//button"));
          expect(gumbi).to.be.an("array").to.have.lengthOf(3);
        });
      });

      
      after(async () => {
        brskalnik.quit();
      });
    } catch (napaka) {
      console.log("Med testom je prišlo do napake!");
    }
  })();