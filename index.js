const { findByProps } = vendetta.metro;
const { depois } = vendetta.patcher;
const MessageActions = findByProps("sendMessage", "receiveMessage");

function tsundereifyMax(text) {
    if (!text || text.startsWith("/") || text.startsWith("http")) return text;

    let tsundere = text;

    tsundere = tsundere
        .replace(/\b(idiot|dummy|fool|stupid)\b/gi, "b-b-baka")
        .replace(/\b(thanks|thank you)\b/gi, "I-it's not like I'm thanking you or anything, alright?!")
        .replace(/\b(i like|i love)\b/gi, "I-I don't even like")
        .replace(/\b(sorry)\b/gi, "I-it's not my fault anyway")
        .replace(/\b(what|why)\b/gi, "$1 the heck");

    tsundere = tsundere.replace(/\b([a-z])/gi, (match, letter, offset) => {
        if (offset === 0 || Math.random() < 0.4) {
            return `${letter.toLowerCase()}-${letter}`;
        }
        return match;
    });

    const midInterjections = ["... t-tch! ", "... w-whatever! ", "... a-anyway! ", "... hmph! "];
    if (tsundere.length > 20 && Math.random() < 0.5) {
        const words = tsundere.split(" ");
        const midIndex = Math.floor(words.length / 2);
        const randomMid = midInterjections[Math.floor(Math.random() * midInterjections.length)];
        words.splice(midIndex, 0, randomMid);
        tsundere = words.join(" ");
    }

    const prefixes = [
        "H-haah?! ",
        "W-what are you looking at?! ",
        "D-don't get the wrong idea, but... ",
        "Ugh, f-fine! ",
        "N-n-no way! "
    ];

    const endings = [
        " B-BAKA! (/#＞皿＜)/",
        " I-it's not like I did this for you or anything! (ノ°益°)ノ",
        " Shut up! Shut up! SHUT UP! (///-///)",
        " D-don't look at me like that! (>:<)",
        " ...h-hmph! (╯°□°)╯︵ ┻━┻",
        " W-whatever, just take it! (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)"
    ];

    const randomPrefix = Math.random() < 0.6 ? prefixes[Math.floor(Math.random() * prefixes.length)] : "";
    const randomEnding = endings[Math.floor(Math.random() * endings.length)];

    return randomPrefix + tsundere + randomEnding;
}

let unpatch = null;

export default {
    onLoad: () => {
        if (!MessageActions) return;

        unpatch = depois(MessageActions, "sendMessage", (args) => {
            if (args[1] && args[1].content) {
                args[1].content = tsundereifyMax(args[1].content);
            }
        });
    },
    onUnload: () => {
        if (unpatch) unpatch();
    }
};
      
