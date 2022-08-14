// ----------------------------------------------------------
// -- ALGORITHM BY @RathGate (https://github.com/rathgate) --
// ----------------------------------------------------------

const formatComposable = () => {
    const gen_data = {
        4: {
            regex: {
                full: /\\vFF00\\x0001(\\x0001|あ|ぁ)(.*)\\vFF00\\x0001\\x0000/g,
                start: [/^\\vFF00\\x0001(\\x0001|あ|ぁ)/g, /\\vFF00\\x0001/g],
                both: /\\vFF00\\x0001(\\x0001|あ|ぁ)|\\vFF00\\x0001\\x0000/g,
                end: /\\vFF00\\x0001\\x0000/g,
                color_code: /\\x0001|あ|ぁ/g,
            },
            colors: {
                "\\x0001": "text-G4red",
                "あ": "text-G4green",
                "ぁ": "text-G4blue",
            },
            whitespaces: {
                newline:"\\n", advance:"\\r", flow: "\\f"
            }
        },
        5: {
            regex: {
                full: /\[COLOR\([1-6]\)\].*\[COLOR\(0\)\]/g,
                start: [/^\[COLOR\([1-6]\)\]/g, /\[COLOR\(/g],
                both: /\[COLOR\([1-6]\)\]|\[COLOR\(0\)\]/g,
                end: /\[COLOR\(0\)\]/g,
                color_code: /(?<=<span class=")([1-6]\)\])/g
            }, 
            colors: {
                "1)]": "text-G5red",
                "2)]": "text-G5blue", 
                "3)]": "text-G5yellow", 
                "4)]": "text-G5green",
                "5)]": "text-G5orange",
                "6)]": "text-G5pink",
            }, 
            whitespaces: {
                newline:"\\n", advance:"\\c", flow: "\\r"
            }
        }
    };
    
    let raw = '';

    String.prototype.removeExtraSpaces = function () {
        return this
            .replace(/(\c|\f|\r\n|\n|\r)+/g, "\n")
            .replace(/^(\n|\s)+|(\n|\s)+$/g, '');
    }
    const remove_whitespaces = (str) => {
        return str.replace(/\f|\r\n|\n|\r/gm, ' ');
    }
    
    const text_to_DSPRE = (str="", gen=4, flow=true, index=39, lines=2) => {
        const { regex, whitespaces } = gen_data[gen];
        str = str.removeExtraSpaces(); let chunks = [];
        // Function to create the copy of string, initiate the variable.
        const generate_copy = () => { return str.slice().replace(regex.both, '')}
        let copy = generate_copy();
    
        while (str.length > 0) {
            if (copy.length > index) {
                // Newline:
                if (/\n/.test(copy.slice(0, index + 1))) {
                    chunks.push(str.slice(0, [...str.matchAll(/\n/g)][0].index).removeExtraSpaces());
                    str = str.slice([...str.matchAll(/\n/g)][0].index).removeExtraSpaces();
                // Whitespace:
                } else if (/ /.test(copy.slice(0, index + 1))) {
                    let last_space_index = [...copy.slice(0, index + 1).matchAll(' ')].length - 1;
                    chunks.push(str.slice(0, [...str.matchAll(' ')][last_space_index].index).removeExtraSpaces());
                    str = str.slice([...str.matchAll(' ')][last_space_index].index).removeExtraSpaces();
                // Neither: 
                } else {
                    let count = str.match(regex.start[0]) === null 
                    ? 0 : str.match(regex.start[0])[0].length;
                    chunks.push(str.slice(0, index + count).removeExtraSpaces()); str = str.slice(index + count).removeExtraSpaces();
                }
            } else {
                // Newline:
                if (/\n/.test(copy)) {
                    chunks.push(str.slice(0, [...str.matchAll(/\n/g)][0].index).removeExtraSpaces());
                    str = str.slice([...str.matchAll(/\n/g)][0].index).removeExtraSpaces();
                } else {
                    chunks.push(str.removeExtraSpaces()); str = '';
                }
            }
            copy = generate_copy()
        }

        // PART 2: ADDS NEWLINE CHARACTERS AT THE END OF EACH CHUNK:
        if (chunks.length >= 1) {
            let last_chunk = chunks.pop();
            chunks = chunks.map((chunk, index) => {
                return flow 
                    ? ((index + 1) % lines !== 0 ? chunk += whitespaces.newline : chunk += whitespaces.flow)
                    : ((index + 1) % lines !== 0 ? chunk += whitespaces.newline : chunk += whitespaces.advance)
            });
            chunks.push(last_chunk);
        };

        // RESULT:
        return chunks.join('')
    }

    const DSPRE_to_HTML = (str, gen=4) => {
        // Replaces color elements as written in DSPRE with HTML-readable CSS 
        //  and removes the extra escape characters.

        var { regex, colors } = gen_data[gen]

        if (str.match(regex.full) !== null) {
            str = str
                .replace(regex.end, `</span>`)
                .replace(regex.start[1], `<span class="`)
                .replace(regex.color_code, function(matched) {
                    return `${colors[matched]}">`;
                });
        };
        return str.replace(/\\n|\\r|\\f|\\c/g, '\n');
    ;}

    const format = (str, gen=4, flow=false, index=39, lines=2) => {
        // SECURITY CHECKS:
        if (typeof str !== 'string' || typeof flow !== 'boolean'
        || typeof index !== 'number' || typeof lines !== 'number') {
            console.log("Something went wrong...\n>>>[0]: non-empty string;\n>>>[1]: flow type bool [\\r or \\f] (opt., default=true -> \\r)" +
            "\n>>>[2]: splitting index (opt., default=39)\n>>>[2]: number of lines (opt., default=2)")
            return 1;
        }

        let DSPRE_formatted = text_to_DSPRE(str, gen, flow, index, lines);
        let HTML_formatted = DSPRE_to_HTML(DSPRE_formatted, gen);

        return {DSPRE_formatted, HTML_formatted}
    }

    const rawOutput = (str) => {
        raw = str;
        console.log(raw)
    }

    const selection = () => {
        let string = document.getSelection().toString().removeExtraSpaces();
        console.log(`Words: ${string.replace(/\n/g, ' ').split(/ +/g).length}; Characters: ${string.length}`)
        return { word_count: string.replace(/\n/g, ' ').split(/ +/g).length, char_count: string.length }
    }

    // EXAMPLES:
    const string = 'July 5th.\nToday, while on our journey through the densest part of the jungle, we were surprised to discover a new pokemon.\n\nJuly 10th.\nWe decided to name the recently discovered Pokémon Mew.\n\nFebruary the 6th.\nFrom the potential within Mew, we have managed to created an entirely new Pokémon: Mewtwo.\n\nSeptember the 1st.\nIt has become far too strong. It is beyond even us now.'
    const string_2 = "\nToday, while on our \njourney through the densest part of the jungle, we were surprised to discover a new pokemon."

    return {
        remove_whitespaces,
        text_to_DSPRE, 
        DSPRE_to_HTML,
        format,
        rawOutput,
        selection,
    }
}
export default formatComposable