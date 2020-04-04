const vision = require("@google-cloud/vision");
const TOKEN_ARG = 2;
const FILENAME_ARG = 3;
const tokenPath = process.argv[TOKEN_ARG];
process.env.GOOGLE_APPLICATION_CREDENTIALS = tokenPath;
const fileName = process.argv[FILENAME_ARG];

(async function save() {
    const client = new vision.ImageAnnotatorClient();

    const [result] = await client.safeSearchDetection(fileName);
    const detections = result.safeSearchAnnotation;

    console.log("Safe search:");
    console.log(`Adult: ${detections.adult}`);
    console.log(`Medical: ${detections.medical}`);
    console.log(`Spoof: ${detections.spoof}`);
    console.log(`Violence: ${detections.violence}`);
    console.log(`Racy: ${detections.racy}`);
})();