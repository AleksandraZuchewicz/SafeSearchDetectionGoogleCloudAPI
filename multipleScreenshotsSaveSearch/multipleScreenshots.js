const vision = require("@google-cloud/vision");
const fs = require("fs");

const TOKEN_ARG = 2;
const SCREENS_FOLDER_ARG = 3;
const tokenPath = process.argv[TOKEN_ARG];
process.env.GOOGLE_APPLICATION_CREDENTIALS = tokenPath;
const testFolder = process.argv[SCREENS_FOLDER_ARG];

(async function save() {
    const client = new vision.ImageAnnotatorClient();
    const files = fs.readdirSync(testFolder);
    for (const file of files) {
        const [result] = await client.safeSearchDetection(`${testFolder}/${file}`);
        const detections = result.safeSearchAnnotation;
        console.log(`Safe search: ${file}`);
        console.log(`Adult: ${detections.adult}`);
        console.log(`Medical: ${detections.medical}`);
        console.log(`Spoof: ${detections.spoof}`);
        console.log(`Violence: ${detections.violence}`);
        console.log(`Racy: ${detections.racy} \n`);
    }
})();