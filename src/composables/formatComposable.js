// ----------------------------------------------------------
// -- ALGORITHM BY @RathGate (https://github.com/rathgate) --
// ----------------------------------------------------------

const formatComposable = () => {

    const reverse = (str) => {
        return str.replace(/\f|\r\n|\n|\r/gm, ' ');
    }
    
    const format = (str, index=39, lines=2) => {
        let args = [str, index, lines]
        // Non-valid arguments:
        if (args.length === 0 || typeof args[0] !== "string" || args[0].length === 0) {
            console.log("Sorry, it didn't work...\n>>>[0]: non-empty string;\n>>>[1]: splitting index (opt.);\n>>>[2]: Nb of sentences on screen (opt.).");
            return 1;
        }
    
        str = reverse(str);
        // SEPARATING THE STRING IN CHUNKS:
        let chunks = [];
        while (str.length > index) {
            // Case 1: Chunk constituted of at least two words, splits on the last whitespace of the chunk.
            if (str.slice(0, index +1 ).lastIndexOf(' ') !== -1) {
                chunks.push(str.slice(0, str.slice(0, index +1 ).lastIndexOf(' '))); 
                str = str.slice(str.slice(0, index +1 ).lastIndexOf(' ')).replace(/^\s+|$\s+/g, '');
    
            // Case 2: Chunk is a very long word, splits on the 'index-th' letter of the word.
            } else {
                chunks.push(str.slice(0, index)); str = str.slice(index).replace(/^\s+|$\s+/g, '');
            }
        }
        chunks.push(str.replace(/^\s+|$\s+/g, ''));
    
        // ADDING NEWLINES CHAR WHEN MORE THAN 1 CHUNK:
        if (chunks.length >= 1) {
            let last_chunk = chunks.pop();
            chunks = chunks.map((chunk, index) => (index + 1) % lines !== 0 ? chunk += `\\n` : chunk += `\\r`)
            chunks.push(last_chunk);
        }
    
        // RESULT:
        console.log(chunks)
        return chunks.join('')
    }

    const generate_preview = (str) => {
        var colors = { 
            "\\x0001": "red",
            "ぁ": "blue",
            "あ": "green",
        }
        var whitespaces = {
            "\\n":"\n", "\\r":"\r", "\\f": "\f"
        }
        let regex = /\\vFF00\\x0001(\\x0001|あ|ぁ)(.*)\\vFF00\\x0001\\x0000!/
    
        if (str.match(regex) !== null) {
            str = str
                .replace(/\\vFF00\\x0001\\x0000!/g, `</span>`)
                .replace(/\\vFF00\\x0001/g, `<span style="color: `)
                .replace(/\\x0001|あ|ぁ/g, function(matched) {
                    return `${colors[matched]}">`;
                });
        }
        return str.replace(/\\n|\\r|\\f/g, function(matched) {
            return whitespaces[matched];
        })
    }
    
        // EXAMPLES
    const sentence_1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    const sentence_2 = "I just had this idea. Maybe you can pull it off. It’s about this town’s Gym Leader. He’s really lost his enthusiasm lately because there’ve been so few good challengers worth his time. He’s been so bored, he spends all his time renovating the Gym. And then the blackout happened... That sure didn’t help lift his mood. You know where I’m going with this, don’t you? I need you to give him a battle that’s so hot, it will reignite his passion for battling. I’m counting on you, hotshot!"
    const sentence_3 = "HELLOOOOOOOOOOOOOOOOOOOOOOOO (yeah that's a shitty exemple)"
    const reverse_1 = "I just had this idea.\nMaybe you can pull it off.\rIt’s about this town’s Gym Leader.\rHe’s really lost his enthusiasm lately\nbecause there’ve been so few good\fchallengers worth his time.\rHe’s been so bored, he spends all his\ntime renovating the Gym.\rAnd then the blackout happened...\nThat sure didn’t help lift his mood.\rYou know where I’m going with this,\ndon’t you?\rI need you to give him a battle\nthat’s so hot, it will reignite his\fpassion for battling.\rI’m counting on you, hotshot!\r"
    
    console.log(format())

    return {
        format,
        reverse, 
        generate_preview
    }

}

export default formatComposable
