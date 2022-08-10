// ----------------------------------------------------------
// -- ALGORITHM BY @RathGate (https://github.com/rathgate) --
// ----------------------------------------------------------

const formatComposable = () => {

    const remove_whitespaces = (str) => {
        return str.replace(/\f|\r\n|\n|\r/gm, ' ');
    }
    
    const text_to_DSPRE = (str="", flow=true, index=39, lines=2) => {

        // Removes potential whitespaces from str.
        str = remove_whitespaces(str)

        // PART 1: DIVIDES STR INTO CHUNKS OF {index} CHARACTERS [default: 39]:
        let chunks = []; 
        // Creates a copy of str without the potential color elements:
        const generate_copy = () => { return str.slice().replace(/\\vFF00\\x0001(\\x0001|あ|ぁ)|\\vFF00\\x0001\\x0000/g, '')}
        let copy = generate_copy();

        while (copy.length > index) {
            // Case 1: Chunk constituted of at least two words, splits on the last whitespace of the chunk.
            if (/ /.test(copy.slice(0, index + 1))) {
                let last_space_index = [...copy.slice(0, index + 1).matchAll(' ')].length - 1;
                chunks.push(str.slice(0, [...str.matchAll(' ')][last_space_index].index));
                str = str.slice([...str.matchAll(' ')][last_space_index].index).replace(/^\s+|$\s+/g, '');

            // Case 2: Chunk is a very long word, splits on the 'index-th' letter of the word.
            } else {
                let count = str.match(/^\\vFF00\\x0001(\\x0001|あ|ぁ)/g) === null 
                ? 0 : str.match(/^\\vFF00\\x0001(\\x0001|あ|ぁ)/g)[0].length;
                chunks.push(str.slice(0, index + count)); str = str.slice(index + count).replace(/^\s+|$\s+/g, '');
            }
            // Updates the copy to the now updated str.
            copy = generate_copy();

        }
        // Adds the last chunk (length < index) to the chunk list.
        chunks.push(str.replace(/^\s+|\s+$/g, ''));

        // PART 2: ADDS NEWLINE CHARACTERS AT THE END OF EACH CHUNK:
        if (chunks.length >= 1) {
            let last_chunk = chunks.pop();
            chunks = chunks.map((chunk, index) => {
                return flow 
                    ? ((index + 1) % lines !== 0 ? chunk += `\\n` : chunk += `\\f`)
                    : ((index + 1) % lines !== 0 ? chunk += `\\n` : chunk += `\\r`)
            });
            chunks.push(last_chunk);
        };

        // RESULT:
        return chunks.join('')
    }

    const DSPRE_to_HTML = (str) => {
        // Replaces color elements as written in DSPRE with HTML-readable CSS 
        //  and removes the extra escape characters.

        var colors = { 
            "\\x0001": "red", "ぁ": "blue", "あ": "green",
        };
        var whitespaces = {
            "\\n":"\n", "\\r":"\r", "\\f": "\n"
        };
        let regex = /\\vFF00\\x0001(\\x0001|あ|ぁ)(.*)\\vFF00\\x0001\\x0000/g
    
        if (str.match(regex) !== null) {
            str = str
                .replace(/\\vFF00\\x0001\\x0000/g, `</span>`)
                .replace(/\\vFF00\\x0001/g, `<span style="color: `)
                .replace(/\\x0001|あ|ぁ/g, function(matched) {
                    return `${colors[matched]}">`;
                });
        };
        return str.replace(/\\n|\\r|\\f/g, function(matched) {
            return whitespaces[matched];
        });
    ;}

    const format = (str, flow=false, index=39, lines=2) => {
        // SECURITY CHECKS:
        if (typeof str !== 'string' || typeof flow !== 'boolean'
        || typeof index !== 'number' || typeof lines !== 'number') {
            console.log("Something went wrong...\n>>>[0]: non-empty string;\n>>>[1]: flow type bool [\\r or \\f] (opt., default=true -> \\r)" +
            "\n>>>[2]: splitting index (opt., default=39)\n>>>[2]: number of lines (opt., default=2)")
            return 1;
        }

        let DSPRE_formatted = text_to_DSPRE(str, flow, index, lines);
        let HTML_formatted = DSPRE_to_HTML(DSPRE_formatted);

        return {DSPRE_formatted, HTML_formatted}
    }

    // EXAMPLES:
    const sentence_1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    const sentence_2 = "I just had this idea.\nMaybe you can pull it off.\rIt’s about this town’s Gym Leader.\rHe’s really lost his enthusiasm lately\nbecause there’ve been so few good\fchallengers worth his time.\rHe’s been so bored, he spends all his\ntime renovating the Gym.\rAnd then the blackout happened...\nThat sure didn’t help lift his mood.\rYou know where I’m going with this,\ndon’t you?\rI need you to give him a battle\nthat’s so hot, it will reignite his\fpassion for battling.\rI’m counting on you, hotshot!\r"
    const sentence_3 = "HELLOOOOOOOOOOOOOOOOOOOOOOOO (yeah that's a shitty exemple)"
    const color_1 = "\\vFF00\\x0001ぁPenguin Pokémon PIPLUP!\\vFF00\\x0001\\x0000! Will you take this Pokémon?"
    const color_2 = "\\vFF00\\x0001\\x0001Chimp Pokémon CHIMCHAR!\\vFF00\\x0001\\x0000!\\n Will you take this Pokémon?"
    const color_3 = "\\vFF00\\x0001あTiny Leaf Pokémon TURTWIG!\\vFF00\\x0001\\x0000!\\r Will you take this Pokémon?"

    return {
        remove_whitespaces,
        text_to_DSPRE, 
        DSPRE_to_HTML,
        format,
    }
}
export default formatComposable