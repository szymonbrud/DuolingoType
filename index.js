const puppeteer = require('puppeteer');

const DUOLINGO_PAGE = "https://www.duolingo.com/?isLoggingIn=true";

// If you want to log in automatically, simply enter the login and password below.
const EMAIL = "";
const PASSWORD = "";

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(DUOLINGO_PAGE);
    await page.setViewport({width: 1920, height: 850});

    if(EMAIL !== "" && PASSWORD !== ""){
        await page.waitForTimeout(2000);

        await page.click('[data-test="have-account"]');

        await page.type('#web-ui1', EMAIL);
        await page.type('#web-ui2', PASSWORD);

        await page.click('[data-test="register-button"]');
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' })

        await page.waitForTimeout(4000);
    }   else {
        await page.waitForTimeout(5000);
    }

    const main = async (show = false) => {
        const buttons = await page.$$('span._1deIS button');
        const listenerElement = await page.$('._3L7Fu');

        if(buttons.length === 0 || listenerElement){
            setTimeout(async () => {
                await main()
            }, 500)
        } else {
            if(show){
                await page.$eval('._1_wIY', (element) => {
                    if (element) {
                        element.style.opacity = "1";
                    }
                });
                await page.waitForTimeout(4000);
            } else {
                await page.$eval('._1_wIY', (element) => {
                    if (element) {
                        element.style.opacity = "0";
                    }
                });
            }

            await page.waitForTimeout(300);
            const buttonsData = []

            for (const button of buttons) {
                const text = await button.$eval('span._3PW0K span', spanElement => spanElement.textContent);
                buttonsData.push({
                    button: button,
                    text
                })
            }

            const writeWords = async () => {
                const userInput = await page.evaluate(() => {
                    return prompt('Write here: ');
                });

                if(userInput === null || userInput === undefined) {
                    main(true)
                    return null;
                }

                const words = userInput.split(' ');

                let isAllPass = words.every((word) => buttonsData.find(e => e.text.toLowerCase() === word.toLowerCase()))

                if(isAllPass){
                    for (const word of words) {
                        const found = buttonsData.find(e => e.text.toLowerCase() === word.toLowerCase());
                        await page.waitForTimeout(100);
                        found.button.click();
                    }
                    await page.waitForTimeout(300);
                    await page.click('[data-test="player-next"]');
                    await page.waitForTimeout(300);
                    await page.click('[data-test="player-next"]');
                    await page.waitForTimeout(400);
                    main();
                }   else {
                    await page.$eval('._1_wIY', (element) => {
                        if (element) {
                            element.style.opacity = '1';
                        }
                    });
                    await page.waitForTimeout(300);

                   writeWords();
                }
            }

            writeWords();
        }
    }
    await main()
})();