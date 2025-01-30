export const fetchSynonym = async (list) => {
    console.log('getting all synonym for', list)

    const api = process.env.NEXT_PUBLIC_THESAURUS_KEY
    console.log(api);

    if (!api) {
        throw new Error('Thesaurus API key is missing');
    }

    //for all adjectives in the original sentence, get list of synonyms from dictionary API
    for (const word in list){
        console.log(list[word]);

        const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${list[word]}?key=${api}`
        console.log(url);

        try {
            const serverResponse = await fetch(url);

            if (!serverResponse.ok) {
                throw new Error('thesaurus data fetch failed');
            }

            //get the synonym array from dictionary API
            const result = await serverResponse.json();
            const synonyms = result[0].meta.syns;
            console.log(synonyms);

            //add each synonym in the synonym array to the original list
            for (const key in synonyms){
                list.push(...synonyms[key]);
            }

        }catch(error){
            console.error(error);
        }
    }

    //return the final list to page
    return list;
};