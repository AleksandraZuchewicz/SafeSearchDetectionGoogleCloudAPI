const { Builder, By, Key, until } = require("selenium-webdriver");
let fs = require("fs");
let xlsx = require("node-xlsx").default;
const SQL_FILE = "excelInput/data";

const excel = xlsx.parse(fs.readFileSync(`${__dirname}\\..\\${SQL_FILE}.xlsx`));

(async function makeScreens() {
    let driver = await new Builder().forBrowser("chrome").build();
    for (let i = 1; i < excel[0].data.length; i++) {
        try {
            await driver.get(excel[0].data[i][2]).then(
                () => {
                    console.log(`Get succeeded for ${excel[0].data[i][1]}`);
                },
                () => {
                    console.log(`Get failed for ${excel[0].data[i][1]}`);
                }
            );
            await driver.sleep(2000);
            await driver.takeScreenshot().then(function(image) {
                let file = `./multipleUrlsFromExcelSaveSearch/imagesFromExcel/${excel[0].data[i][0]}.png`;
                fs.writeFileSync(file, image, "base64");
            });
        } catch (err) {
            console.log(err);
        }
    }
})();