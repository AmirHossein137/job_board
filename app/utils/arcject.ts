import arcject, {
  detectBot,
  fixedWindow,
  shield,
  tokenBucket,
} from "@arcjet/next";

export { detectBot, fixedWindow, shield, tokenBucket };

export default arcject({
  key: process.env.ARCJET_KEY!,
  rules: [],
});
