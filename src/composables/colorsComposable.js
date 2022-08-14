const colorsComposable = () => {

    const addColorCodes = (text, color, gen) => {
        let haystack = ''
        switch (gen) {
            case 4:
                switch (color) {
                    case 'red':
                        haystack = '\\vFF00\\x0001\\x0001INSERTTEXT\\vFF00\\x0001\\x0000';
                        haystack = haystack.replace('INSERTTEXT', text);
                        break;
        
                    case 'green':
                        haystack = '\\vFF00\\x0001あINSERTTEXT\\vFF00\\x0001\\x0000';
                        haystack = haystack.replace('INSERTTEXT', text);
                        break;
                    
                    case 'blue':
                        haystack = '\\vFF00\\x0001ぁINSERTTEXT\\vFF00\\x0001\\x0000';
                        haystack = haystack.replace('INSERTTEXT', text);
                        break;
                
                    default:
                        break;
                }
                break;

            case 5:
                switch (color) {
                    case 'red':
                        haystack = '[COLOR(1)]INSERTTEXT[COLOR(0)]';
                        haystack = haystack.replace('INSERTTEXT', text);
                        break;
    
                    case 'blue':
                        haystack = '[COLOR(2)]INSERTTEXT[COLOR(0)]';
                        haystack = haystack.replace('INSERTTEXT', text);
                        break;
    
                    case 'yellow':
                        haystack = '[COLOR(3)]INSERTTEXT[COLOR(0)]';
                        haystack = haystack.replace('INSERTTEXT', text);
                        break;
    
                    case 'green':
                        haystack = '[COLOR(4)]INSERTTEXT[COLOR(0)]';
                        haystack = haystack.replace('INSERTTEXT', text);
                        break;
                    
                    case 'orange':
                        haystack = '[COLOR(5)]INSERTTEXT[COLOR(0)]';
                        haystack = haystack.replace('INSERTTEXT', text);
                        break;
                    
                    case 'pink':
                        haystack = '[COLOR(6)]INSERTTEXT[COLOR(0)]';
                        haystack = haystack.replace('INSERTTEXT', text);
                        break;
                }
                break;
            default:
                break;
        }

        return haystack;
    }

    return {
        addColorCodes
    }
}

export default colorsComposable;